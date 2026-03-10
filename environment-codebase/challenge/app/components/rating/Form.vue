<template>
    <div class="custom-card mt-5">
        <h2>Write new review</h2>
        <form ref="form" class="grid gap-5" @submit.prevent="submitReview">
            <div>
                <textarea
                    v-model="content"
                    class="custom-input h-40 w-full"
                    name="Content"
                    placeholder="Be honest!"
                ></textarea>
            </div>
            <div>
                <h4>Rating</h4>
                <RatingStarInput v-model="rating" />
            </div>
            <div>
                <button
                    :disabled="isInvalid"
                    class="btn btn-primary"
                    type="submit"
                    @click="
                        $trackAction(
                            'productDetail',
                            'sendReview',
                            `${productId},${rating}`,
                        )
                    "
                >
                    Create
                </button>
            </div>
        </form>
    </div>
</template>

<script lang="ts" setup>
const emit = defineEmits<{
    submit: [];
}>();

const props = defineProps<{
    productId: number;
}>();

const content = ref('');
const rating = ref(1);

const isInvalid = computed(() => content.value.trim().length === 0);

async function submitReview() {
    await $fetch(`/api/products/${props.productId}/ratings`, {
        method: 'POST',
        body: {
            content: content.value,
            rating: rating.value,
        },
    });

    content.value = '';
    rating.value = 1;

    emit('submit');
}
</script>
