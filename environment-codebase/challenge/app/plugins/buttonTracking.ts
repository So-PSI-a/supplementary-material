/**
 * A plugin that allows tracking of user actions such as button clicks.
 */
export default defineNuxtPlugin(() => {
    const {
        public: { trackingEndpoint },
    } = useRuntimeConfig();

    const { isEnabled: areProblemsEnabled } = useChallengeState();
    const audienceId = useCookie('aud', { readonly: true });

    async function trackAction(
        place: string,
        action: string,
        context?: string,
    ) {
        if (!areProblemsEnabled) {
            return;
        }

        if (audienceId.value) {
            await fetch(trackingEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    audId: audienceId.value,
                    place,
                    action,
                    data: context,
                }),
            });
        }
    }

    return {
        provide: {
            trackAction,
        },
    };
});
