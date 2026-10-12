import type { Metadata } from "next";
import { LegalPageLayout, Section, P, List } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Disclaimer Policy — Ratan Mandir",
  description: "Important disclaimers regarding natural product variation, astrology, health claims, and certification for Ratan Mandir products.",
};

export default function DisclaimerPolicyPage() {
  return (
    <LegalPageLayout title="Disclaimer Policy" lastUpdated="5 October 2026">
      <Section number="1" heading="General Disclaimer">
        <P>
          Ratan Mandir (&ldquo;Ratan Mandir&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo; or
          &ldquo;our&rdquo;) provides gemstones, Rudraksha, jewellery, spiritual products and
          related informational content through its website.
        </P>
        <P>
          The information available on the website is provided for general informational,
          educational, traditional, cultural and commercial purposes. While Ratan Mandir
          endeavours to maintain accurate and relevant information, no website content should be
          interpreted as a guarantee of any particular personal, medical, financial,
          professional, astrological, spiritual or other outcome.
        </P>
      </Section>

      <Section number="2" heading="Natural Product Characteristics and Variations">
        <P>
          Natural gemstones and Rudraksha may possess individual characteristics that naturally
          vary from one piece, bead, stone or batch to another.
        </P>
        <P>Such variations may include, where applicable:</P>
        <List
          items={[
            "Colour and colour intensity;",
            "Clarity and transparency;",
            "Natural inclusions;",
            "Shape and form;",
            "Cut and finish;",
            "Texture and surface characteristics;",
            "Size and weight; and",
            "Other naturally occurring characteristics.",
          ]}
        />
        <P>
          Reasonable natural variation shall not, by itself, constitute evidence that a product
          is defective or inaccurately represented, subject always to applicable law and the
          specific product description.
        </P>
      </Section>

      <Section number="3" heading="Product Images and Visual Representation">
        <P>
          Product photographs, videos and other visual representations displayed on the website
          are intended to provide a reasonable representation of the products.
        </P>
        <P>Actual appearance may vary due to:</P>
        <List
          items={[
            "Natural characteristics of the individual product;",
            "Lighting conditions;",
            "Photography equipment;",
            "Camera settings;",
            "Screen resolution and display settings; and",
            "Other technical or visual factors.",
          ]}
        />
        <P>Accordingly, the physical product may differ to a reasonable extent from its appearance on a digital screen.</P>
      </Section>

      <Section number="4" heading="Product Specifications and Measurements">
        <P>
          Product dimensions, weights, bead sizes, stone sizes and other measurable
          specifications are provided according to the information available for the relevant
          product.
        </P>
        <P>Reasonable measurement tolerances may occur depending upon the product and measurement method.</P>
        <P>
          Where a product is naturally occurring or individually selected, exact uniformity
          between individual pieces cannot necessarily be guaranteed.
        </P>
      </Section>

      <Section number="5" heading="Astrology and Traditional Information">
        <P>
          Certain gemstones, Rudraksha and spiritual products may be traditionally associated
          with astrology, Vedic practices, spiritual traditions, religious customs or cultural
          beliefs.
        </P>
        <P>
          Such information is provided to describe traditional or commonly held associations and
          should not be interpreted as scientifically established fact, medical advice, financial
          advice or a guaranteed prediction of future events.
        </P>
        <P>Different practitioners, traditions and authorities may hold different interpretations.</P>
      </Section>

      <Section number="6" heading="No Guaranteed Astrological or Spiritual Results">
        <P>
          Ratan Mandir does not guarantee that purchasing, wearing, possessing or using any
          gemstone, Rudraksha or spiritual product will produce a particular result.
        </P>
        <P>No product should be understood as guaranteeing:</P>
        <List
          items={[
            "Wealth or financial gain;",
            "Business or professional success;",
            "Employment or career advancement;",
            "Marriage or relationship outcomes;",
            "Removal of personal or family difficulties;",
            "Protection from specific events or circumstances;",
            "Planetary or astrological outcomes; or",
            "Any other predetermined personal or spiritual result.",
          ]}
        />
        <P>Individual experiences and beliefs may differ.</P>
      </Section>

      <Section number="7" heading="Medical and Health Disclaimer">
        <P>
          Products sold by Ratan Mandir and information relating to such products are not
          intended to diagnose, treat, cure or prevent any disease, illness or medical condition.
        </P>
        <P>
          Gemstones, Rudraksha and spiritual products should not be considered substitutes for
          medical diagnosis, treatment or professional healthcare.
        </P>
        <P>Individuals experiencing health concerns should consult an appropriately qualified healthcare professional.</P>
      </Section>

      <Section number="8" heading="Financial and Success-Related Claims">
        <P>
          References to prosperity, abundance, wealth, financial growth, success or similar
          concepts describe traditional, cultural, spiritual or promotional associations where
          applicable and do not constitute a guarantee of monetary or professional results.
        </P>
        <P>
          Ratan Mandir does not provide investment, securities, taxation, financial-planning or
          other regulated financial advice merely by describing traditional or spiritual
          associations of a product.
        </P>
      </Section>

      <Section number="9" heading="Certification and Laboratory Testing">
        <P>
          Where a certificate, laboratory report or testing documentation is provided with or in
          relation to a product, the nature and scope of such documentation may vary according
          to the applicable product, batch, supplier, laboratory and available documentation.
        </P>
        <P>
          A product may, where applicable, be accompanied by a batch testing report,
          product-specific testing report, certificate or other relevant documentation. The type
          of documentation provided shall depend upon the particular product, batch and
          documentation available to Ratan Mandir.
        </P>
        <P>
          Ratan Mandir does not represent that it conducts in-house laboratory testing unless
          expressly stated otherwise for a particular product or service.
        </P>
        <P>
          Where laboratory testing is performed by an independent or third-party laboratory,
          supplier or other testing entity, the report or certificate is issued by that
          respective entity. The findings, methodology, scope and representations contained in
          such third-party documentation remain subject to the responsibility and authority of
          the issuing entity.
        </P>
        <P>
          The existence of a certificate or laboratory report does not constitute a guarantee of
          any astrological, spiritual, medical, financial or other personal outcome.
        </P>
      </Section>

      <Section number="10" heading="Individual Results May Vary">
        <P>Any benefits, experiences or outcomes described in connection with a product are not guarantees of equivalent results for every customer.</P>
        <P>
          Individual experiences may vary depending upon numerous personal, environmental,
          cultural, traditional or other circumstances.
        </P>
      </Section>

      <Section number="11" heading="Testimonials and Customer Experiences">
        <P>
          Customer reviews, testimonials or personal experiences published on the website
          represent the experiences or opinions of the relevant individuals.
        </P>
        <P>Such statements should not be interpreted as a guarantee that another customer will experience the same outcome.</P>
        <P>Testimonials do not replace independent evaluation of a product or professional advice where such advice is appropriate.</P>
      </Section>

      <Section number="12" heading="Third-Party Information">
        <P>The website may contain information, references, links or material originating from third parties.</P>
        <P>
          Ratan Mandir does not necessarily adopt or independently verify every statement,
          interpretation or opinion contained in third-party material.
        </P>
        <P>Third-party websites, services and information remain subject to their respective operators, policies and terms.</P>
      </Section>

      <Section number="13" heading="Website Information and Unintentional Errors">
        <P>
          Ratan Mandir endeavours to keep website information accurate and current. However,
          inadvertent typographical errors, technical inaccuracies, outdated information or other
          unintentional discrepancies may occasionally occur.
        </P>
        <P>
          Ratan Mandir reserves the right to correct or update such information when reasonably
          necessary, subject to applicable law.
        </P>
      </Section>

      <Section number="14" heading="Reliance on Website Information">
        <P>
          Website information should not be treated as a substitute for professional advice
          where a matter involves medical, legal, financial, investment or other specialised
          considerations.
        </P>
        <P>Customers should exercise appropriate independent judgement and obtain professional advice where circumstances reasonably require it.</P>
      </Section>

      <Section number="15" heading="No Exclusion of Mandatory Legal Rights">
        <P>
          Nothing contained in this Disclaimer Policy is intended to exclude, restrict,
          diminish or waive any consumer right, statutory protection, remedy, warranty or
          liability that cannot lawfully be excluded or limited under applicable law.
        </P>
        <P>
          Nothing in this Disclaimer authorises or permits Ratan Mandir to make false,
          misleading or otherwise unlawful representations concerning its products or services.
        </P>
      </Section>

      <Section number="16" heading="Relationship with Other Policies">
        <P>
          This Disclaimer Policy should be read together with Ratan Mandir&apos;s other
          applicable website policies, including its Terms &amp; Conditions, Privacy Policy,
          Shipping &amp; Delivery Policy, Cancellation &amp; Refund Policy and Return &amp;
          Replacement Policy.
        </P>
        <P>Each policy addresses a different aspect of the customer relationship and should be interpreted accordingly.</P>
      </Section>

      <Section number="17" heading="Amendments to This Disclaimer">
        <P>
          Ratan Mandir may revise this Disclaimer Policy from time to time to reflect changes in
          its products, services, website practices or applicable legal and regulatory
          requirements.
        </P>
        <P>The latest version published on the website shall constitute the current version of this Disclaimer Policy.</P>
      </Section>

      <Section number="18" heading="Contact Information">
        <P>Ratan Mandir</P>
        <P>Email: [Insert Official Email]</P>
        <P>Phone: [Insert Official Contact Number]</P>
        <P>Registered Address: [Insert Registered Business Address]</P>
        <P>For questions concerning this Disclaimer Policy, customers may contact Ratan Mandir through its official contact channels.</P>
      </Section>
    </LegalPageLayout>
  );
}
