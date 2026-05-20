import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'AI-Ready TodoList',
  description: 'Projeto de referência do e-book AI-Ready',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="font-[var(--font-inter)] min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-violet-950">
        {children}
      </body>
    </html>
  );
}
