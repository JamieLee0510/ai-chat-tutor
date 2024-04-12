import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { DM_Sans } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
const font = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "AI Tutor",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={font.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}
