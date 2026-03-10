import { skipHydrate } from 'pinia';

const STORAGE_KEY = 'cart';

export interface CartItem {
    product: Product;
    frame: ProductFrame;
    quantity: number;
}

export const useCart = defineStore('cart', () => {
    const contents = useLocalStorage<CartItem[]>(STORAGE_KEY, []);

    const getItem = (productId: number, frameId: number) =>
        contents.value.find(
            (item) =>
                item.product.id === productId && item.frame.id === frameId,
        );

    function addProduct(product: Product, frame: ProductFrame) {
        const existingItem = getItem(product.id, frame.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            contents.value.push({
                product: {
                    ...product,

                    // Remove description to save space
                    description: '',
                },
                frame,
                quantity: 1,
            });
        }
    }

    function removeItem({ frame, product: { id: productId } }: CartItem) {
        contents.value = contents.value.filter(
            (item) => item.frame !== frame || item.product.id !== productId,
        );
    }

    function increment(item: CartItem) {
        const existingItem = getItem(item.product.id, item.frame.id);

        if (!existingItem) {
            throw new ReferenceError(
                'Cannot increment an item that is not in the cart.',
            );
        }

        existingItem.quantity += 1;
    }

    function decrement(item: CartItem) {
        const existingItem = getItem(item.product.id, item.frame.id);

        if (!existingItem) {
            throw new ReferenceError(
                'Cannot decrement an item that is not in the cart.',
            );
        }

        if (existingItem.quantity > 1) {
            existingItem.quantity -= 1;
        } else {
            removeItem(item);
        }
    }

    function clear() {
        contents.value = [];
    }

    return {
        contents: skipHydrate(contents),
        addProduct,
        removeItem,
        increment,
        decrement,
        clear,
    };
});
