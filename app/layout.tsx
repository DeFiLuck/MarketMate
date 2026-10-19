import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'MarketMate | Owner Control Centre', description: 'Manage sellers, transactions and platform operations for MarketMate.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
