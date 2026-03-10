<template>
    <div class="custom-card grid gap-y-5">
        <h1>Register</h1>
        <UserAuthForm
            submit-text="Register"
            show-name-field
            @submit="onSubmit"
        />
        <div v-if="registerError" class="alert alert-error">
            <div>
                <svg
                    class="h-6 w-6 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                    />
                </svg>
                <span>Error! {{ registerError }}.</span>
            </div>
        </div>

        <div v-if="success" class="alert alert-success">
            <div>
                <svg
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
                <span>
                    <NuxtLink to="/login">You can now login</NuxtLink>
                </span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { UserInfo } from '~/components/UserAuthForm.vue';

useHead({
    title: 'Register',
});

const registerError = ref<string>();
const success = ref(false);

async function onSubmit(userInfo: UserInfo) {
    success.value = false;
    registerError.value = undefined;

    try {
        await $fetch('/api/auth/register', {
            method: 'POST',
            body: userInfo,
        });

        success.value = true;
    } catch (error) {
        registerError.value = readFetchErrorMessage(error);
    }
}
</script>
