export const siteName = "CPT Decoder";

const deploymentHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
export const siteOrigin = new URL(
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || (deploymentHost ? `https://${deploymentHost}` : "http://localhost:3000"),
).origin;

export const siteOperator = process.env.SITE_OPERATOR?.trim() || siteName;
export const contactEmail = process.env.SITE_CONTACT_EMAIL?.trim();

export const trustLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy policy" },
  { href: "/terms", label: "Terms" },
  { href: "/medical-disclaimer", label: "Medical disclaimer" },
] as const;
