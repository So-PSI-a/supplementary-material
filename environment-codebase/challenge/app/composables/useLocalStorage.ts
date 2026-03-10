import { ref, watch } from 'vue';

/**
 * A composable to manage a value in localStorage with reactivity.
 * The value is loaded from localStorage on initialization and save
 * whenever it changes.
 *
 * @param key The localStorage key to use.
 * @param initialValue The initial value to use if none is found in localStorage.
 * @returns A reactive reference to the stored value.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
    const storedValue = ref<T>(read());

    const isClient = !import.meta.env.SSR;

    function read(): T {
        try {
            const item = localStorage.getItem(key);

            return item ? (JSON.parse(item) as T) : initialValue;
        } catch {
            return initialValue;
        }
    }

    function write(value: T) {
        if (!isClient) {
            return;
        }

        localStorage.setItem(key, JSON.stringify(value));
    }

    function onStorage(event: StorageEvent) {
        if (
            event.storageArea === localStorage &&
            event.key === key &&
            event.oldValue !== event.newValue
        ) {
            storedValue.value = read();
        }
    }

    onBeforeMount(() => {
        window.addEventListener('storage', onStorage);
    });

    onBeforeUnmount(() => {
        window.removeEventListener('storage', onStorage);
    });

    watch(
        storedValue,
        (newValue) => {
            write(newValue);
        },
        { deep: true, immediate: false },
    );

    return storedValue;
}
