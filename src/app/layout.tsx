import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "SkillSprint — Turn your skill gaps into projects",
  description: "Upload your resume, add target jobs, and get project ideas to close your skill gaps.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased min-h-screen bg-gray-50/50 flex flex-col font-sans"
      >
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
