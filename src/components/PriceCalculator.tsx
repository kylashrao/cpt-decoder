"use client";

import { useState } from "react";
import gpciData from "../../data/gpci_localities.json";
import { calculateCmsRates, type Rvus } from "../lib/cmsMath";
import { DisputeModal } from "./DisputeModal";

const { localities } = gpciData;
const stateNames: Record<string, string> = {
  AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas",
  CA: "California", CO: "Colorado", CT: "Connecticut", DE: "Delaware",
  DC: "District of Columbia", FL: "Florida", GA: "Georgia", HI: "Hawaii",
  ID: "Idaho", IL: "Illinois", IN: "Indiana", IA: "Iowa", KS: "Kansas",
  KY: "Kentucky", LA: "Louisiana", ME: "Maine", MD: "Maryland",
  MA: "Massachusetts", MI: "Michigan", MN: "Minnesota", MS: "Mississippi",
  MO: "Missouri", MT: "Montana", NE: "Nebraska", NV: "Nevada",
  NH: "New Hampshire", NJ: "New Jersey", NM: "New Mexico", NY: "New York",
  NC: "North Carolina", ND: "North Dakota", OH: "Ohio", OK: "Oklahoma",
  OR: "Oregon", PA: "Pennsylvania", PR: "Puerto Rico", RI: "Rhode Island",
  SC: "South Carolina", SD: "South Dakota", TN: "Tennessee", TX: "Texas",
  UT: "Utah", VT: "Vermont", VA: "Virginia", VI: "U.S. Virgin Islands",
  WA: "Washington", WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming",
};
const states = [...new Set(localities.flatMap(({ state }) => state ? [state] : []))]
  .map((code) => ({ code, name: stateNames[code] ?? code }))
  .sort((a, b) => a.name.localeCompare(b.name, "en-US"));
const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const settings = {
  nonFacility: "Doctor's Office (Non-Facility)",
  facility: "Hospital Outpatient (Facility)",
} as const;

export function PriceCalculator({ code, rvus }: { code: string; rvus: Rvus }) {
  const [state, setState] = useState("");
  const [localityId, setLocalityId] = useState("");
  const [setting, setSetting] = useState<keyof typeof settings>(
    rvus.nonFacilityPeRvu === null && rvus.facilityPeRvu !== null ? "facility" : "nonFacility",
  );
  const [charge, setCharge] = useState("");
  const options = localities.filter((item) => item.state === state);
  const locality = options.find((item) => item.id === localityId) ?? (options.length === 1 ? options[0] : undefined);
  const rates = calculateCmsRates(rvus, locality ?? localities[0]);
  const estimate = locality ? rates.locality[setting] : null;
  const national = rates.national[setting];
  const billed = /^\d+(?:\.\d{0,2})?$|^\.\d{1,2}$/.test(charge.trim()) &&
    Number.isSafeInteger(Math.round(Number(charge) * 100)) ? Number(charge) : null;
  const difference = estimate && billed !== null
    ? Math.round(billed * 100) - Math.round(estimate.allowed * 100)
    : null;

  return (
    <section aria-labelledby="price-heading" className="panel overflow-hidden p-5 sm:p-8">
      <h2 id="price-heading" className="text-2xl font-semibold tracking-tight">Compare your bill with Medicare</h2>
      <p className="mt-2 max-w-prose text-slate-600">Use the clinician charge for one unit of CPT {code}. A hospital facility fee or total bill covers different charges.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label>State or territory
          <select className="field" value={state} onChange={(event) => {
            setState(event.currentTarget.value);
            setLocalityId("");
          }}>
            <option value="">National Average</option>
            {states.map(({ code, name }) => <option key={code} value={code}>{name}</option>)}
          </select>
        </label>
        <label>Medicare locality
          <select className="field" value={locality?.id ?? ""} disabled={!state} onChange={(event) => setLocalityId(event.currentTarget.value)}>
            {options.length > 1 && <option value="">Choose a locality</option>}
            {options.map((item) => (
              <option key={item.id} value={item.id}>{item.name}</option>
            ))}
          </select>
        </label>
      </div>
      <fieldset className="mt-5">
        <legend className="font-medium">Care setting</legend>
        <div className="mt-2 flex flex-wrap gap-3">
          {(Object.keys(settings) as (keyof typeof settings)[]).map((item) => (
            <label key={item} className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm has-[:checked]:border-teal-700 has-[:checked]:bg-teal-50">
              <input type="radio" name="care-setting" value={item} checked={setting === item}
                className="accent-teal-700" onChange={() => setSetting(item)} />
              {settings[item]}
            </label>
          ))}
        </div>
      </fieldset>
      <label className="mt-5 block max-w-xs">Billed clinician charge (optional)
        <input type="text" className="field" inputMode="decimal" placeholder="0.00" value={charge}
          aria-invalid={Boolean(charge.trim()) && billed === null} aria-describedby="charge-hint"
          onChange={(event) => setCharge(event.currentTarget.value)} />
      </label>
      <p id="charge-hint" className="mt-1 text-sm text-slate-600">
        {charge.trim() && billed === null ? "Enter a dollar amount with up to two decimal places." : "Enter the amount in US dollars."}
      </p>
      <div aria-live="polite" aria-atomic="true" className="mt-6 rounded-xl bg-teal-50 p-5">
        {!locality ? <p className="font-semibold">Choose the locality where you received care.</p> : estimate ? (
          <>
            <p className="text-sm font-medium text-teal-900">2026 Medicare physician fee estimate</p>
            <p className="mt-1 text-3xl font-bold tabular-nums text-teal-950">{currency.format(estimate.allowed)}</p>
            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
              <div><dt>National benchmark</dt><dd className="font-semibold">{national && currency.format(national.allowed)}</dd></div>
              <div><dt>Estimated Medicare share</dt><dd className="font-semibold">{currency.format(estimate.medicareShare)}</dd></div>
              <div><dt>Estimated patient share</dt><dd className="font-semibold">{currency.format(estimate.patientCoinsurance)}</dd></div>
            </dl>
            {difference !== null && <p className="mt-4 border-t border-teal-200 pt-3 font-semibold">
              {difference === 0 ? "Charge matches the benchmark." :
                `Charge is ${currency.format(Math.abs(difference) / 100)} ${difference > 0 ? "above" : "below"} the benchmark.`}
            </p>}
          </>
        ) : <p className="font-semibold">A physician fee estimate is unavailable for this code and setting.</p>}
      </div>
      <p className="mt-4 text-sm leading-relaxed text-slate-600">
        Estimates use the 2026 nonqualifying APM rate. The 80/20 split assumes covered Original Medicare Part B care,
        a met deductible, acceptance of assignment, and standard coinsurance. A gap can help you ask for a review.
        Actual charges and amounts owed depend on claim details, coverage, and payer rules.
      </p>
      <div className="mt-5">
        <DisputeModal context={{
          code,
          billed: billed === null ? "" : billed.toFixed(2),
          benchmark: estimate ? estimate.allowed.toFixed(2) : "",
          locality: locality?.name,
          setting: settings[setting],
        }} />
      </div>
    </section>
  );
}
