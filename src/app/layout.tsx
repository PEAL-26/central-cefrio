import "./globals.css";

import type { Metadata } from "next";
import { PrimeReactProvider } from "primereact/api";
import Tailwind from "primereact/passthrough/tailwind";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { cn } from "@/libs/utils";
import { AppLayout } from "@/components/layout";
import { QueryClientProvider } from "@/providers";

import { inter } from "./fonts";

export const metadata: Metadata = {
  title: { default: "Cefrio", template: "%s | Cefrio" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className={cn(inter.className, "overflow-hidden")}>
        <NuqsAdapter>
          <QueryClientProvider>
            <PrimeReactProvider value={{ unstyled: true, pt: Tailwind }}>
              <AppLayout>{children}</AppLayout>
            </PrimeReactProvider>
          </QueryClientProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
