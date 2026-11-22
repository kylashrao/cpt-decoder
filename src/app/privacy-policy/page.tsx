import type { Metadata } from "next";
import Link from "next/link";
import { TrustPage } from "../../components/TrustPage";
import { contactEmail, siteOperator } from "../../lib/site";

export const metadata: Metadata = {
  title: "Privacy policy and advertising choices",
  description: "Learn how CPT Decoder handles local calculator inputs, correspondence, technical logs, and advertising preferences.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <TrustPage title="Privacy policy" intro="This policy describes the information handled when you use CPT Decoder, how the site operator uses it, and how to exercise applicable privacy rights.">
      <section>
        <h2>Information and purposes</h2>
        <p>{siteOperator} operates this site and determines how information described here is handled.</p>
        <p>Calculator amounts and draft dispute-letter fields are processed in browser memory. The tools have no submission endpoint and the application does not save entries in browser storage. Reloading or closing the page clears app state. Copies you put on your clipboard or PDF files you save are controlled by your device and anyone you share them with.</p>
        <p>Page requests are delivered by Vercel. Technical information such as IP address, device or browser information, requested URL, and request timing may be processed by the hosting infrastructure to deliver and protect the site and diagnose issues. A requested URL can reveal which guide or code page you opened. <a href="https://vercel.com/legal/privacy-policy">Vercel privacy policy</a></p>
        <p>If you email the site operator, the operator and its email service receive the sender address, message, and any information you choose to include. We use it to respond, investigate a correction, fulfill a privacy request, or maintain a record where needed. Please exclude personal medical records and account details.</p>
      </section>
      <section>
        <h2>Google AdSense, third-party cookies, and DART opt-out</h2>
        <p>The current application displays labeled placeholders and does not load AdSense or analytics tags. If AdSense is activated, Google and its advertising partners may use third-party cookies, web beacons, IP addresses, or similar identifiers to deliver ads, measure performance, prevent fraud, and, where permitted, personalize advertising based on visits to this site and other sites. Advertising cookies may be associated with Google or DoubleClick domains such as google.com and doubleclick.net.</p>
        <p>Older DoubleClick notices refer to the DART advertising cookie. Google now provides personalized advertising controls through My Ad Center. You can turn personalized ads off, manage or block third-party cookies in your browser settings, and use the industry opt-out tool for participating companies. These controls may still allow contextual ads or processing needed for security and measurement. <a href="https://myadcenter.google.com/">Google My Ad Center</a> · <a href="https://optout.aboutads.info/">Digital Advertising Alliance opt-out</a> · <a href="https://policies.google.com/technologies/partner-sites">How Google uses information from partner sites</a></p>
        <p>Before any advertising launch, the operator must update this notice with the live vendors and controls, configure the required consent and regional opt-out mechanisms, and honor applicable withdrawal and opt-out signals, including Global Privacy Control where required. For Google advertising in the EEA, United Kingdom, and Switzerland, the operator must use the applicable Google-certified consent setup and obtain consent where required. <a href="https://support.google.com/adsense/answer/16918505">Google consent management requirements</a></p>
      </section>
      <section>
        <h2>Disclosure, retention, and international processing</h2>
        <p>We use infrastructure and communications providers to deliver the site and respond to messages. Information may also be disclosed when legally required or to protect the service and address abuse. The current application does not sell personal information or share it for cross-context behavioral advertising. Hosting and email services may process information in the United States or elsewhere under their applicable terms and safeguards.</p>
        <p>We keep correspondence for as long as needed to handle the inquiry, document a correction, or meet applicable legal obligations. Infrastructure records are subject to the host’s retention settings and policies. The calculator and letter tools do not retain the amounts and draft fields you enter.</p>
      </section>
      <section>
        <h2>European and UK privacy rights</h2>
        <p>Where the GDPR or UK GDPR applies, legitimate interests may support delivering and securing the service and responding to voluntary inquiries. Legal obligations may require particular processing. Consent is the basis where required for optional advertising or similar technologies, and you can withdraw it. Depending on the circumstances, you may request access, correction, erasure, restriction, or portability, object to processing, and complain to your local supervisory authority. <a href="https://eur-lex.europa.eu/eli/reg/2016/679/oj">EU General Data Protection Regulation</a></p>
      </section>
      <section>
        <h2>California privacy rights</h2>
        <p>Where California privacy law applies, you may ask to know or access the personal information held about you, request correction or deletion, opt out of sale or sharing, limit certain uses of sensitive information where applicable, and exercise your rights without unlawful discrimination. The categories described above are technical identifiers and internet activity handled through hosting, and identifiers and information you voluntarily provide in correspondence. An authorized agent may submit a request subject to applicable verification rules. <a href="https://cppa.ca.gov/faq.html">California Privacy Protection Agency rights overview</a></p>
      </section>
      <section>
        <h2>Contact, children, and changes</h2>
        <p>For a privacy request or questions about the site operator’s handling of information, {contactEmail ? <a href={`mailto:${contactEmail}?subject=Privacy%20request`}>email {contactEmail}</a> : <Link href="/contact">see the deployment’s contact information</Link>}. We may request enough information to verify your identity and respond under applicable law. This service is intended for a general audience and is not directed to children under 13. We will revise this policy if the service or its data practices change.</p>
      </section>
    </TrustPage>
  );
}
