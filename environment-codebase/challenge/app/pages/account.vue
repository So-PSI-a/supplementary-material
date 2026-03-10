<template>
    <div v-if="userInfo">
        <div class="flex flex-row gap-5">
            <div class="basis-1/4">
                <div class="custom-card grid gap-y-2">
                    <a href="#general">
                        <h2>
                            {{ userInfo.name }}
                        </h2>
                    </a>
                    <div>
                        <NuxtLink
                            href="?tab=general"
                            :class="{ 'menu-active': selectedTab == 'general' }"
                            @click="
                                $trackAction('account', 'generalInformation')
                            "
                        >
                            General Information
                        </NuxtLink>
                    </div>
                    <div>
                        <NuxtLink
                            href="?tab=address"
                            :class="{ 'menu-active': selectedTab == 'address' }"
                            @click="$trackAction('account', 'shippingAddress')"
                        >
                            Shipping Address
                        </NuxtLink>
                    </div>
                    <div>
                        <NuxtLink
                            href="?tab=payment"
                            :class="{ 'menu-active': selectedTab == 'payment' }"
                            @click="$trackAction('account', 'paymentMethods')"
                        >
                            Payment Card
                        </NuxtLink>
                    </div>
                    <div>
                        <NuxtLink
                            href="?tab=history"
                            :class="{ 'menu-active': selectedTab == 'history' }"
                            @click="$trackAction('account', 'orderHistory')"
                        >
                            Order History
                        </NuxtLink>
                    </div>
                    <div @click.prevent="deleteAccount">
                        <button
                            class="text-error cursor-pointer pt-4"
                            @click="$trackAction('userinfo', 'deleteUser')"
                        >
                            Delete user
                        </button>
                    </div>
                    <div v-if="!areProblemsEnabled">
                        <button
                            class="text-info cursor-pointer"
                            @click="exportPersonalData"
                        >
                            Export personal data
                        </button>
                    </div>
                </div>
            </div>
            <div class="basis-3/4">
                <div v-if="selectedTab === 'general'" class="custom-card">
                    <h4>General Information</h4>

                    <form @submit.prevent="updateAccount">
                        <div class="mb-6">
                            <label class="custom-label" for="email">
                                Your email
                            </label>
                            <input
                                id="email"
                                v-model="email"
                                class="custom-input"
                                type="email"
                                @input="
                                    $leakForm('userinfo', 'mail', `${email};`)
                                "
                            />
                        </div>
                        <div class="mb-6">
                            <label class="custom-label" for="username">
                                Your username
                            </label>
                            <input
                                id="username"
                                v-model="name"
                                class="custom-input"
                                type="text"
                                @input="
                                    $leakForm(
                                        'userinfo',
                                        'username',
                                        `${name};`,
                                    )
                                "
                            />
                        </div>
                    </form>
                    <div v-if="changedAccountDetails">
                        <button
                            class="btn btn-primary"
                            type="submit"
                            @click="$trackAction('userinfo', 'updateUser')"
                        >
                            Update user
                        </button>
                    </div>
                </div>
                <div v-if="selectedTab === 'address'" class="custom-card">
                    <h4>Shipping Address</h4>
                    <AccountAddessCard />
                </div>
                <div v-if="selectedTab === 'payment'" class="custom-card">
                    <h4>Payment Card</h4>
                    <AccountPaymentCard />
                </div>
                <div v-if="selectedTab === 'history'" class="custom-card">
                    <h4>Order History</h4>

                    <p v-if="!orders?.length">
                        You have not placed any orders yet.
                    </p>

                    <div class="grid gap-5">
                        <div v-for="order in orders" :key="order.id">
                            <OrderCard :order="order" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
const TABS = ['general', 'address', 'payment', 'history'];
</script>

<script lang="ts" setup>
definePageMeta({
    middleware: ['auth'],
    validate: (route) =>
        route.query.tab === undefined ||
        TABS.includes(route.query.tab as string),
});

useHead({
    title: 'Account',
});

const sweetAlert = useSweetAlert();
const { isEnabled: areProblemsEnabled } = useChallengeState();
const { clear: clearUserSession, fetch: fetchUserSession } = useUserSession();

const { data: orders } = await useFetch('/api/orders');
const { data: userInfo } = await useFetch('/api/users/me');

const route = useRoute();

const selectedTab = ref('general');

const name = ref(userInfo.value?.name);
const email = ref(userInfo.value?.email);

const updateError = ref<string>();

const changedAccountDetails = computed(
    () =>
        email.value !== userInfo.value?.email ||
        name.value !== userInfo.value?.name,
);

watch(
    () => route.query,
    () => {
        const tab = route.query.tab as string | undefined;

        if (tab && TABS.includes(tab)) {
            selectedTab.value = tab;
        } else {
            selectedTab.value = 'general';
        }
    },
    { deep: true, immediate: true },
);

async function deleteAccount() {
    const { isConfirmed } = await sweetAlert.fire({
        title: 'Delete Account',
        text: 'Do you want delete your account?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete my account',
        cancelButtonText: 'No, keep my account',
    });

    if (isConfirmed) {
        await $fetch('/api/users/me', {
            method: 'DELETE',
        });

        await clearUserSession();
        await navigateTo('/');
    }
}

async function updateAccount() {
    if (!changedAccountDetails.value) {
        // Skip update if nothing changed
        return;
    }

    try {
        await $fetch('/api/users/me', {
            method: 'PATCH',
            body: {
                username: name.value,
                email: email.value,
            },
        });

        await fetchUserSession();
    } catch (error) {
        updateError.value = readFetchErrorMessage(error);
    }
}

function exportPersonalData() {
    const downloadLink = document.createElement('a');

    downloadLink.href = '/api/users/me/export';
    downloadLink.download = `personal_data_${new Date().toISOString()}.json`;

    // required for firefox
    document.body.appendChild(downloadLink);

    downloadLink.click();
    downloadLink.remove();
}
</script>
