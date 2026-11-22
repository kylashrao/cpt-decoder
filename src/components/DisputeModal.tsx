"use client";

import { useId, useRef, useState } from "react";

type LetterContext = {
  code?: string;
  billed?: string;
  benchmark?: string;
  locality?: string;
  setting?: string;
};

const cmsRights = "https://www.cms.gov/initiatives/your-patient-rights/medical-bill-rights";
const cmsRates = "https://www.cms.gov/medicare/physician-fee-schedule/search/overview";
const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

function formatAmount(raw: string | undefined) {
  return raw && /^(?:\d+(?:\.\d{0,2})?|\.\d{1,2})$/.test(raw.trim()) &&
    Number.isSafeInteger(Math.round(Number(raw) * 100)) ? money.format(Number(raw)) : "";
}

export function DisputeLetterForm({ context = {} }: { context?: LetterContext }) {
  const [fields, setFields] = useState({
    name: "", provider: "", reference: "", serviceDate: "",
    code: context.code ?? "", billed: context.billed ?? "", issue: "",
  });
  const [status, setStatus] = useState("");
  const preview = useRef<HTMLPreElement>(null);
  const heading = `letter-heading-${useId()}`;
  const code = fields.code.trim();
  const billed = formatAmount(fields.billed);
  const benchmark = code && code === context.code && formatAmount(context.benchmark);
  const letter = [
    "Subject: Request for an itemized medical bill and billing review",
    `To ${fields.provider.trim() || "the Billing Department"},`,
    `I am requesting a review of ${fields.reference.trim() ? `bill or account ${fields.reference.trim()}` : "my medical bill"}${fields.serviceDate.trim() ? ` for services on ${fields.serviceDate.trim()}` : ""}. ` +
      "Please send an itemized statement showing dates of service, billing codes, modifiers, units, individual charges, and any insurance payments, adjustments, or credits.",
    ...(code || billed ? [`Please review ${code ? `CPT ${code}` : "the billed service"}${billed ? ` with a listed charge of ${billed}` : ""}.`] : []),
    ...(fields.issue.trim() ? [fields.issue.trim()] : []),
    benchmark
      ? `For comparison, the CMS 2026 nonqualifying APM Physician Fee Schedule estimate for CPT ${code} is ${benchmark} for ${context.locality} in the ${context.setting} setting. I am using the estimate as a reference for the professional service. Please explain any difference and identify separate facility charges. CMS reference: ${cmsRates}`
      : `Where applicable, please explain how the clinician charge compares with the CMS 2026 nonqualifying APM Physician Fee Schedule for the same code, setting, and locality. I am using Medicare rates as a reference for review. CMS reference: ${cmsRates}`,
    `If federal No Surprises Act protections apply to this bill, please explain the applicable cost-sharing and balance-billing rules and correct any covered billing error. If I was billed as uninsured or self-pay, please send any good faith estimate and explain differences between that estimate and the bill. CMS patient rights: ${cmsRights}`,
    "Please confirm receipt and respond in writing with your findings and any revised statement. If possible, please pause collection activity while you review this request.",
    `Sincerely,\n${fields.name.trim() || "[Your name]"}`,
  ].join("\n\n");

  async function copyLetter() {
    try {
      await navigator.clipboard.writeText(letter);
      setStatus("Letter copied.");
    } catch {
      const selection = window.getSelection();
      if (selection && preview.current) {
        const range = document.createRange();
        range.selectNodeContents(preview.current);
        selection.removeAllRanges();
        selection.addRange(range);
        preview.current.focus({ preventScroll: true });
      }
      setStatus("Automatic copy is unavailable. Select the letter and use your device’s copy command.");
    }
  }

  return (
    <section aria-labelledby={heading} className="letter-generator">
      <div className="print:hidden">
        <h2 id={heading} className="text-xl font-semibold">Customize your request</h2>
        <p className="mt-2 text-sm text-slate-600">Fields are optional. Your entries stay in this browser session. Review the draft before sending it to your billing office.</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {([
            ["name", "Your name"], ["provider", "Provider or billing department"],
            ["reference", "Bill or account reference"], ["serviceDate", "Date of service"],
            ["code", "CPT code"], ["billed", "Billed charge (USD)"],
          ] as const).map(([key, label]) => (
            <label key={key}>{label}
              <input type="text" className="field" value={fields[key]} inputMode={key === "billed" ? "decimal" : undefined}
                onChange={(event) => {
                  setFields({ ...fields, [key]: event.currentTarget.value });
                  setStatus("");
                }} />
            </label>
          ))}
        </div>
        <label className="mt-4 block">What would you like the billing office to review?
          <textarea className="field" rows={3} value={fields.issue} onChange={(event) => {
            setFields({ ...fields, issue: event.currentTarget.value });
            setStatus("");
          }} />
        </label>
        {fields.billed.trim() && !billed && <p className="mt-2 text-sm text-slate-700">Enter a valid dollar amount to include it in the letter.</p>}
        <div className="mt-5 flex flex-wrap gap-3">
          <button type="button" className="primary-action" onClick={copyLetter}>Copy to Clipboard</button>
          <button type="button" className="secondary-action" onClick={() => window.print()}>Print / Save as PDF</button>
        </div>
        <p role="status" className="mt-2 min-h-5 text-sm text-teal-800">{status}</p>
        <h3 className="mt-4 font-semibold">Letter preview</h3>
      </div>
      <pre ref={preview} tabIndex={0} className="letter-print mt-2 whitespace-pre-wrap break-words rounded-xl border border-slate-200 bg-white p-5 font-sans text-sm leading-relaxed">{letter}</pre>
    </section>
  );
}

export function DisputeModal({ context }: { context: LetterContext }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const heading = `letter-heading-${useId()}`;
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button type="button" className="secondary-action" onClick={() => {
        setOpen(true);
        dialog.current?.showModal();
      }}>Draft a dispute letter</button>
      <dialog ref={dialog} aria-labelledby={heading} onClose={() => setOpen(false)}
        className="letter-dialog max-h-[90dvh] w-[calc(100%_-_2rem)] max-w-[46rem] overflow-y-auto rounded-2xl border border-slate-200 p-5 text-slate-900 shadow-xl backdrop:bg-slate-950/50 sm:p-8">
        <div className="mb-5 flex items-start justify-between gap-3 print:hidden">
          <h2 id={heading} className="text-2xl font-bold">Medical bill dispute letter</h2>
          <button autoFocus type="button" className="secondary-action" onClick={() => dialog.current?.close()}>Close</button>
        </div>
        {open && <DisputeLetterForm context={context} />}
      </dialog>
    </div>
  );
}
