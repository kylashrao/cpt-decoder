import type { ReactNode } from "react";

export function AdSlot({ children }: { children?: ReactNode }) {
  return (
    <aside
      aria-label="Advertisement"
      className="my-10 overflow-hidden rounded-xl border border-slate-200 bg-slate-100/60 text-center print:hidden"
    >
      <p className="flex h-7 items-center justify-center text-xs text-slate-600">Advertisement</p>
      <div className="flex h-[250px] min-h-[250px] items-center justify-center overflow-hidden sm:h-[280px] sm:min-h-[280px]">
        {children}
      </div>
    </aside>
  );
}
