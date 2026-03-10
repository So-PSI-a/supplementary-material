<template>
    <div v-if="product">
        <div class="flex flex-row gap-5">
            <div class="basis-1/2">
                <img
                    :src="product.image"
                    class="aspect-square w-full rounded-md"
                />
            </div>
            <div class="basis-1/2">
                <div class="custom-card grid gap-y-6">
                    <div class="flow-root">
                        <h1 class="float-left inline-block">
                            {{ product.name }}
                        </h1>
                        <div class="float-right">
                            <h1>
                                {{ formatCurrency(product.price) }}
                            </h1>
                        </div>
                    </div>
                    <div>
                        <h4>Frame</h4>

                        <form @submit.prevent="addToCart">
                            <ul class="grid grid-cols-3 gap-x-5">
                                <span
                                    v-for="frame in product.frames"
                                    :key="frame.id"
                                >
                                    <input
                                        :id="`frame_${frame.id}`"
                                        v-model="selectedFrame"
                                        :value="frame.id"
                                        class="peer sr-only"
                                        name="frame"
                                        required
                                        type="radio"
                                    />
                                    <label
                                        :for="`frame_${frame.id}`"
                                        class="border-base-300 hover:bg-base-100 peer-checked:ring-primary flex cursor-pointer justify-center rounded-md border p-4 peer-checked:border-transparent peer-checked:ring-2 focus:outline-none"
                                        @click="onSelectedFrame"
                                        >{{ frame.name }}</label
                                    >
                                </span>
                            </ul>
                            <button class="btn btn-primary mt-5 gap-2">
                                Add to cart
                                <svg
                                    v-if="successFullySaved"
                                    class="h-6 w-6 shrink-0 stroke-current"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                    />
                                </svg>
                            </button>
                        </form>
                    </div>
                    <div class="mt-14 mb-6">
                        <h4>Description</h4>
                        <p>{{ product.description }}</p>
                    </div>
                </div>
            </div>
        </div>

        <AuthState #="{ loggedIn }">
            <RatingForm
                v-if="loggedIn"
                :product-id="product.id"
                @submit="onRatingSubmitted"
            />
        </AuthState>

        <div
            v-for="rating in ratings"
            :key="rating.userId"
            class="custom-card mt-5"
        >
            <NuxtLink :to="`/user/${rating.userId}`">
                <h3>{{ rating.userName }}</h3>
            </NuxtLink>
            <RatingStarInput :model-value="rating.rating" readonly />
            <p>
                {{ rating.content }}
            </p>
        </div>
    </div>
</template>

<script lang="ts" setup>
definePageMeta({
    validate(route) {
        // Check if the id is made up of digits
        return (
            typeof route.params.id === 'string' && /^\d+$/.test(route.params.id)
        );
    },
});

const route = useRoute();
const cart = useCart();

const { $trackAction } = useNuxtApp();

const { data: product } = await useFetch(
    `/api/products/${Number(route.params.id)}`,
);
const { data: ratings, refresh: refreshRatings } = await useFetch(
    `/api/products/${Number(route.params.id)}/ratings`,
);

if (!product.value) {
    throw createError({ statusCode: 404, statusMessage: 'Product not found' });
}

// No need for "useHeadSafe" as the product is only filled by us.
useHead({
    title: () => product.value?.name,
});

const successFullySaved = ref(false);
const selectedFrame = ref<number | undefined>(product.value?.frames[0]?.id);

function addToCart() {
    const frame = product.value?.frames.find(
        (frame) => frame.id === selectedFrame.value,
    );

    if (!product.value) {
        throw new TypeError('Cannot add non-existing product to cart.');
    }

    if (!frame) {
        throw new TypeError(
            'Cannot add product to cart without selecting a frame.',
        );
    }

    cart.addProduct(product.value, frame);

    successFullySaved.value = true;

    $trackAction(
        'productDetail',
        'addToCart',
        `${product.value.id};${selectedFrame.value}`,
    );
}

function onSelectedFrame() {
    $trackAction('product', 'frame');

    successFullySaved.value = false;
}

function onRatingSubmitted() {
    refreshRatings();
}
</script>
