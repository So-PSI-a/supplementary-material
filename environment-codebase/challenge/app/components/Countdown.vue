<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <span>
        <span v-if="hours !== 0">
            {{ hours }}
            Hours
        </span>
        <span>
            {{ minutes }}
            Minutes
        </span>
        <span v-if="hours === 0 && minutes === 0">
            {{ seconds }}
            Seconds
        </span>
    </span>
</template>

<script lang="ts" setup>
const hours = ref(1);
const minutes = ref(1);
const seconds = ref(1);

const intervalId = ref();

// Store initial date to avoid hydration issues
const initialDate = computed(() => Date.now());

// Trigger once for SSR
updateRemainingTime(initialDate.value);

function updateRemainingTime(now: number) {
    const resetDate = getResetDate({ type: 'next', fromDate: now });

    const resetDuration = resetDate.getTime() - now;

    if (resetDuration >= 0) {
        seconds.value = Math.floor((resetDuration / 1000) % 60);
        minutes.value = Math.floor((resetDuration / 1000 / 60) % 60);
        hours.value = Math.floor((resetDuration / (1000 * 60 * 60)) % 24);
    } else {
        seconds.value = 0;
        minutes.value = 0;
        hours.value = 0;
    }
}

onMounted(() => {
    intervalId.value = setInterval(() => updateRemainingTime(Date.now()), 1000);
});

onUnmounted(() => {
    if (intervalId.value) {
        clearInterval(intervalId.value);
    }
});
</script>
