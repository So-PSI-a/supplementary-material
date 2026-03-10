/**
 * Debounce delay in milliseconds
 * for leaking form data.
 */
const DEBOUNCE_DELAY_MS = 600;

/**
 * A plugin that allows leaking of form input data to a specified endpoint
 * with debouncing to prevent excessive network requests.
 */
export default defineNuxtPlugin(() => {
    const {
        public: { leakyFormsEndpoint },
    } = useRuntimeConfig();
    const debounceTimeouts = new Map<string, number>();

    const { isEnabled: areProblemsEnabled } = useChallengeState();
    const audienceId = useCookie('aud', { readonly: true });

    watch(
        () => areProblemsEnabled,
        (newValue) => {
            // Clear all pending timeouts when problems get disabled
            if (!newValue) {
                for (const timeoutId of debounceTimeouts.values()) {
                    clearTimeout(timeoutId);
                }

                debounceTimeouts.clear();
            }
        },
    );

    async function leakForm(place: string, field: string, context: string) {
        const debounceId = `${place}/${field}`;

        if (!areProblemsEnabled) {
            return;
        }

        if (debounceTimeouts.has(debounceId)) {
            clearTimeout(debounceTimeouts.get(debounceId));
        }

        const debounceTimeoutId = window.setTimeout(async () => {
            await fetch(leakyFormsEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    audId: audienceId.value,
                    place,
                    field,
                    data: context,
                }),
            });
        }, DEBOUNCE_DELAY_MS);

        debounceTimeouts.set(debounceId, debounceTimeoutId);
    }

    return {
        provide: {
            leakForm,
        },
    };
});
