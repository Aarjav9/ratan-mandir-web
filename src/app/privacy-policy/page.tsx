import type { Metadata } from "next";
import { LegalPageLayout, Section, SubHeading, P, List } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy — Ratan Mandir",
  description: "How Ratan Mandir collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated="5 October 2026">
      <P>
        Ratan Mandir (&ldquo;Ratan Mandir&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;,
        &ldquo;our&rdquo;) respects the privacy of individuals who access, browse, communicate
        with, or transact through our website, products, services, and associated digital
        interfaces.
      </P>
      <P>
        This Privacy Policy describes the categories of information that may be collected,
        generated, received, processed, retained, disclosed, or otherwise handled by Ratan
        Mandir in connection with the operation of its website and business activities, together
        with the purposes and circumstances for which such information may be processed.
      </P>
      <P>
        By accessing or using the Ratan Mandir website, submitting information, placing an
        order, communicating with us, or otherwise interacting with our services, you acknowledge
        that you have read and understood this Privacy Policy, subject to any consent or other
        legal requirement applicable to the relevant processing activity.
      </P>

      <Section number="1" heading="Scope of This Privacy Policy">
        <P>This Privacy Policy applies to information processed in connection with:</P>
        <List
          items={[
            "The Ratan Mandir website and its associated pages and digital interfaces;",
            "Product browsing and enquiries;",
            "Customer accounts, where applicable;",
            "Orders, purchases, payments and deliveries;",
            "Customer support and communications;",
            "Promotional and marketing activities;",
            "Website security, analytics and performance;",
            "Fraud prevention and risk management; and",
            "Other legitimate business operations of Ratan Mandir.",
          ]}
        />
        <P>
          This Policy applies to personal data processed by or on behalf of Ratan Mandir through
          electronic or digitally facilitated means, subject to applicable law.
        </P>
      </Section>

      <Section number="2" heading="Information We May Collect">
        <P>
          Depending upon the nature of your interaction with Ratan Mandir, we may collect or
          receive information including, without limitation:
        </P>
        <SubHeading>2.1 Identity and Contact Information</SubHeading>
        <List
          items={[
            "Full name;",
            "Mobile or telephone number;",
            "Email address;",
            "Billing and shipping address;",
            "City, state, postal code and country;",
            "Information voluntarily provided during customer support or other communications.",
          ]}
        />
        <SubHeading>2.2 Order and Transaction Information</SubHeading>
        <P>When you place or attempt to place an order, we may process information relating to:</P>
        <List
          items={[
            "Products selected or purchased;",
            "Order number and transaction details;",
            "Quantity, price and applicable charges;",
            "Delivery information;",
            "Order status and history;",
            "Cancellation, replacement, refund or support requests.",
          ]}
        />
        <SubHeading>2.3 Payment-Related Information</SubHeading>
        <P>
          Payments may be processed through third-party payment processors, banks, financial
          institutions, UPI providers, card networks or other payment service providers.
        </P>
        <P>
          Ratan Mandir may receive transaction-related information necessary to confirm and
          reconcile a payment. Complete card credentials, banking credentials, UPI PINs,
          passwords and similar authentication credentials are not intended to be collected or
          stored by Ratan Mandir unless expressly stated otherwise in connection with a
          particular service.
        </P>
      </Section>

      <Section number="3" heading="Information Collected Automatically">
        <P>
          When you access or interact with our website, certain technical or usage-related
          information may be collected automatically, subject to the technologies deployed on
          the website and applicable law.
        </P>
        <P>Such information may include:</P>
        <List
          items={[
            "IP address;",
            "Browser and device information;",
            "Operating system;",
            "Device identifiers or technical identifiers, where applicable;",
            "Referring pages;",
            "Pages visited;",
            "Approximate interaction or session information;",
            "Website performance information;",
            "Error logs and security-related information.",
          ]}
        />
        <P>
          This information may be used for website operation, security, diagnostics, analytics,
          performance improvement and prevention of misuse.
        </P>
      </Section>

      <Section number="4" heading="Cookies and Similar Technologies">
        <P>
          Ratan Mandir may use cookies, pixels, tags, local storage mechanisms, analytics
          technologies and similar technical mechanisms where required for website functionality,
          security, performance, preferences, analytics or other permitted purposes.
        </P>
        <P>Such technologies may assist us in:</P>
        <List
          items={[
            "Remembering relevant preferences;",
            "Maintaining website functionality;",
            "Understanding website usage;",
            "Measuring performance;",
            "Detecting abnormal or fraudulent activity;",
            "Improving user experience; and",
            "Supporting applicable marketing or advertising functionality.",
          ]}
        />
        <P>
          Where applicable law requires consent for a particular technology or processing
          purpose, the relevant consent mechanism may be presented separately.
        </P>
      </Section>

      <Section number="5" heading="Purposes of Processing">
        <P>Personal data may be processed for purposes including, but not limited to:</P>
        <List
          items={[
            "Creating, processing and fulfilling orders;",
            "Verifying transactions;",
            "Processing payments through applicable payment providers;",
            "Arranging shipping and delivery;",
            "Communicating order confirmations, updates and service notifications;",
            "Responding to customer enquiries;",
            "Providing customer support;",
            "Managing cancellations, refunds and replacements;",
            "Maintaining transaction and business records;",
            "Preventing fraud, abuse, unauthorised activity and misuse;",
            "Protecting the security and integrity of our website and systems;",
            "Analysing website usage and improving website functionality;",
            "Developing and improving products, services and customer experience;",
            "Conducting internal business administration;",
            "Sending promotional or marketing communications where legally permitted and, where required, with applicable consent;",
            "Complying with legal, regulatory, tax, accounting or governmental requirements;",
            "Establishing, exercising or defending legal rights and claims; and",
            "Other purposes reasonably connected with the operation and administration of the Ratan Mandir business, where permitted by applicable law.",
          ]}
        />
      </Section>

      <Section number="6" heading="Customer Communications">
        <P>
          Ratan Mandir may communicate with customers through phone, SMS, email, WhatsApp,
          website notifications or other communication channels provided by the customer or made
          available in connection with an order.
        </P>
        <P>Operational communications may include:</P>
        <List
          items={[
            "Order confirmations;",
            "Payment confirmations;",
            "Dispatch notifications;",
            "Delivery updates;",
            "Cancellation or refund information;",
            "Replacement-related communication;",
            "Customer support responses; and",
            "Other communications reasonably necessary for completion or administration of a transaction.",
          ]}
        />
        <P>
          Promotional communications, where applicable, may be subject to consent, opt-out
          mechanisms or other requirements prescribed by applicable law.
        </P>
      </Section>

      <Section number="7" heading="Sharing and Disclosure of Information">
        <P>
          Ratan Mandir may disclose or provide access to relevant personal data to third parties
          where reasonably necessary for legitimate business operations, fulfilment of requested
          services, compliance with legal obligations, protection of rights, or other purposes
          permitted by applicable law.
        </P>
        <P>Such parties may include, as applicable:</P>
        <List
          items={[
            "Payment gateways and payment service providers;",
            "Banks and financial institutions;",
            "Courier and logistics providers;",
            "Technology and hosting providers;",
            "Website infrastructure providers;",
            "Analytics and performance service providers;",
            "Customer-support and communication service providers;",
            "Fraud-prevention and security providers;",
            "Professional advisers, auditors and consultants;",
            "Legal or regulatory authorities where disclosure is required or legally permitted; and",
            "Other vendors, contractors or service providers engaged to perform functions on behalf of Ratan Mandir.",
          ]}
        />
        <P>
          We seek to limit disclosure to information reasonably relevant to the applicable
          purpose and to use appropriate contractual, technical or organisational safeguards
          where appropriate.
        </P>
      </Section>

      <Section number="8" heading="Service Providers and Data Processors">
        <P>Ratan Mandir may engage third-party service providers to perform functions that support the operation of the business.</P>
        <P>
          Such service providers may process personal data on our behalf for purposes such as
          hosting, payment processing, shipping, communications, analytics, security, technical
          maintenance, customer support and other operational requirements.
        </P>
        <P>
          The use of such providers does not constitute a sale of customer information merely
          because information is processed by a service provider.
        </P>
      </Section>

      <Section number="9" heading="Business Transfers and Corporate Transactions">
        <P>
          In the event of a merger, acquisition, restructuring, sale, transfer, financing,
          reorganisation, insolvency proceeding, business-unit transfer or similar corporate
          transaction involving all or part of Ratan Mandir or its assets, relevant business and
          customer information may be transferred or disclosed to the relevant parties,
          prospective parties, professional advisers or successors, subject to applicable law.
        </P>
        <P>Any continued processing following such transaction shall remain subject to applicable legal requirements.</P>
      </Section>

      <Section number="10" heading="Fraud Prevention and Security">
        <P>Ratan Mandir may process relevant information to identify, investigate, prevent or mitigate:</P>
        <List
          items={[
            "Fraudulent transactions;",
            "Payment abuse;",
            "Identity misuse;",
            "False or abusive orders;",
            "Repeated misuse of cancellation, refund or replacement mechanisms;",
            "Unauthorised access;",
            "Cybersecurity incidents;",
            "Automated or malicious activity; and",
            "Other conduct that may adversely affect customers, Ratan Mandir, its systems or business operations.",
          ]}
        />
        <P>
          Information may be disclosed to relevant payment providers, security providers,
          professional advisers or competent authorities where reasonably necessary or legally
          permitted.
        </P>
      </Section>

      <Section number="11" heading="Data Retention">
        <P>Personal data may be retained for as long as reasonably necessary for the purposes for which it was collected or processed, including:</P>
        <List
          items={[
            "Completion and administration of transactions;",
            "Customer support;",
            "Accounting and tax records;",
            "Fraud prevention;",
            "Dispute resolution;",
            "Legal claims and enforcement;",
            "Regulatory compliance;",
            "Security and audit purposes; and",
            "Other legitimate business or legal requirements.",
          ]}
        />
        <P>
          Where retention is no longer reasonably necessary or legally required, applicable
          information may be deleted, anonymised, aggregated or otherwise handled in accordance
          with applicable law and operational requirements.
        </P>
      </Section>

      <Section number="12" heading="Data Security">
        <P>
          Ratan Mandir takes reasonable measures appropriate to the nature of the information and
          the risks associated with its processing to protect personal data against unauthorised
          access, misuse, alteration, disclosure, loss or destruction.
        </P>
        <P>
          Security measures may include technical controls, access restrictions, authentication
          mechanisms, monitoring, organisational procedures and other safeguards appropriate to
          the circumstances.
        </P>
        <P>However, no electronic transmission, storage system or internet-based service can be guaranteed to be completely secure.</P>
      </Section>

      <Section number="13" heading="Third-Party Websites and Services">
        <P>
          The Ratan Mandir website may contain links, integrations, payment interfaces, embedded
          services or references to third-party websites or platforms.
        </P>
        <P>Once you access a third-party service, that third party&apos;s own privacy practices, terms and policies may apply.</P>
        <P>
          Ratan Mandir is not responsible for the independent privacy practices of third parties
          that operate outside Ratan Mandir&apos;s control.
        </P>
      </Section>

      <Section number="14" heading="Marketing and Promotional Activities">
        <P>Where legally permitted, Ratan Mandir may use relevant customer information to communicate information regarding:</P>
        <List
          items={[
            "Products;",
            "New launches;",
            "Offers and promotions;",
            "Discounts;",
            "Educational or informational content;",
            "Events or campaigns; and",
            "Other Ratan Mandir services or business communications.",
          ]}
        />
        <P>
          Where applicable, customers may opt out of promotional communications through the
          mechanism provided in the relevant communication or by contacting Ratan Mandir.
        </P>
        <P>Opting out of promotional communications does not necessarily prevent essential transactional or service-related communications.</P>
      </Section>

      <Section number="15" heading="Data Transfers and Cross-Border Processing">
        <P>
          Certain technology, payment, hosting, analytics, communication or other service
          providers used by Ratan Mandir may operate infrastructure or process information
          outside the user&apos;s state or country.
        </P>
        <P>
          Where personal data is transferred or made accessible across jurisdictions, Ratan
          Mandir shall undertake such processing subject to applicable legal requirements,
          contractual arrangements and safeguards appropriate to the circumstances.
        </P>
      </Section>

      <Section number="16" heading="Children's Data">
        <P>The Ratan Mandir website is intended for general users and purchasers capable of entering into legally valid transactions.</P>
        <P>
          Ratan Mandir does not knowingly seek to collect personal data from children in
          circumstances where such collection is prohibited by applicable law.
        </P>
        <P>
          Where applicable law requires parental or lawful-guardian consent or additional
          safeguards for processing a child&apos;s personal data, the relevant requirements shall
          apply.
        </P>
      </Section>

      <Section number="17" heading="User Rights and Choices">
        <P>Subject to applicable law, individuals may have rights concerning their personal data, which may include rights relating to:</P>
        <List
          items={[
            "Access to information concerning processing;",
            "Correction or updating of inaccurate information;",
            "Withdrawal of consent where processing is based on consent;",
            "Erasure or deletion where legally applicable;",
            "Grievance redressal; and",
            "Other rights available under applicable data-protection law.",
          ]}
        />
        <P>Requests may be subject to reasonable verification and applicable legal limitations.</P>
      </Section>

      <Section number="18" heading="Withdrawal of Consent">
        <P>
          Where processing is based on consent, the individual may withdraw such consent through
          the applicable mechanism provided by Ratan Mandir or by contacting the designated
          privacy/grievance contact.
        </P>
        <P>Withdrawal of consent shall not affect the lawfulness of processing carried out before such withdrawal.</P>
        <P>Where another lawful basis permits continued processing, withdrawal of consent may not require cessation of that processing.</P>
      </Section>

      <Section number="19" heading="Accuracy of Information">
        <P>Customers are responsible for providing information that is accurate, complete and reasonably current for the purposes for which it is submitted.</P>
        <P>
          Ratan Mandir may rely upon information provided by customers for order processing,
          communication, delivery and related business operations.
        </P>
        <P>Customers should promptly notify Ratan Mandir where relevant information requires correction or updating.</P>
      </Section>

      <Section number="20" heading="Grievance Redressal and Privacy Contact">
        <P>
          For privacy-related questions, requests, concerns or grievances, customers may contact
          Ratan Mandir through the official contact details published on the website.
        </P>
        <P>
          Where applicable law requires appointment or designation of a specific grievance or
          data-protection contact, the relevant contact details shall be made available through
          the appropriate website channel.
        </P>
      </Section>

      <Section number="21" heading="Changes to This Privacy Policy">
        <P>Ratan Mandir may modify, update or revise this Privacy Policy from time to time to reflect changes in:</P>
        <List
          items={[
            "Applicable law;",
            "Regulatory requirements;",
            "Website functionality;",
            "Business operations;",
            "Technology;",
            "Data-processing practices; or",
            "Security and operational requirements.",
          ]}
        />
        <P>The updated version shall be published on the website with the applicable &ldquo;Last Updated&rdquo; date.</P>
        <P>Where applicable law requires additional notice or consent for a material change, Ratan Mandir shall take the steps required by such law.</P>
      </Section>

      <Section number="22" heading="Applicable Law">
        <P>
          This Privacy Policy shall be interpreted and administered in accordance with the laws
          applicable to the processing of personal data and the operation of the Ratan Mandir
          business in India.
        </P>
        <P>
          Nothing in this Privacy Policy is intended to exclude, restrict or waive any mandatory
          statutory right, remedy or protection available to an individual under applicable law.
        </P>
      </Section>

      <Section number="23" heading="Contact Information">
        <P>Ratan Mandir</P>
        <P>Email: [Insert Official Privacy/Support Email]</P>
        <P>Phone: [Insert Official Contact Number]</P>
        <P>Address: [Insert Registered Business Address]</P>
        <P>
          For privacy-related matters, please use the official contact information published by
          Ratan Mandir on its website.
        </P>
      </Section>
    </LegalPageLayout>
  );
}
