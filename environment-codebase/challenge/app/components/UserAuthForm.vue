<template>
    <form @submit.prevent="onSubmit()">
        <div class="grid gap-y-5">
            <div class="flex gap-x-5">
                <input
                    v-if="showNameField"
                    v-model="name"
                    class="custom-input-short"
                    label="Name"
                    placeholder="fancyUsername"
                    minlength="4"
                    required
                    type="text"
                />

                <input
                    v-model="email"
                    class="custom-input-short"
                    label="Email"
                    placeholder="fancy@mail.com"
                    required
                    type="email"
                />

                <input
                    v-model="password"
                    class="custom-input-short"
                    label="Password"
                    placeholder="fancyPassword"
                    minlength="6"
                    required
                    type="password"
                />
            </div>
            <div>
                <button
                    class="btn btn-primary"
                    @click="$trackAction('authentication', submitText)"
                >
                    {{ submitText }}
                </button>
            </div>
        </div>
    </form>
</template>

<script lang="ts">
export interface UserInfo {
    name: string;
    email: string;
    password: string;
}
</script>

<script lang="ts" setup>
const name = ref('');
const email = ref('');
const password = ref('');

const emit = defineEmits<{
    submit: [userInfo: UserInfo];
}>();

defineProps<{
    showNameField?: boolean;
    submitText: string;
}>();

function onSubmit() {
    const userInfo = {
        name: name.value,
        email: email.value,
        password: password.value,
    };

    emit('submit', userInfo);
}
</script>
