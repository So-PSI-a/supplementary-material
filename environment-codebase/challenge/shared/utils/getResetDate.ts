/**
 * Options for {@link getResetDate}.
 */
export interface GetResetDateOptions {
    /**
     * Whether to get the date for the last reset (6 AM UTC of the current day)
     * or the next reset (6 AM UTC of the next day).
     */
    type: 'last' | 'next';

    /**
     * The date from which to calculate the reset date.
     * If not provided, the current date is used.
     *
     * @default new Date()
     */
    fromDate?: Date | number;
}

/**
 * Gets the reset date (6 AM UTC) based on the provided options.
 *
 * @param options - Options for getting the reset date.
 * @returns The reset date.
 */
export function getResetDate({ type, fromDate }: GetResetDateOptions): Date {
    const resetDate = fromDate ? new Date(fromDate) : new Date();

    if (type === 'next') {
        resetDate.setDate(resetDate.getDate() + 1);
    }

    resetDate.setUTCHours(6, 0, 0, 0);

    return resetDate;
}
