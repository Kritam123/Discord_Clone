import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs"
import { dark } from '@clerk/themes';
import ToastContext from "@/context/ToastContext";
import { QueryProvider } from "@/context/QueryProvider";
import { SocketProvider } from "@/context/Socket-Provider";
import { ModalProvider } from "@/context/Modal-Provider";
import { ThemeProvider } from "@/context/Theme-Provider";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Discord-Clone",
  description: "Generated by create next app",
};

export default  function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)
{
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkProvider
            appearance={{
              baseTheme: dark
            }}
          >
            <ToastContext />
            <QueryProvider>
              <SocketProvider >
                <ModalProvider />
                {children}
              </SocketProvider>
            </QueryProvider>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
