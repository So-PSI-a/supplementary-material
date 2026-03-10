<template>
    <div v-if="isEditing">
        <form @submit.prevent="savePaymentMethod">
            <div class="mb-6">
                <label class="custom-label" for="cardNumber">
                    Card number
                </label>
                <input
                    id="cardNumber"
                    v-model="cardNumber"
                    class="custom-input"
                    required
                    type="text"
                />
            </div>
            <div class="mb-6">
                <label class="custom-label" for="cardOwner">Card owner</label>
                <input
                    id="cardOwner"
                    v-model="cardOwner"
                    class="custom-input"
                    required
                    type="text"
                />
            </div>
            <div class="mb-6">
                <label class="custom-label" for="validUntil">
                    Valid until
                </label>
                <input
                    id="validUntil"
                    v-model="validUntil"
                    class="custom-input"
                    required
                    type="date"
                />
            </div>
            <div class="mb-6">
                <label class="custom-label" for="cvc">CVC</label>
                <input
                    id="cvc"
                    v-model="cvc"
                    class="custom-input"
                    required
                    min="1000"
                    type="number"
                />
            </div>
            <button
                class="btn btn-primary"
                @click="$trackAction('payment', 'save')"
            >
                Save payment info
            </button>

            <p v-if="paymentMethodError" class="mt-4 text-red-600">
                {{ paymentMethodError }}
            </p>
        </form>
    </div>
    <div v-else>
        Card number: {{ paymentMethod?.cardNumber }}<br />
        Card owner: {{ paymentMethod?.cardOwner }}
        <div @click.prevent="clearPaymentMethod">
            <button
                class="btn btn-primary mt-5"
                @click="$trackAction('payment', 'clear')"
            >
                Delete payment method
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
const sweetAlert = useSweetAlert();

const { data: paymentMethod, refresh: refreshPaymentMethod } = await useFetch(
    '/api/users/me/payment-method',
    {
        // Ignore the 404 error if the user has no payment method yet
        ignoreResponseError: true,
    },
);

const cardNumber = ref(paymentMethod.value?.cardNumber ?? '');
const cardOwner = ref(paymentMethod.value?.cardOwner ?? '');
const validUntil = ref(paymentMethod.value?.validUntil ?? '');
const cvc = ref(paymentMethod.value?.cvc ?? '');

const isEditing = ref(
    !paymentMethod.value || !('cardNumber' in paymentMethod.value),
);
const paymentMethodError = ref<string>();

async function clearPaymentMethod() {
    try {
        await $fetch('/api/users/me/payment-method', {
            method: 'DELETE',
        });

        cardNumber.value = '';
        cardOwner.value = '';
        validUntil.value = '';
        cvc.value = '';

        isEditing.value = true;

        await refreshPaymentMethod();
    } catch (error) {
        paymentMethodError.value = readFetchErrorMessage(error);
    }
}

async function savePaymentMethod() {
    try {
        await $fetch('/api/users/me/payment-method', {
            method: 'PUT',
            body: {
                cardNumber: cardNumber.value,
                cardOwner: cardOwner.value,
                validUntil: validUntil.value,
                cvc: cvc.value,
            },
        });

        await refreshPaymentMethod();

        await sweetAlert.fire({
            title: 'Validating payment method',
            icon: 'info',
            allowEscapeKey: false,
            allowOutsideClick: false,
            timer: 2000,
            timerProgressBar: false,
            text: 'Please Wait',
            showConfirmButton: false,
        });

        await sweetAlert.fire({
            title: 'Validation successful',
            icon: 'success',
            allowEscapeKey: false,
            allowOutsideClick: false,
            timer: 3000,
            timerProgressBar: false,
            text: `Cart ${cardNumber.value} can now be used for future payments.`,
            showConfirmButton: false,
        });

        isEditing.value = false;
    } catch (error) {
        paymentMethodError.value = readFetchErrorMessage(error);
    }
}
</script>
