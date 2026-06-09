import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kids AI Learning Game 🎨",
  description: "Fun educational game for kids - learn colors, shapes, and animals!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen bg-gradient-to-br from-green-400 via-amber-400 to-orange-600">
        {children}
      </body>
    </html>
  );
}
