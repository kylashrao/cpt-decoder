import type { Metadata } from "next";
import Link from "next/link";
import { guidePath, topGuides } from "../lib/guides";
import { siteName, siteOrigin, trustLinks } from "../lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: { default: "Medical Bill & CPT Code Decoder", template: "%s | CPT Decoder" },
  description: "Understand CPT codes and compare 2026 Original Medicare physician fee estimates.",
  openGraph: { siteName, locale: "en_US", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-20 focus:bg-white focus:p-3">Skip to content</a>
        <header className="border-b border-slate-200 bg-white">
          <nav aria-label="Main" className="relative mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-5 py-5 sm:px-8">
            <Link href="/" className="font-bold text-teal-800">CPT Decoder</Link>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-slate-700">
              <Link href="/dispute-letter" className="hover:text-teal-800 hover:underline">Dispute letter</Link>
              <details className="sm:relative">
                <summary className="cursor-pointer hover:text-teal-800">Billing guides</summary>
                <ul className="absolute inset-x-5 z-30 mt-2 sm:inset-x-auto sm:right-0 sm:w-56 space-y-1 rounded-lg border border-slate-200 bg-white p-2 shadow-lg">
                  <li><Link href="/guides" className="block rounded p-2 hover:bg-teal-50">All eight billing guides</Link></li>
                  {topGuides.map((guide) => <li key={guide.slug}><Link href={guidePath(guide)} className="block rounded p-2 hover:bg-teal-50">{guide.label}</Link></li>)}
                </ul>
              </details>
              <details className="sm:relative">
                <summary className="cursor-pointer hover:text-teal-800">About &amp; policies</summary>
                <ul className="absolute inset-x-5 z-30 mt-2 sm:inset-x-auto sm:right-0 sm:w-48 space-y-1 rounded-lg border border-slate-200 bg-white p-2 shadow-lg">
                  {trustLinks.map(({ href, label }) => <li key={href}><Link href={href} className="block rounded p-2 hover:bg-teal-50">{label}</Link></li>)}
                </ul>
              </details>
            </div>
          </nav>
        </header>
        <main id="main-content" className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14">{children}</main>
        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-5xl px-5 py-8 text-sm leading-relaxed text-slate-600 sm:px-8">
            <div className="grid gap-6 sm:grid-cols-2">
              <nav aria-label="About and policies">
                <p className="font-semibold text-slate-900">About and policies</p>
                <ul className="mt-2 space-y-1">
                  {trustLinks.map(({ href, label }) => <li key={href}><Link href={href} className="underline">{label}</Link></li>)}
                </ul>
              </nav>
              <nav aria-label="Popular billing guides">
                <p className="font-semibold text-slate-900">Popular billing guides</p>
                <ul className="mt-2 space-y-1">
                  {topGuides.map((guide) => <li key={guide.slug}><Link href={guidePath(guide)} className="underline">{guide.label}</Link></li>)}
                  <li><Link href="/guides" className="underline">All billing guides</Link></li>
                </ul>
              </nav>
            </div>
            <p className="mt-6 border-t border-slate-200 pt-4">For education only. Ask a qualified clinician about medical decisions and confirm billing, coverage, and amounts owed with your provider or insurer.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
