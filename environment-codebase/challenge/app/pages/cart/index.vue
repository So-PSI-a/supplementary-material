<template>
    <ClientOnly fallback="Loading your cart...">
        <div v-if="cart.contents.length == 0" class="custom-card">
            Your cart is empty!
        </div>
        <div v-else>
            <div class="flex flex-row gap-5">
                <div class="basis-2/3">
                    <div class="bg-base-200 grid gap-y-5 rounded-md p-5">
                        <div
                            v-for="(item, index) in cart.contents"
                            :key="index"
                        >
                            <div class="flex flex-row">
                                <div class="basis-1/5">
                                    <NuxtLink
                                        :to="`/products/${item.product.id}`"
                                    >
                                        <img
                                            :src="item.product.image"
                                            class="aspect-square w-full rounded-md"
                                        />
                                    </NuxtLink>
                                </div>
                                <div class="ml-5 basis-3/5">
                                    <h3>
                                        <NuxtLink
                                            :to="`/products/${item.product.id}`"
                                            class="hover:text-primary"
                                        >
                                            {{ item.product.name }}
                                        </NuxtLink>
                                    </h3>
                                    <p class="text-gray-400">
                                        {{ item.frame.name }}
                                    </p>
                                    <p class="primary--text mt-2 mb-8">
                                        {{ formatCurrency(item.product.price) }}
                                    </p>
                                    <span class="rounded-md border p-2">
                                        <button @click="cart.decrement(item)">
                                            -
                                        </button>
                                        <span class="mx-2">{{
                                            item.quantity
                                        }}</span>
                                        <button @click="cart.increment(item)">
                                            +
                                        </button>
                                    </span>
                                </div>
                                <div class="basis-1/5">
                                    <div
                                        class="flex flex-row-reverse"
                                        @click="
                                            cart.removeItem(item);
                                            $trackAction('cart', 'delete');
                                        "
                                    >
                                        <button class="cursor-pointer">
                                            <svg
                                                class="icon icon-tabler icon-tabler-trash"
                                                fill="none"
                                                height="24"
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                viewBox="0 0 24 24"
                                                width="24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M0 0h24v24H0z"
                                                    fill="none"
                                                    stroke="none"
                                                />
                                                <line
                                                    x1="4"
                                                    x2="20"
                                                    y1="7"
                                                    y2="7"
                                                />
                                                <line
                                                    x1="10"
                                                    x2="10"
                                                    y1="11"
                                                    y2="17"
                                                />
                                                <line
                                                    x1="14"
                                                    x2="14"
                                                    y1="11"
                                                    y2="17"
                                                />
                                                <path
                                                    d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"
                                                />
                                                <path
                                                    d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="basis-1/3">
                    <div class="custom-card">
                        <h2 class="mb-5">Order summary</h2>
                        <div class="flex justify-between">
                            <div>Subtotal</div>
                            <div>
                                {{ formatCurrency(totalOrderValue) }}
                            </div>
                        </div>
                        <div class="divider"></div>
                        <div class="flex justify-between">
                            <div>Shipping</div>
                            <div>
                                {{
                                    formatCurrency(
                                        $config.public.shippingCostCents,
                                    )
                                }}
                            </div>
                        </div>
                        <div class="divider"></div>
                        <div class="flex justify-between">
                            <div>Total</div>
                            <div>
                                {{
                                    formatCurrency(
                                        totalOrderValue +
                                            $config.public.shippingCostCents,
                                    )
                                }}
                            </div>
                        </div>
                        <div class="divider"></div>
                        <AuthState #="{ loggedIn }">
                            <NuxtLink v-if="loggedIn" to="/cart/checkout">
                                <button class="btn btn-primary w-full">
                                    <a
                                        @click="
                                            $trackAction('cart', 'checkout')
                                        "
                                    >
                                        Checkout
                                    </a>
                                </button>
                            </NuxtLink>
                            <NuxtLink v-else to="/cart/checkout">
                                <button class="btn btn-primary">
                                    <a
                                        @click="
                                            $trackAction('cart', 'login now')
                                        "
                                    >
                                        Login now
                                    </a>
                                </button>
                            </NuxtLink>
                        </AuthState>
                    </div>
                </div>
            </div>
        </div>
    </ClientOnly>
</template>

<script lang="ts" setup>
useHead({
    title: 'Cart',
});

const cart = useCart();

const totalOrderValue = computed(() => {
    const totalCostProducts = cart.contents.map(
        (item) => item.product.price * item.quantity,
    );
    const totalPrice = totalCostProducts.reduce(
        (total, item) => total + item,
        0,
    );

    return totalPrice;
});
</script>
