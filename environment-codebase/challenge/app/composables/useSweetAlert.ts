import SweetAlert2 from 'sweetalert2';

const instance = SweetAlert2.mixin({
    theme: 'auto',
    customClass: {
        confirmButton: 'btn !btn-primary mx-2',
        denyButton: 'btn mx-2',
        cancelButton: 'btn btn-secondary mx-2',
    },
    buttonsStyling: false,
});

/**
 * Composable to use SweetAlert2 instance.
 *
 * This is just a convience wrapper that removes the need
 * to import and configure SweetAlert2 in every file where it's needed.
 *
 * @returns The configured SweetAlert2 instance.
 */
export const useSweetAlert = () => instance;
