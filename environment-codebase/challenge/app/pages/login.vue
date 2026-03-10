<template>
    <div>
        <div v-if="!showResetError" class="custom-card grid gap-y-5">
            <h1>Login</h1>

            <UserAuthForm submit-text="Login" @submit="login" />
            <div v-if="loginError" class="alert alert-error">
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
                    <span>Error! {{ loginError }}.</span>
                </div>
            </div>
        </div>
        <div v-else class="custom-card">
            The training environment was reset. Please
            <span @click.prevent="logout">
                <span @click="$trackAction('navigation', 'logout')">
                    <b>Logout</b>
                </span>
            </span>

            and register again.
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { UserInfo } from '~/components/UserAuthForm.vue';

useHead({
    title: 'Login',
});

const { session, clear: clearSession, fetch: fetchSession } = useUserSession();

const loginError = ref<string>();
const showResetError = ref(false);

async function login(userInfo: UserInfo) {
    loginError.value = undefined;

    try {
        await $fetch('/api/auth/login', {
            method: 'POST',
            body: userInfo,
        });

        await fetchSession();
        await navigateTo('/');

        showResetError.value = false;
    } catch (error) {
        loginError.value = readFetchErrorMessage(error);
    }
}

async function logout() {
    await clearSession();

    showResetError.value = false;
}

onBeforeMount(() => {
    const loginTime = session.value?.loggedInAt;
    const resetTime = getResetDate({ type: 'last' }).getTime();

    showResetError.value = loginTime !== undefined && loginTime < resetTime;
});
</script>
