"use client";

import { useEffect, useId, useState } from "react";
import { useRouter } from "next/navigation";

export type SearchEntry = { code: string; description: string; category: string; href: string; keywords: string };

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

export function CodeSearch({ entries }: { entries: SearchEntry[] }) {
  const router = useRouter();
  const listId = `cpt-search-${useId()}`;
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const search = normalize(query);
  const terms = search.split(" ");
  const matches = search ? entries.filter((entry) => {
    const text = normalize(`${entry.code} ${entry.description} ${entry.category} ${entry.keywords}`);
    return terms.every((term) => text.includes(term));
  }).sort((a, b) => Number(b.code === search) - Number(a.code === search)).slice(0, 8) : [];
  const expanded = open && matches.length > 0;
  const activeId = expanded && matches[active] ? `${listId}-${matches[active].code}` : undefined;

  useEffect(() => {
    if (activeId) document.getElementById(activeId)?.scrollIntoView({ block: "nearest" });
  }, [activeId]);

  return (
    <form className="relative" role="search" onSubmit={(event) => {
      event.preventDefault();
      if (matches.length) router.push(matches[active]?.href ?? matches[0].href);
    }}>
      <label htmlFor={`${listId}-input`} className="block">Find a CPT code or procedure</label>
      <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2">
        <input
          type="text"
          id={`${listId}-input`}
          role="combobox"
          aria-expanded={expanded}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={activeId}
          autoComplete="off"
          className="field shadow-sm"
          placeholder="Try 99214, chest X-ray, or knee pain"
          value={query}
          onChange={(event) => {
            setQuery(event.currentTarget.value);
            setActive(-1);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => { setOpen(false); setActive(-1); }}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setOpen(false);
              setActive(-1);
            }
            if (matches.length && (event.key === "ArrowDown" || event.key === "ArrowUp")) {
              event.preventDefault();
              setOpen(true);
              if (!open || active === -1) {
                setActive(event.key === "ArrowDown" ? 0 : matches.length - 1);
              } else {
                setActive((active + (event.key === "ArrowDown" ? 1 : -1) + matches.length) % matches.length);
              }
            }
          }}
        />
        <button type="submit" className="primary-action mt-2">Search</button>
      </div>
      <ul id={listId} role="listbox" aria-label="CPT matches" hidden={!expanded}
        className="absolute inset-x-0 top-full z-10 mt-2 max-h-80 overflow-y-auto rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
        {matches.map((entry, index) => (
          <li key={entry.code} id={`${listId}-${entry.code}`} role="option" aria-selected={index === active}
            className={`cursor-pointer px-4 py-3 text-sm ${index === active ? "bg-teal-50" : "hover:bg-teal-50"}`}
            onPointerDown={(event) => event.preventDefault()} onClick={() => router.push(entry.href)}>
            <span className="mr-3 font-mono font-semibold text-teal-800">{entry.code}</span>
            {entry.description}
          </li>
        ))}
      </ul>
      <p className="mt-2 text-sm text-slate-600" aria-live="polite">
        {open && search && !matches.length ? "No matches. Try a shorter term or enter the code on your bill." :
          "Symptom matches help you browse. Compare the code printed on your actual bill."}
      </p>
    </form>
  );
}
