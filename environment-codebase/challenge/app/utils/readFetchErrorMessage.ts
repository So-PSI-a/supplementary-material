import { FetchError } from 'ofetch';

/**
 * Helper to extract the error message (which the backend provided)
 * from a {@link FetchError}.
 *
 * @param error - The error to extract the message from
 * @returns The extracted error message
 * @throws The original error if it is not a {@link FetchError}, so it can be
 *         handled further up the chain
 */
export function readFetchErrorMessage(error: unknown): string {
    if (!(error instanceof FetchError)) {
        throw error;
    }

    return error.response?._data?.message ?? error.message;
}
