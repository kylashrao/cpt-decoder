import type { ReactNode } from "react";

export function TrustPage({ title, intro, children }: { title: string; intro: string; children: ReactNode }) {
  return (
    <article className="mx-auto max-w-3xl">
      <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
      <p className="mt-4 text-lg leading-relaxed text-slate-700">{intro}</p>
      <div className="trust-copy mt-8 space-y-7">{children}</div>
    </article>
  );
}
