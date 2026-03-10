<template>
    <div class="grid grid-cols-4 gap-5">
        <div v-for="product in products" :key="product.id">
            <ProductCard :product="product" />
        </div>
    </div>
</template>

<script lang="ts" setup>
defineProps<{
    products: Product[];
}>();
</script>
