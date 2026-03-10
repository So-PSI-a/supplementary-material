<template>
    <NuxtLayout>
        <div>
            <div class="text-orange-600">{{ error.statusCode }} ERROR</div>
            <div class="text-4xl">Page not found.</div>
            <div class="text-gray-400">
                Piranhas were hungry and ate that page.
            </div>
            <button class="text-orange-600" @click="goBackHome">
                Go back home ➔
            </button>
        </div>
    </NuxtLayout>
</template>

<script lang="ts" setup>
import type { NuxtError } from '#app';

useHead({
    title: 'Error',
});

defineProps<{
    error: NuxtError;
}>();

function goBackHome() {
    clearError({ redirect: '/' });
}
</script>
