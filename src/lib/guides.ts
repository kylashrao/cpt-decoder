const cmsRights = "https://www.cms.gov/initiatives/your-patient-rights/medical-bill-rights";
const cmsBill = `${cmsRights}/get-help/guides-resources/how-read-your-bill`;
const cmsPfs = "https://www.cms.gov/medicare/physician-fee-schedule/search/documentation";
const cmsNcci = "https://www.cms.gov/medicare/coding-billing/national-correct-coding-initiative-ncci-edits/medicare-ncci-faq-library";

export const guides = [
  {
    slug: "itemized-hospital-bill",
    title: "How to request an itemized hospital bill and spot duplicate charges",
    label: "Request an itemized bill",
    description: "Ask for line-level charges, reconcile dates and units, and request a review of suspected duplicates.",
    sources: [["CMS guide to reading medical bills", cmsBill], ["CMS medical billing terms", `${cmsRights}/get-help/guides-resources/terms-you-should-know`]],
  },
  {
    slug: "explanation-of-benefits-vs-bill",
    title: "Understanding your Explanation of Benefits (EOB) and medical bill",
    label: "Compare an EOB with a bill",
    description: "Match the insurer’s claim determination with the provider’s balance, line by line.",
    sources: [["CMS guide to reading medical bills", cmsBill], ["CMS explanation of insurance terms", `${cmsRights}/get-help/guides-resources/terms-you-should-know`]],
  },
  {
    slug: "cpt-modifiers-25-and-59",
    title: "CPT modifiers 25 and 59 explained for same-day charges",
    label: "Decode modifiers 25 and 59",
    description: "Find out what a separate evaluation or distinct procedure means on a claim and what to ask the billing office.",
    sources: [["CMS Medicare coding edits and modifier FAQ", cmsNcci], ["CMS guidance on modifier 59 and related modifiers", "https://www.cms.gov/files/document/mln1783722-proper-use-modifiers-59-xe-xp-xs-xu.pdf"]],
  },
  {
    slug: "facility-fees",
    title: "Facility fees explained and why some hospital clinic visits cost twice as much",
    label: "Understand facility fees",
    description: "Separate hospital charges from the clinician’s fee and compare the total patient cost of different care settings.",
    sources: [["MedPAC analysis of payment differences by ambulatory setting", "https://www.medpac.gov/wp-content/uploads/2023/06/Jun23_Ch8_MedPAC_Report_To_Congress_SEC.pdf"], ["CMS Physician Fee Schedule calculation methods", cmsPfs]],
  },
  {
    slug: "no-surprises-act",
    title: "How to challenge an out-of-network bill under the No Surprises Act",
    label: "Check surprise billing protections",
    description: "Identify possible balance-billing protections, check your cost share, and find the appropriate review process.",
    sources: [["CMS No Surprises Act patient rights", cmsRights], ["CMS federal patient-provider dispute initiation and eligibility", "https://nsa-idr.cms.gov/billdisputes/s/"], ["CMS provider and insurer complaint instructions", `${cmsRights}/get-help/submit-complaint`]],
  },
  {
    slug: "er-visit-cpt-codes",
    title: "ER visit CPT codes 99281–99285 and what levels 1–5 cost",
    label: "Decode emergency visit levels",
    description: "Read emergency visit levels and distinguish the clinician’s evaluation from hospital facility charges.",
    sources: [["CMS hospital outpatient emergency visit coding FAQ", "https://www.cms.gov/Medicare/Medicare-Fee-for-Service-Payment/HospitalOutpatientPPS/Downloads/OPPS_QandA.pdf"], ["CMS Physician Fee Schedule lookup", "https://www.cms.gov/medicare/physician-fee-schedule/search/overview"], ["CMS January 2026 relative value files", "https://www.cms.gov/medicare/payment/fee-schedules/physician/pfs-relative-value-files/rvu26a"]],
  },
  {
    slug: "medicare-part-b-coinsurance",
    title: "Medicare Part B 80/20 coinsurance and deductible math explained",
    label: "Calculate Part B coinsurance",
    description: "Follow three worked examples showing how an unmet, partially met, or satisfied deductible affects your share.",
    sources: [["Medicare costs and Part B deductible", "https://www.medicare.gov/basics/costs/medicare-costs"], ["Medicare provider assignment rules", "https://www.medicare.gov/basics/costs/medicare-costs/provider-accept-Medicare"], ["CMS Physician Fee Schedule calculation methods", cmsPfs]],
  },
  {
    slug: "medical-billing-dispute-letter",
    title: "How to write and file an effective medical billing dispute letter",
    label: "Write a billing dispute letter",
    description: "Document a specific discrepancy, request a correction, and keep track of formal deadlines.",
    sources: [["CMS medical billing help and escalation options", `${cmsRights}/get-help`], ["CMS guide to reading medical bills", cmsBill], ["Federal patient-provider dispute process", "https://nsa-idr.cms.gov/billdisputes/s/"]],
  },
] as const;

export const topGuides = [guides[0], guides[1], guides[4], guides[7]];

export function guidePath(guide: (typeof guides)[number]) {
  return `/guides/${guide.slug}`;
}
