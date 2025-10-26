import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ChatUIX - Interactive Chat UI",
  description: "A chatbot that generates interactive UI elements within the chat interface",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
