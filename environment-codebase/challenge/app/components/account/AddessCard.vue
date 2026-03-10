<template>
    <div v-if="isEditing">
        <form @submit.prevent="saveAddress">
            <div class="mb-6">
                <label for="fullName" class="custom-label">Full Name</label>
                <input
                    id="fullName"
                    v-model="fullName"
                    type="text"
                    required
                    class="custom-input"
                    @input="
                        $leakForm('userinfo', 'address fullName', `${fullName}`)
                    "
                />
            </div>
            <div class="mb-6">
                <label for="addressLine1" class="custom-label">
                    Address Line 1
                </label>
                <input
                    id="addressLine1"
                    v-model="addressLine1"
                    type="text"
                    required
                    class="custom-input"
                    @cancel="console.log('test')"
                    @input="
                        $leakForm(
                            'userinfo',
                            'address addressLine1',
                            `${addressLine1}`,
                        )
                    "
                />
            </div>
            <div class="mb-6">
                <label for="addressLine2" class="custom-label">
                    Address Line 2
                </label>
                <input
                    id="addressLine2"
                    v-model="addressLine2"
                    type="text"
                    class="custom-input"
                    @input="
                        $leakForm(
                            'userinfo',
                            'address addressLine2',
                            `${addressLine2}`,
                        )
                    "
                />
            </div>
            <div class="mb-6">
                <label for="city" class="custom-label">City</label>
                <input
                    id="city"
                    v-model="city"
                    type="text"
                    required
                    class="custom-input"
                    @input="$leakForm('userinfo', 'address city', `${city}`)"
                />
            </div>
            <div class="mb-6">
                <label for="state" class="custom-label">State</label>
                <input
                    id="state"
                    v-model="state"
                    type="text"
                    class="custom-input"
                    @input="$leakForm('userinfo', 'address state', `${state}`)"
                />
            </div>
            <div class="mb-6">
                <label for="zip" class="custom-label">ZIP</label>
                <input
                    id="zip"
                    v-model="zip"
                    type="number"
                    required
                    class="custom-input"
                    @input="$leakForm('userinfo', 'address zip', `${zip}`)"
                />
            </div>
            <div class="mb-6">
                <label for="country" class="custom-label">Country</label>
                <input
                    id="country"
                    v-model="country"
                    type="text"
                    required
                    class="custom-input"
                    @input="$leakForm('userinfo', 'address country', `${zip}`)"
                />
            </div>
            <button
                class="btn btn-primary"
                @click="$trackAction('address', 'save')"
            >
                Save address
            </button>

            <p v-if="addressError" class="mt-4 text-red-600">
                {{ addressError }}
            </p>
        </form>
    </div>
    <div v-else>
        <div>
            {{ address?.fullName }}
        </div>
        <div>
            {{ address?.addressLine1 }}
        </div>
        <div v-if="address?.addressLine2">
            {{ address.addressLine2 }}
        </div>
        <div>
            {{ address?.postalCode }}
            {{ address?.city }}
        </div>
        <div>
            {{ address?.country }}
            <span v-if="address?.state">
                {{ address?.state }}
            </span>
        </div>
        <div @click.prevent="clearAddress">
            <button
                class="btn btn-primary mt-5"
                @click="$trackAction('address', 'clear')"
            >
                Delete address
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
const { data: address, refresh: refreshAddress } = await useFetch(
    '/api/users/me/address',
    {
        // Ignore the 404 error if the user has no address yet
        ignoreResponseError: true,
    },
);

const fullName = ref(address.value?.fullName ?? '');
const addressLine1 = ref(address.value?.addressLine1 ?? '');
const addressLine2 = ref(address.value?.addressLine2 ?? '');
const city = ref(address.value?.city ?? '');
const state = ref(address.value?.state ?? '');
const zip = ref(address.value?.postalCode ?? '');
const country = ref(address.value?.country ?? '');

const isEditing = ref(!address.value || !('fullName' in address.value));
const addressError = ref<string>();

async function clearAddress() {
    try {
        await $fetch('/api/users/me/address', {
            method: 'DELETE',
        });

        fullName.value = '';
        addressLine1.value = '';
        addressLine2.value = '';
        city.value = '';
        state.value = '';
        zip.value = '';
        country.value = '';

        isEditing.value = true;

        await refreshAddress();
    } catch (error) {
        addressError.value = readFetchErrorMessage(error);
    }
}

async function saveAddress() {
    try {
        await $fetch('/api/users/me/address', {
            method: 'PUT',
            body: {
                fullName: fullName.value,
                addressLine1: addressLine1.value,
                addressLine2: addressLine2.value,
                city: city.value,
                state: state.value,
                postalCode: zip.value,
                country: country.value,
            },
        });

        await refreshAddress();

        isEditing.value = false;
    } catch (error) {
        addressError.value = readFetchErrorMessage(error);
    }
}
</script>
