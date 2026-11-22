import type { Metadata } from "next";
import Link from "next/link";
import { TrustPage } from "../../components/TrustPage";
import { contactEmail } from "../../lib/site";

export const metadata: Metadata = {
  title: "Contact and editorial corrections",
  description: "Find out how to request a correction, report a Medicare estimate issue, or contact CPT Decoder about privacy.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <TrustPage title="Contact and corrections" intro="Contact the CPT Decoder editorial team to flag an error, suggest a source, or ask about the site’s methodology.">
      <section>
        <h2>Editorial and calculator inquiries</h2>
        {contactEmail ? (
          <p>Email <a href={`mailto:${contactEmail}`}>{contactEmail}</a> with “Editorial correction” or “Calculator issue” in the subject line.</p>
        ) : <p>An editorial inbox has yet to be configured for this deployment.</p>}
        <ul>
          <li>Send the page URL and quote or describe the figure or statement you want us to check.</li>
          <li>For calculator questions, include the CPT code, selected locality, care setting, and fee schedule year.</li>
          <li>Include a link to an authoritative source and explain the correction you believe it supports.</li>
        </ul>
        <p>Please leave out medical records, insurance cards, account numbers, full bills, and other patient identifiers. A public source link or a short description is enough for most corrections.</p>
      </section>
      <section>
        <h2>Privacy requests</h2>
        <p>{contactEmail ? <a href={`mailto:${contactEmail}?subject=Privacy%20request`}>Email us with “Privacy request” in the subject line</a> : "The privacy inbox uses the same deployment contact address as editorial inquiries"}. Describe the request and the contact address you previously used, if relevant. We may verify that a request relates to you before taking action. <Link href="/privacy-policy">Read the privacy policy</Link></p>
      </section>
      <section>
        <h2>Help with your own bill</h2>
        <p>Use the number on your provider’s statement or your insurer’s secure portal to discuss an individual balance or appeal. CMS can help explain federal surprise billing protections and where to report a suspected violation. <a href="https://www.cms.gov/initiatives/your-patient-rights/medical-bill-rights/get-help">Get help with a medical bill from CMS</a></p>
      </section>
    </TrustPage>
  );
}
