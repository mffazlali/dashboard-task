import type { Metadata } from 'next';
import { ChakraProvider } from '@/shared/providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dashboard Task',
  description: 'A modern Next.js dashboard with feature-based architecture',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ChakraProvider>{children}</ChakraProvider>
      </body>
    </html>
  );
}
