import type { Metadata } from "next";
import { LegalPageLayout, Section, P, List } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Terms & Conditions — Ratan Mandir",
  description: "The terms and conditions governing use of the Ratan Mandir website and purchases made through it.",
};

export default function TermsConditionsPage() {
  return (
    <LegalPageLayout title="Terms & Conditions" lastUpdated="5 October 2026">
      <P>
        These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern access to and use of the Ratan
        Mandir website, together with the purchase of products offered through the website.
      </P>
      <P>
        By accessing, browsing, registering on, or placing an order through the website, you
        acknowledge that you have read and understood these Terms and agree to be bound by them,
        subject to all rights and protections available under applicable law.
      </P>
      <P>
        For the purposes of these Terms, &ldquo;Ratan Mandir&rdquo;, &ldquo;we&rdquo;,
        &ldquo;us&rdquo; and &ldquo;our&rdquo; refer to Ratan Mandir, and &ldquo;customer&rdquo;,
        &ldquo;you&rdquo; or &ldquo;your&rdquo; refers to any person accessing or transacting
        through the website.
      </P>

      <Section number="1" heading="Website Use">
        <P>
          The Ratan Mandir website is provided for lawful browsing, information, communication
          and purchase of products offered by Ratan Mandir.
        </P>
        <P>
          You agree not to use the website for any unlawful, fraudulent, abusive, deceptive,
          malicious or unauthorised purpose.
        </P>
        <P>You shall not attempt to:</P>
        <List
          items={[
            "Gain unauthorised access to the website, server, database or associated systems;",
            "Introduce malicious code, malware or harmful software;",
            "Circumvent website security mechanisms;",
            "Interfere with website functionality or availability;",
            "Use bots, crawlers, scrapers or automated systems without prior authorisation;",
            "Systematically extract or reproduce website content or product data;",
            "Create fraudulent or fabricated orders;",
            "Manipulate transactions, reviews, promotions or website functionality;",
            "Use the website for activities intended to cause commercial, technical or reputational harm to Ratan Mandir; or",
            "Otherwise misuse the website or its infrastructure.",
          ]}
        />
        <P>Ratan Mandir may take appropriate measures against unauthorised or abusive use, subject to applicable law.</P>
      </Section>

      <Section number="2" heading="Customer Information and Accuracy">
        <P>Customers are responsible for providing information that is accurate, complete and reasonably current.</P>
        <P>
          This may include name, mobile number, email address, billing information, shipping
          address and other information necessary for processing an order.
        </P>
        <P>Where information appears false, materially incomplete, misleading, unverifiable or associated with suspicious activity, Ratan Mandir may, subject to applicable law:</P>
        <List
          items={[
            "Decline or reject the order;",
            "Place the order on hold pending verification;",
            "Restrict or suspend relevant account or website privileges;",
            "Restrict COD availability; or",
            "Take other appropriate measures reasonably necessary to protect the business and its customers.",
          ]}
        />
      </Section>

      <Section number="3" heading="Product Descriptions and Natural Variations">
        <P>
          Ratan Mandir deals in products, including gemstones and other natural or spiritual
          products, that may exhibit inherent variations.
        </P>
        <P>Natural gemstones and similar products may differ in:</P>
        <List
          items={["Colour;", "Tone;", "Clarity;", "Inclusions;", "Shape;", "Cut;", "Size;", "Texture;", "Pattern; and", "Other naturally occurring characteristics."]}
        />
        <P>
          Product descriptions are intended to provide relevant information, but natural
          characteristics may result in reasonable differences between individual products.
        </P>
        <P>
          Such inherent variations shall not, by themselves, constitute a discrepancy where the
          product otherwise corresponds materially with the applicable product description and
          agreed specifications.
        </P>
      </Section>

      <Section number="4" heading="Product Images">
        <P>
          Product photographs, graphics, videos and other visual representations displayed on
          the website may be illustrative or representative.
        </P>
        <P>Reasonable differences between website imagery and the physical product may occur due to:</P>
        <List items={["Natural variation;", "Lighting conditions;", "Photography;", "Screen or display settings;", "Image processing; or", "Availability of a particular individual piece."]} />
        <P>
          Where specific measurements, weights, specifications or certifications are expressly
          stated for a product, those stated particulars shall be considered subject to the
          applicable product listing and verification.
        </P>
      </Section>

      <Section number="5" heading="Astrology and Spiritual Information">
        <P>
          Certain Ratan Mandir products may be presented with information concerning traditional
          astrology, spiritual practices, cultural beliefs or customary associations.
        </P>
        <P>Such information is provided for informational, traditional, cultural or spiritual purposes.</P>
        <P>
          Ratan Mandir does not represent or guarantee that the purchase or use of any gemstone,
          Rudraksha, spiritual product or related item will produce a particular financial,
          medical, personal, professional, relationship, astrological or other outcome.
        </P>
        <P>
          Customers should exercise their own judgement and seek appropriately qualified
          professional advice where a matter requires professional, medical, financial, legal or
          other specialised advice.
        </P>
      </Section>

      <Section number="6" heading="Pricing and Pricing Errors">
        <P>Ratan Mandir endeavours to maintain accurate product pricing and related information.</P>
        <P>
          However, technical errors, typographical errors, system errors, incorrect uploads,
          promotional configuration errors or other inadvertent discrepancies may occasionally
          occur.
        </P>
        <P>Where a material pricing error is identified, Ratan Mandir reserves the right, subject to applicable law, to:</P>
        <List items={["Cancel the affected order;", "Correct the displayed price;", "Decline fulfilment at the erroneous price; or", "Take another lawful corrective measure."]} />
        <P>
          Where payment has already been received for an order cancelled due to a pricing error,
          any refund required under applicable law or the applicable Ratan Mandir policy shall
          be processed accordingly.
        </P>
      </Section>

      <Section number="7" heading="Product Availability">
        <P>All products are subject to availability.</P>
        <P>
          Where an ordered product becomes unavailable, out of stock, discontinued, or otherwise
          incapable of fulfilment, Ratan Mandir may cancel the affected order.
        </P>
        <P>
          Where appropriate, Ratan Mandir may notify the customer through email, telephone, SMS,
          WhatsApp or another available communication channel.
        </P>
        <P>
          Where an amount has already been paid for an order cancelled by Ratan Mandir due to
          product unavailability, the applicable refund shall be processed in accordance with the
          Cancellation &amp; Refund Policy and applicable law.
        </P>
      </Section>

      <Section number="8" heading="Order Placement and Acceptance">
        <P>Placement of an order through the website constitutes a request by the customer to purchase the selected product.</P>
        <P>An order shall not be deemed finally accepted merely because it has been submitted through the website.</P>
        <P>
          Order acceptance shall occur upon confirmation by Ratan Mandir, subject to availability,
          payment verification, pricing accuracy, customer information, fraud checks and other
          applicable conditions.
        </P>
        <P>
          Ratan Mandir reserves the right to decline or cancel an order before fulfilment where a
          legitimate operational, transactional, security or legal reason exists, subject to
          applicable law.
        </P>
      </Section>

      <Section number="9" heading="Payment and Transaction Rules">
        <P>Orders requiring online payment shall proceed subject to successful payment confirmation through the applicable payment provider.</P>
        <P>
          Where payment is unsuccessful, reversed, pending or cannot be reasonably verified, Ratan
          Mandir may place the order on hold or decline processing until the payment status is
          appropriately resolved.
        </P>
        <P>
          In the event of duplicate payment, Ratan Mandir shall investigate the transaction and
          process any applicable adjustment or refund in accordance with the relevant transaction
          records and applicable policy.
        </P>
        <P>
          Ratan Mandir may request reasonable information or documentation concerning a disputed
          transaction where necessary to investigate a payment dispute or protect against
          fraudulent activity.
        </P>
      </Section>

      <Section number="10" heading="COD and Bulk Orders">
        <P>COD availability is subject to Ratan Mandir&apos;s verification and operational criteria.</P>
        <P>Ratan Mandir may require phone verification before confirming a COD order.</P>
        <P>For bulk, unusually large, high-value or otherwise atypical orders, Ratan Mandir may require:</P>
        <List items={["Additional customer verification;", "Full payment before dispatch; or", "A specified partial advance payment."]} />
        <P>COD may be unavailable for such orders.</P>
        <P>
          Where an order exhibits indicators of fraudulent, fabricated, abusive or suspicious
          activity, Ratan Mandir may place the order on hold, request verification, decline the
          order or cancel it, subject to applicable law.
        </P>
        <P>
          Repeated refusal of legitimate COD deliveries, repeated fraudulent ordering patterns or
          misuse of COD facilities may result in restriction or withdrawal of COD availability.
        </P>
      </Section>

      <Section number="11" heading="Cancellation, Refund and Replacement Policies">
        <P>
          The Ratan Mandir Cancellation &amp; Refund Policy, Shipping &amp; Delivery Policy, and
          Return &amp; Replacement Policy form part of these Terms to the extent applicable to
          the relevant transaction.
        </P>
        <P>
          Where a specific policy contains provisions relating to cancellation, refund, delivery
          or replacement, those provisions shall apply together with these Terms.
        </P>
        <P>Nothing in these Terms is intended to unlawfully restrict a statutory consumer right or remedy.</P>
      </Section>

      <Section number="12" heading="Intellectual Property">
        <P>Unless expressly stated otherwise, the website and its contents are owned by or licensed to Ratan Mandir.</P>
        <P>This includes, without limitation:</P>
        <List
          items={[
            "Brand names and logos;",
            "Product photographs;",
            "Videos;",
            "Graphics;",
            "Website design and layout;",
            "Text and written descriptions;",
            "Original product content;",
            "Marketing materials;",
            "Page structure;",
            "Software and website elements; and",
            "Other proprietary materials.",
          ]}
        />
        <P>
          No person may reproduce, copy, modify, distribute, publish, commercially exploit,
          reverse engineer or otherwise use such material without appropriate authorisation,
          except to the extent expressly permitted by applicable law.
        </P>
        <P>Unauthorised commercial use or systematic copying of website content may result in appropriate legal action.</P>
      </Section>

      <Section number="13" heading="Prohibited Activities">
        <P>In addition to the restrictions elsewhere in these Terms, users shall not:</P>
        <List
          items={[
            "Engage in fraudulent transactions;",
            "Submit intentionally false information;",
            "Place orders with no genuine intention to complete the transaction;",
            "Abuse refund or replacement mechanisms;",
            "Attempt to manipulate reviews or ratings;",
            "Circumvent security controls;",
            "Conduct unauthorised scraping or data extraction;",
            "Interfere with website infrastructure;",
            "Attempt unauthorised access to accounts or systems;",
            "Use another person's information without authorisation; or",
            "Engage in any conduct that violates applicable law or materially interferes with Ratan Mandir's legitimate business operations.",
          ]}
        />
      </Section>

      <Section number="14" heading="Fraud, Abuse and Misuse">
        <P>
          Where Ratan Mandir reasonably identifies suspicious, fraudulent, abusive or materially
          irregular activity, it may undertake reasonable verification measures and may, subject
          to applicable law:
        </P>
        <List
          items={[
            "Hold an order;",
            "Decline an order;",
            "Cancel an order;",
            "Restrict COD;",
            "Restrict access to certain website functions;",
            "Suspend relevant account privileges; or",
            "Preserve relevant records for investigation or legal compliance.",
          ]}
        />
        <P>Nothing in this section authorises unlawful processing or disclosure of personal information.</P>
      </Section>

      <Section number="15" heading="Limitation of Liability">
        <P>
          To the maximum extent permitted by applicable law, Ratan Mandir shall not be liable for
          indirect, incidental, special, exemplary or consequential losses arising from or
          connected with use of the website or purchase of products.
        </P>
        <P>This limitation may include losses arising from:</P>
        <List
          items={[
            "Temporary website unavailability;",
            "Third-party service interruption;",
            "Courier or logistics delays;",
            "Payment-provider failures;",
            "Internet or telecommunications disruptions;",
            "Unavoidable technical failures;",
            "Natural characteristics or variations of products; or",
            "Events beyond Ratan Mandir's reasonable control.",
          ]}
        />
        <P>
          Nothing in this clause shall exclude or limit liability that cannot lawfully be excluded
          or limited, including mandatory consumer protections or liability imposed by applicable
          law.
        </P>
      </Section>

      <Section number="16" heading="Force Majeure">
        <P>
          Ratan Mandir shall not be responsible for delay or failure in performance to the extent
          caused by circumstances beyond its reasonable control, including natural disasters,
          extreme weather, war, civil disturbance, government restrictions, strikes, epidemics,
          infrastructure failures, widespread technical outages, courier disruptions,
          telecommunications failures or other comparable events.
        </P>
        <P>Ratan Mandir shall take reasonable steps to resume affected operations when circumstances permit.</P>
      </Section>

      <Section number="17" heading="Suspension and Termination">
        <P>
          Ratan Mandir may restrict, suspend or terminate access to website functions, account
          facilities or specific services where reasonably necessary due to:
        </P>
        <List
          items={[
            "Fraudulent activity;",
            "Material violation of these Terms;",
            "Security concerns;",
            "Repeated misuse;",
            "Unauthorised access attempts;",
            "Payment abuse; or",
            "Other conduct materially prejudicial to Ratan Mandir or its customers.",
          ]}
        />
        <P>Such action shall remain subject to applicable law and any mandatory consumer rights.</P>
      </Section>

      <Section number="18" heading="Customer Reviews and User Content">
        <P>
          Where customers voluntarily submit reviews, photographs, testimonials, comments or
          other content to Ratan Mandir, the customer represents that they have the necessary
          rights to submit such content and that the content does not knowingly violate
          applicable law or third-party rights.
        </P>
        <P>
          Subject to applicable law and the relevant consent or licence obtained from the
          customer, Ratan Mandir may display, reproduce, moderate, format or use such submitted
          content for website, customer-service, informational or promotional purposes.
        </P>
        <P>
          Ratan Mandir may remove content that is unlawful, abusive, fraudulent, misleading,
          defamatory, infringing or otherwise inappropriate, subject to applicable law.
        </P>
      </Section>

      <Section number="19" heading="Third-Party Services">
        <P>Ratan Mandir may rely upon third-party service providers for functions including:</P>
        <List
          items={[
            "Payment processing;",
            "Shipping and logistics;",
            "Hosting;",
            "Website infrastructure;",
            "Analytics;",
            "Communications;",
            "Security; and",
            "Other operational services.",
          ]}
        />
        <P>Third-party services operate according to their own systems, availability and applicable terms.</P>
        <P>
          Ratan Mandir shall not be responsible for independent failures of third-party services
          beyond its reasonable control, subject to applicable law.
        </P>
      </Section>

      <Section number="20" heading="Indemnification">
        <P>
          To the extent permitted by applicable law, a customer may be responsible for losses,
          claims, costs or expenses directly arising from the customer&apos;s unlawful conduct,
          fraud, wilful misuse of the website, infringement of third-party rights, or material
          violation of these Terms.
        </P>
        <P>
          Nothing in this provision shall require a customer to indemnify Ratan Mandir for
          matters caused by Ratan Mandir&apos;s own unlawful conduct or for liabilities that
          cannot lawfully be transferred to a customer.
        </P>
      </Section>

      <Section number="21" heading="Electronic Communications and Notices">
        <P>Customers acknowledge that electronic communications may be used for order-related and service-related interactions.</P>
        <P>
          Communications may be delivered through email, SMS, telephone, WhatsApp, website
          notifications or other contact information provided by the customer.
        </P>
        <P>
          Customers are responsible for maintaining accurate contact information and reasonable
          access to the communication channels they provide.
        </P>
      </Section>

      <Section number="22" heading="Reservation of Rights">
        <P>
          All rights, remedies and protections available to Ratan Mandir under applicable law,
          contract or equity are expressly reserved except to the extent lawfully waived.
        </P>
        <P>
          Failure by Ratan Mandir to immediately enforce any provision shall not constitute a
          permanent waiver of that provision or any related right.
        </P>
      </Section>

      <Section number="23" heading="Dispute Resolution">
        <P>
          Customers are encouraged to first contact Ratan Mandir through its official
          customer-support or grievance channel so that the matter may be reviewed and, where
          reasonably possible, resolved internally.
        </P>
        <P>
          Where appropriate and legally permissible, the parties may attempt an amicable
          resolution or mediation before pursuing formal proceedings.
        </P>
        <P>
          Nothing in this provision prevents a consumer from exercising any mandatory statutory
          remedy or approaching a competent consumer forum/commission where permitted by law.
        </P>
      </Section>

      <Section number="24" heading="Governing Law and Jurisdiction">
        <P>These Terms shall be governed by the laws applicable in India.</P>
      </Section>
    </LegalPageLayout>
  );
}
