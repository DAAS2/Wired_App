import "./globals.css";
import type { Metadata } from "next";
import { AiWidget } from "@/components/AiWidget";

export const metadata: Metadata = {
  title: "Monash Student Hub",
  description: "Monash student dashboard with Gemini AI assistant.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-50">
        {children}
        <AiWidget />
      </body>
    </html>
  );
}