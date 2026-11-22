import type { Metadata } from "next";
import Link from "next/link";
import { TrustPage } from "../../components/TrustPage";

export const metadata: Metadata = {
  title: "Terms of service",
  description: "Read CPT Decoder’s terms for educational content, fee estimates, letter drafts, and use of the website.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <TrustPage title="Terms of service" intro="These terms govern use of CPT Decoder’s website, reference content, calculation tools, and letter templates.">
      <section>
        <h2>Permitted use</h2>
        <p>You may use the website to learn about billing and prepare your own correspondence. Use it lawfully and avoid interfering with availability, probing security without authorization, or inserting another person’s private information without permission. You may copy and adapt a letter draft for your own correspondence.</p>
      </section>
      <section>
        <h2>Educational estimates and letter drafts</h2>
        <p>The site provides general educational information and estimates. It does not establish coverage, determine the enforceability of a bill, or give medical, legal, coding, or insurance advice for an individual case. Seek qualified advice for those decisions. Verify the service date, payer rules, locality, place of service, units, modifiers, and actual balance before acting on an estimate.</p>
        <p>A letter draft is an informal request you can customize, review, and send yourself. Filing an appeal, federal dispute, or complaint may require a separate process and its own deadline. The site cannot promise an adjustment, reimbursement, or response. <Link href="/medical-disclaimer">Medical and billing disclaimer</Link></p>
      </section>
      <section>
        <h2>Sources and rights</h2>
        <p>We identify public sources used for payment data and editorial research. Third-party materials and trademarks remain subject to their owners’ rights and applicable terms. CPT® is a registered trademark of the American Medical Association. Third-party links are provided for reference, and those sites set their own terms and data practices.</p>
      </section>
      <section>
        <h2>Availability and limitations</h2>
        <p>We may revise, correct, suspend, or remove site content. Information can contain errors or lag changes in regulations and payer policy. The site is provided as available and, to the extent permitted by law, without warranties of accuracy, availability, or fitness for a particular purpose. Any limitations apply only to the extent allowed by law and do not affect rights that cannot be waived.</p>
      </section>
      <section>
        <h2>Questions and updates</h2>
        <p>Check this page for current terms. Use the contact page to report a material error or raise a question about the site. The privacy policy explains how data is handled. <Link href="/contact">Contact</Link> · <Link href="/privacy-policy">Privacy policy</Link></p>
      </section>
    </TrustPage>
  );
}
