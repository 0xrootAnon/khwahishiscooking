import '@/styles/globals.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
    title: 'Khwahish Sharma',
    description: 'portfolio of Khwahish Sharma',
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
        <body>{children}</body>
        </html>
    );
}
