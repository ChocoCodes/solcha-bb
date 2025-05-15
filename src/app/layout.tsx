import type { Metadata } from "next";
import { AuthProvider } from "@/context/AuthContext";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "GabayBulkan",
  description: "desc-here",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
