export function formatDateTime(dateString: string): string {
    const date = new Date(dateString);

    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',

        // Use 24-hour format to keep the dates shorter (no AM/PM)
        hour12: false,
    });
}
