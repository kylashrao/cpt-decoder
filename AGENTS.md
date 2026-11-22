# Engineering contract

These requirements apply to all work on the US Medical Bill & CPT Code Decoder.

## Stack and deployment

- Use Next.js 15 with the App Router, TypeScript, and Tailwind CSS.
- Store application data in versioned static JSON files. Use zero external paid databases and keep page generation independent of remote data requests.
- Deploy to Vercel's free Hobby tier with live monetized ads disabled. Enabling monetized AdSense requires a hosting plan that permits commercial use. [Vercel Hobby Plan](https://vercel.com/docs/plans/hobby)

## Medicare calculation accuracy

- Use the following formula for the calendar year 2026 CMS Physician Fee Schedule estimate. The conversion factor `33.4009` applies to clinicians who are not qualifying Alternative Payment Model participants. Identify that scope wherever estimates are displayed. [CMS fee schedule formula](https://www.cms.gov/medicare/physician-fee-schedule/search/documentation) · [2026 final rule](https://public-inspection.federalregister.gov/2025-19787.pdf)

  ```text
  [(Work_RVU * Work_GPCI) + (PE_RVU * PE_GPCI) + (MP_RVU * MP_GPCI)] * 33.4009
  ```

- Use the Facility PE RVU for facility estimates and the Non-Facility PE RVU for non-facility estimates. Apply the corresponding work, practice expense, and malpractice GPCIs for the selected Medicare locality. Preserve input precision through the calculation, round displayed amounts to cents, and show that an estimate is unavailable when a required input is missing or the code is ineligible for this calculation.
- For covered Original Medicare Part B services subject to standard coinsurance, estimate Medicare's share at 80% and the patient's share at 20% of the estimated allowed amount. State beside the estimate that the Part B deductible is assumed met and the provider is assumed to accept assignment. [Medicare Part B costs](https://www.medicare.gov/basics/costs/medicare-costs)

## AdSense, YMYL, and performance

- Every page must provide substantive, page-specific content. Code pages must explain the service in plain language, identify the source and year of the data, and explain the assumptions behind any estimate. Exclude thin or placeholder pages from publication.
- Every page must display a clear medical and billing disclaimer. Describe the content as educational, direct medical questions to a qualified clinician, and direct bill or coverage verification to the provider or insurer. Label fee schedule and coinsurance figures as estimates wherever shown.
- Prevent ad-induced Cumulative Layout Shift (CLS). Give rendered ad containers breakpoint-appropriate dimensions in the initial layout and keep those dimensions stable during loading and when an ad slot is unfilled.
- Statically generate public pages at build time. Keep builds fast by reading local JSON data, minimizing client JavaScript, and keeping ad scripts off the critical rendering path.

## Build gates

- At the end of every application build phase, run both `npm run build` and `npm run typecheck`. Configure the `typecheck` script to run `tsc --noEmit`.
- Both commands must exit successfully with zero errors before work advances to the next phase. Fix failures and rerun both commands. Keep TypeScript build checks enabled.
