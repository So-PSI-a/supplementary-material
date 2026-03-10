<template>
    <div>
        <nuxt-link to="/cart"> 〈 Back </nuxt-link>
        <div class="mt-5 flex flex-row gap-5">
            <div class="grid basis-1/2 gap-y-5">
                <div>
                    <div class="custom-card">
                        <h2>Address</h2>
                        <AccountAddessCard />
                    </div>

                    <div class="custom-card mt-5">
                        <h2>Payment method</h2>
                        <AccountPaymentCard />
                    </div>
                </div>
            </div>
            <div class="basis-1/2">
                <div class="custom-card">
                    <h2 class="mb-5">Order summary</h2>
                    <ClientOnly>
                        <div
                            :class="[
                                'grid max-h-64 gap-y-5',
                                {
                                    'overflow-y-auto': cart.contents.length > 2,
                                },
                            ]"
                        >
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
                                                class="rounded-lg"
                                                width="300"
                                                alt="product image"
                                            />
                                        </NuxtLink>
                                    </div>
                                    <div class="ml-5 basis-3/5">
                                        <p>
                                            <NuxtLink
                                                :to="`/products/${item.product.id}`"
                                                class="hover:text-primary"
                                            >
                                                {{ item.product.name }}
                                            </NuxtLink>
                                        </p>
                                        <p class="text-gray-400">
                                            {{ item.frame.name }}
                                        </p>
                                        <p class="primary--text mt-2">
                                            {{ item.quantity }} x
                                            {{
                                                formatCurrency(
                                                    item.product.price,
                                                )
                                            }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ClientOnly>
                    <div class="mt-5 flex justify-between">
                        <div>Subtotal</div>
                        <ClientOnly>
                            {{ formatCurrency(totalOrderValue) }}
                        </ClientOnly>
                    </div>
                    <div class="divider"></div>
                    <div class="flex justify-between">
                        <div>Shipping</div>
                        <ClientOnly>
                            {{
                                formatCurrency($config.public.shippingCostCents)
                            }}
                        </ClientOnly>
                    </div>
                    <div class="divider"></div>
                    <div class="flex justify-between">
                        <div>Total</div>
                        <ClientOnly>
                            {{
                                formatCurrency(
                                    totalOrderValue +
                                        $config.public.shippingCostCents,
                                )
                            }}
                        </ClientOnly>
                    </div>
                    <div class="divider"></div>
                    <form @submit.prevent="confirmOrder">
                        <div
                            v-if="areProblemsEnabled"
                            class="form-control mb-5"
                        >
                            <label class="label cursor-pointer">
                                <input
                                    class="checkbox checkbox-primary"
                                    required
                                    type="checkbox"
                                />
                                <span>I agree with the privacy policy</span>
                            </label>
                        </div>
                        <button
                            class="btn btn-primary w-full"
                            @click="$trackAction('cart', 'complete')"
                        >
                            Confirm order
                        </button>
                    </form>
                    <div v-if="confirmError" class="text-red-600">
                        {{ confirmError }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
definePageMeta({
    middleware: ['auth'],
});

useHead({
    title: 'Checkout',
});

const sweetAlert = useSweetAlert();

const { isEnabled: areProblemsEnabled } = useChallengeState();
const cart = useCart();

const confirmError = ref<string>();
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

async function confirmOrder() {
    confirmError.value = undefined;

    try {
        await $fetch('/api/orders', {
            method: 'POST',
            body: {
                items: cart.contents.map((item) => ({
                    productId: item.product.id,
                    quantity: item.quantity,
                    frameId: item.frame.id,
                })),
            },
        });

        await sweetAlert.fire({
            title: 'Processing your order',
            icon: 'info',
            allowEscapeKey: false,
            allowOutsideClick: false,
            timer: 2000,
            timerProgressBar: false,
            text: 'Please Wait',
            showConfirmButton: false,
        });
        await sweetAlert.fire({
            title: 'Order Complete',
            icon: 'success',
            allowEscapeKey: false,
            allowOutsideClick: false,
            timer: 3000,
            timerProgressBar: false,
            text: 'Thank You So Much ❤',
            showConfirmButton: false,
        });

        // Clear cart and navigate to home
        cart.clear();
        await navigateTo('/');
    } catch (error) {
        confirmError.value = readFetchErrorMessage(error);
    }
}
</script>
