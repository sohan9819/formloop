import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { headers } from "next/headers";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";

import { TRPCReactProvider } from "@/trpc/react";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { DeisgnerContextProvider } from "@/context/DesignerContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "FormLoop",
  description:
    "An open source application that lets you create and manage forms effortlessly.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`font-sans ${inter.variable}`}>
          <TRPCReactProvider headers={headers()}>
            <DeisgnerContextProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                {children}
                <Toaster position="top-right" />
              </ThemeProvider>
            </DeisgnerContextProvider>
          </TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
