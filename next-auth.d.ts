// next-auth.d.ts
import NextAuth from 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: {
            name?: string | null;
            email?: string | null;
            image?: string | null;
            screen_name?: string | null;
        };
    }

    interface User {
        screen_name?: string;
    }
}
