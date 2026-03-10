<template>
    <div>
        <div v-if="heroProduct" class="custom-card flex flex-row gap-5">
            <div class="flex basis-1/2 items-center">
                <div>
                    <h1>
                        Exclusive picture
                        <br />of the Stone(d) Piranha
                    </h1>
                    <p class="py-6">
                        We found him! After minutes of (re)search, we were
                        finally able to get a shot of the stoned piranha near
                        Weed, CA.
                    </p>
                    <NuxtLink :to="`/products/${heroProduct.id}`">
                        <button class="btn btn-primary">
                            Start configuration
                        </button>
                    </NuxtLink>
                </div>
            </div>

            <div class="basis-1/2">
                <iframe
                    v-if="isVideoVisible"
                    allow="
                        accelerometer;
                        autoplay;
                        encrypted-media;
                        gyroscope;
                        picture-in-picture;
                    "
                    class="aspect-video w-full"
                    :src="videoUrl"
                ></iframe>
                <div
                    v-else
                    class="bg-base-100 grid aspect-video place-content-center rounded-lg"
                    @click="showVideo"
                >
                    <div class="relative">
                        <div class="z-0 opacity-50">
                            <div class="text-6xl tracking-wide">
                                <span class="inline font-[Carosello] opacity-90"
                                    >Private</span
                                >
                                <img
                                    class="mr-1 inline h-20"
                                    src="/icon.png"
                                    @click="$trackAction('navigation', 'logo')"
                                />
                                <span class="inline font-[Carosello] opacity-90"
                                    >Pics</span
                                >
                            </div>
                        </div>
                        <div
                            class="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
                        >
                            <svg
                                class="icon icon-tabler icon-tabler-player-play"
                                fill="none"
                                height="70"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                viewBox="0 0 24 24"
                                width="70"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M0 0h24v24H0z"
                                    fill="none"
                                    stroke="none"
                                ></path>
                                <path d="M7 4v16l13 -8z"></path>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ProductSlider v-if="products" :products="products" class="mt-5" />
    </div>
</template>

<script lang="ts" setup>
useHead({
    title: 'Privatepiranha.Pics',
    titleTemplate: '%s',
});

const {
    public: { stonedPiranhaVideoUrl: videoUrl },
} = useRuntimeConfig();

const sweetAlert = useSweetAlert();
const { isEnabled: areProblemsEnabled } = useChallengeState();

const { data: heroProduct } = await useFetch('/api/products/hero');
const { data: products } = await useFetch('/api/products', {
    query: {
        limit: 8,
    },
});

const isVideoVisible = ref(false);

async function showVideo() {
    if (!areProblemsEnabled) {
        const { isConfirmed } = await sweetAlert.fire({
            title: 'Privacy Warning',
            text: 'Are you sure you want to watch this video? Your data will be shared with a third party, please see our privacy policy for more information.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, show me the video',
            cancelButtonText: 'No, take me back',
        });

        if (!isConfirmed) {
            return;
        }
    }

    isVideoVisible.value = true;
}
</script>
