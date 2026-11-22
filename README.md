# Medical Bill & CPT Code Decoder

Use Node.js 22.18 or newer. Install with `npm ci` and start local development with `npm run dev`.

Run `npm test`, `npm run build`, and `npm run typecheck` before advancing to the next build phase.

## Refresh CMS data

Download the [January 2026 CMS RVU26A archive](https://www.cms.gov/medicare/payment/fee-schedules/physician/pfs-relative-value-files/rvu26a)
and extract the nonqualifying APM relative value file and the GPCI file. Run the importer with Python 3.8 or newer.

```sh
python3 scripts/build_cms_data.py /path/to/PPRRVU2026_Jan_nonQPP.csv /path/to/GPCI2026.csv
```

The importer refreshes the CMS fields for the 60 curated codes and preserves their plain-language content.
It reads unmodified code rows and uses the published GPCI column with the 1.0 work floor.
Use `--editorial` to supply a different curated code list in the same JSON format.
The calculator applies the base RVU formula. Claim-specific adjustments such as modifiers,
imaging payment caps, and applicable coverage exceptions can change actual payments.

## Public deployment and advertising

Set `NEXT_PUBLIC_SITE_URL` to the public HTTPS origin before building. Vercel's production project URL is used when available, and local builds fall back to `http://localhost:3000`. The same origin drives canonical metadata, JSON-LD, the sitemap, and the absolute sitemap URL served at `/robots.txt`.

Set `SITE_CONTACT_EMAIL` to a monitored editorial and privacy address and `SITE_OPERATOR` to the public operator name. Verify those details and the privacy notice against the actual deployment before publishing.

Ad slots reserve their dimensions in the initial HTML. The repository's Vercel Hobby deployment keeps ads disabled. Before serving ads on a commercially eligible deployment, obtain site approval and any required CPT permissions, add Google's issued publisher record to `public/ads.txt`, configure applicable consent and regional privacy controls, and update the privacy policy for the vendors actually used. Keep automatic placements off if ads must stay within the fixed-height slots. Avoid sending calculator values or letter inputs to ad or analytics providers.
