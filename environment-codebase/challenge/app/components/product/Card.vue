<template>
    <div class="bg-base-200 rounded-md">
        <NuxtLink :to="`/products/${product.id}`">
            <img
                :src="product.image"
                class="h-[300px] w-[400px] rounded-t-md object-cover"
            />
            <div class="grid grid-cols-3 p-5">
                <div class="col-span-2">
                    {{ product.name }}
                </div>
                <div class="text-right">
                    {{ formatCurrency(product.price) }}
                </div>
            </div>
        </NuxtLink>
    </div>
</template>

<script lang="ts" setup>
defineProps<{
    product: Product;
}>();
</script>
