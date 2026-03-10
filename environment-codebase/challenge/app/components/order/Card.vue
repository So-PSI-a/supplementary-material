<template>
    <div>
        <div class="bg-base-100 rounded-t-lg p-5">
            <div class="flex justify-between">
                <div>
                    Order placed
                    <div class="text-gray-400">
                        {{ formatDateTime(order.date) }}
                    </div>
                </div>
                <div>
                    Ordner Number
                    <div class="text-gray-400">
                        {{ orderNumber }}
                    </div>
                </div>
                <div>
                    Total amount
                    <div class="text-gray-400">
                        <div>
                            {{ totalOrderValue }}
                        </div>
                    </div>
                </div>
                <div>
                    Date delivered
                    <div v-if="order.delivery" class="text-gray-400">
                        {{ formatDateTime(order.delivery.date) }}
                    </div>
                </div>
                <div>
                    Delivery service
                    <div class="text-gray-400">
                        {{ order.delivery?.service }}
                    </div>
                </div>
                <div v-if="areProblemsEnabled">
                    Accepted by
                    <div class="text-gray-400">
                        {{ order.delivery?.to }}
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-5 grid grid-cols-5 gap-4 text-gray-400">
            <div>Product</div>
            <div>Frame</div>
            <div>Amount</div>
            <div>Price</div>
            <div class="text-right">Info</div>
        </div>

        <div class="divider"></div>

        <div v-for="(item, index) in order.items" :key="index">
            <div class="grid grid-cols-5 gap-5">
                <div>
                    {{ item.product.name }}
                </div>
                <div class="text-gray-400">
                    {{ item.frame.name }}
                </div>
                <div class="text-gray-400">
                    {{ item.quantity }}
                </div>
                <div class="text-gray-400">
                    {{ formatCurrency(item.product.price * item.quantity) }}
                </div>
                <div class="text-primary text-right">
                    <NuxtLink :to="`/products/${item.product.id}`">
                        View Product
                    </NuxtLink>
                </div>
            </div>

            <div class="divider"></div>
        </div>
    </div>
</template>

<script lang="ts">
const BASE_62_CHARACTERS =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
</script>

<script lang="ts" setup>
const { isEnabled: areProblemsEnabled } = useChallengeState();

const props = defineProps<{
    order: Order;
}>();

const orderNumber = computed(() => toOrderNumber(props.order.id));

const totalOrderValue = computed(() => {
    const totalCostProducts = props.order.items.map(
        (item) => item.quantity * item.product.price,
    );

    return totalCostProducts.reduce((acc, item) => acc + item, 0);
});

function toOrderNumber(uuid: string): string {
    let numeric = BigInt('0x' + uuid.replace(/-/g, ''));
    let result = '';

    while (numeric > 0n) {
        result = BASE_62_CHARACTERS[Number(numeric % 62n)] + result;
        numeric /= 62n;
    }

    return result;
}
</script>
