import data from "../../data/cpt_codes.json";

export type CptCode = (typeof data.codes)[number];
export const { codes, source } = data;

const visitSlugs: Record<string, string> = {
  "99213": "established-patient-office-visit-low-complexity",
  "99214": "established-patient-office-visit",
  "99215": "established-patient-office-visit-high-complexity",
};

export function cptSlug({ code, description }: CptCode) {
  const label = visitSlugs[code] ?? description.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, "");
  return `${code}-${label}`;
}

export function cptPath(code: CptCode) {
  return `/cpt/${cptSlug(code)}`;
}
