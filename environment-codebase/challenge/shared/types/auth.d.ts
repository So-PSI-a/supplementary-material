declare module '#auth-utils' {
    interface UserSession {
        loggedInAt?: number;

        /**
         * If true, the "problems" features are enabled for this user.
         * If false or undefined, all problematic features are disabled.
         */
        problemsDisabled?: boolean;
    }

    interface User {
        id: number;

        // Ensure we don't accidently pass a user object directly
        password?: never;
    }
}

export {};
