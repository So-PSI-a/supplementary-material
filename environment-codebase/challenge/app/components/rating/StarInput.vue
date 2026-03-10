<template>
    <div class="inline-flex gap-1">
        <button
            v-for="star in max"
            :key="star"
            type="button"
            :class="[
                'border-none bg-transparent p-0 text-2xl',
                {
                    'cursor-pointer transition-transform duration-200 hover:scale-110':
                        !readonly,
                },
            ]"
            @click="setValue(star)"
            @mouseenter="setHoverValue(star)"
            @mouseleave="setHoverValue(0)"
        >
            <span
                :class="['text-amber-400', { 'opacity-30': star > modelValue }]"
            >
                {{ star <= (hoveringValue || modelValue) ? '★' : '☆' }}
            </span>
        </button>
    </div>
</template>

<script lang="ts" setup>
const props = withDefaults(
    defineProps<{
        max?: number;
        readonly?: boolean;
    }>(),
    {
        max: 5,
        readonly: false,
    },
);

const modelValue = defineModel<number>({
    required: true,
});

const hoveringValue = ref(0);

function setValue(rating: number) {
    if (props.readonly) {
        return;
    }

    modelValue.value = rating;
}

function setHoverValue(rating: number) {
    if (props.readonly) {
        return;
    }

    hoveringValue.value = rating;
}
</script>
