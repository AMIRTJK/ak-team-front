import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  // TODO: заменить на реальный домен, когда будет известен
  metadataBase: new URL("https://ak-team.dev"),
  title: {
    default: "A&K Team — Web, Infrastructure & AI Engineering",
    template: "%s | A&K Team",
  },
  description:
    "A&K Team is a compact engineering studio building web applications, complex websites, server infrastructure and local AI solutions — designed, built, deployed and supported end-to-end.",
  keywords: [
    "A&K Team",
    "web development",
    "Next.js",
    "React",
    "frontend",
    "backend",
    "DevOps",
    "AI solutions",
    "local LLM",
    "RAG",
    "web studio",
  ],
  authors: [{ name: "A&K Team" }],
  openGraph: {
    type: "website",
    siteName: "A&K Team",
    title: "A&K Team — Web, Infrastructure & AI Engineering",
    description:
      "A compact engineering studio building web apps, complex sites, server infrastructure and local AI — end-to-end.",
    images: ["/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "A&K Team — Web, Infrastructure & AI Engineering",
    description:
      "A compact engineering studio building web apps, complex sites, server infrastructure and local AI — end-to-end.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
