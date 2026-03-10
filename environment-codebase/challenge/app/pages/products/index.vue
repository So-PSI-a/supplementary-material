<template>
    <div>
        <ProductSlider v-if="products" :products="products" />
    </div>
</template>

<script lang="ts" setup>
useHead({
    title: 'Products',
});

const { data: products } = await useFetch('/api/products');
</script>
