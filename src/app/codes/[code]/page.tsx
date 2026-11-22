import { notFound, permanentRedirect } from "next/navigation";
import { codes, cptPath } from "../../../lib/cpt";

export const dynamicParams = false;

export function generateStaticParams() {
  return codes.map(({ code }) => ({ code }));
}

export default async function LegacyCodePage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const entry = codes.find((item) => item.code === code);
  if (!entry) notFound();
  permanentRedirect(cptPath(entry));
}
