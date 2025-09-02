import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Pickle AI",
  description: "A smart AI-powered project management platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}