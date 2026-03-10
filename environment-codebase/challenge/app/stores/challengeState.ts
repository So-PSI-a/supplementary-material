/**
 * Store to manage the problems feature state.
 *
 * If the problems feature is disabled,
 * all problematic features ("problems") are disabled.
 */
export const useChallengeState = defineStore('challengeState', () => {
    const { session, fetch: fetchUserSession } = useUserSession();

    const isEnabled = computed(() => session.value?.problemsDisabled !== true);

    async function toggle() {
        console.log('HERE');
        await $fetch('/api/_challenge/state', {
            method: 'POST',
            body: {
                // No need to double negate here
                disable: isEnabled.value,
            },
        });

        await fetchUserSession();

        reloadNuxtApp({ force: true });
    }

    return {
        isEnabled,
        toggle,
    };
});
