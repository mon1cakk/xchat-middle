'use client';
import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

type Props = {
    children: ReactNode;
};
export const SessionClientProvider = ({ children }: Props) => {
    return <SessionProvider>{children}</SessionProvider>;
};

