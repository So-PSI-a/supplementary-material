<template>
    <div v-if="user" class="custom-card">
        <h1>Public Profile of {{ user.name }}</h1>
        <div class="mt-5">
            <p v-if="user.email">Email: {{ user.email }}</p>
            <p v-else class="italic">Nothing to see here.</p>
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
const { data: user } = await useFetch(
    () => `/api/users/${Number(route.params.id)}`,
);

if (!user.value) {
    throw createError({ statusCode: 404, statusMessage: 'User not found' });
}

useHead({
    title: () => user.value?.name,
});
</script>
