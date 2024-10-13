import { ReactNode } from 'react';

import { SessionClientProvider } from '@/providers/session';
type Props = {
    children: ReactNode;
};
export default function RootLayout({ children }: Props) {
    return (
        <html lang="en">
            <body>
                <SessionClientProvider>{children}</SessionClientProvider>
            </body>
        </html>
    );
}
