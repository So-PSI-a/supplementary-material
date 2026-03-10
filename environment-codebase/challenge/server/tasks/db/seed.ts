import { and, eq } from 'drizzle-orm';
import orders from '../../db/seed/orders.json';
import products from '../../db/seed/products.json';
import users from '../../db/seed/users.json';

/**
 * Task to seed the database with initial data.
 *
 * This is run automatically at reset times.
 */
export default defineTask({
    meta: {
        description: 'Seed the database with initial data.',
    },
    async run() {
        // Map seed IDs to database-generated IDs
        const userIdMap = new Map<number, number>();
        const productIdMap = new Map<number, number>();

        // Seed users
        for (const user of users) {
            const { id: seedId, ...userData } = user;
            const [insertedUser] = await db
                .insert(schema.users)
                .values({
                    ...userData,
                    password: await hashPassword(user.password),
                })
                .returning();

            userIdMap.set(seedId, insertedUser.id);
        }

        // Seed products
        for (const product of products) {
            await db.transaction(async (tx) => {
                const { id: seedId, frames, ...productData } = product;

                const [insertedProduct] = await tx
                    .insert(schema.products)
                    .values(productData)
                    .returning();

                productIdMap.set(seedId, insertedProduct.id);

                for (const frameName of frames) {
                    await tx.insert(schema.productFrames).values({
                        productId: insertedProduct.id,
                        name: frameName,
                    });
                }
            });
        }

        // Seed orders
        for (const orderData of orders) {
            const { items, delivery, ...order } = orderData;

            const orderDate = new Date();
            orderDate.setDate(
                orderDate.getDate() - Math.floor(Math.random() * 30),
            );

            const offsetDate = new Date(order.dateOffset);

            orderDate.setFullYear(
                orderDate.getFullYear() + offsetDate.getFullYear(),
                orderDate.getMonth() + offsetDate.getMonth(),
                orderDate.getDate() + offsetDate.getDate(),
            );

            orderDate.setHours(
                orderDate.getHours() + offsetDate.getHours(),
                orderDate.getMinutes() + offsetDate.getMinutes(),
                orderDate.getSeconds() + offsetDate.getSeconds(),
            );

            await db.transaction(async (tx) => {
                const dbUserId = userIdMap.get(orderData.userId);
                if (!dbUserId) {
                    throw new ReferenceError(
                        `User with seed id ${orderData.userId} does not exist.`,
                    );
                }

                const [order] = await tx
                    .insert(schema.orders)
                    .values({
                        date: orderDate,
                        userId: dbUserId,
                    })
                    .returning();

                for (const item of items) {
                    const dbProductId = productIdMap.get(item.productId);
                    if (!dbProductId) {
                        throw new ReferenceError(
                            `Product with seed id ${item.productId} does not exist.`,
                        );
                    }

                    const frame = await tx.query.productFrames.findFirst({
                        where: and(
                            eq(schema.productFrames.productId, dbProductId),
                            eq(schema.productFrames.name, item.frame),
                        ),
                    });

                    if (!frame) {
                        throw new ReferenceError(
                            `Frame "${item.frame}" for product id ${dbProductId} does not exist.`,
                        );
                    }

                    await tx.insert(schema.orderItems).values({
                        orderId: order.id,
                        productId: dbProductId,
                        frameId: frame.id,
                        quantity: item.quantity,
                    });
                }

                if (delivery) {
                    const deliveryDate = new Date(orderDate);
                    const deliveryDateOffset = new Date(delivery.dateOffset);

                    deliveryDate.setFullYear(
                        deliveryDate.getFullYear() +
                            deliveryDateOffset.getFullYear(),
                        deliveryDate.getMonth() + deliveryDateOffset.getMonth(),
                        deliveryDate.getDate() + deliveryDateOffset.getDate(),
                    );

                    deliveryDate.setHours(
                        deliveryDate.getHours() + deliveryDateOffset.getHours(),
                        deliveryDate.getMinutes() +
                            deliveryDateOffset.getMinutes(),
                        deliveryDate.getSeconds() +
                            deliveryDateOffset.getSeconds(),
                    );

                    await tx.insert(schema.orderDeliveries).values({
                        orderId: order.id,
                        date: deliveryDate,
                        service: delivery.service,
                        to: delivery.to,
                    });
                }
            });
        }

        return {
            result: `Seeded ${users.length} users, ${products.length} products and ${orders.length} orders.`,
        };
    },
});
