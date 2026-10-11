import type { Metadata } from "next";
import { LegalPageLayout, Section, P, List } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Replacement Policy — Ratan Mandir",
  description: "Ratan Mandir's replacement policy for broken, damaged, or colour-fading products.",
};

export default function ReplacementPolicyPage() {
  return (
    <LegalPageLayout title="Replacement Policy" lastUpdated="5 October 2026">
      <P>
        At Ratan Mandir, we carefully inspect and pack every order before dispatch. To ensure
        transparency and a smooth customer experience, we provide replacement facilities only
        under the conditions mentioned below.
      </P>

      <Section number="1" heading="No General Return Policy">
        <P>Ratan Mandir does not offer a general return facility.</P>
        <P>
          Products cannot be returned or replaced due to change of mind, personal preference,
          size preference, colour preference, or any similar reason.
        </P>
        <P>Replacement is available only in the specific situations covered under this Replacement Policy.</P>
      </Section>

      <Section number="2" heading="3-Day Replacement Policy">
        <P>
          If a product is received broken or damaged, the customer may request a replacement
          within 3 days from the date of delivery.
        </P>
        <P>
          Replacement requests submitted after 3 days from delivery will not be considered under
          the 3-Day Replacement Policy.
        </P>
      </Section>

      <Section number="3" heading="Mandatory Unboxing Video">
        <P>
          A complete and continuous unboxing video is mandatory for any replacement claim under
          the 3-Day Replacement Policy.
        </P>
        <P>The video must:</P>
        <List
          items={[
            "Start with the package in its sealed condition immediately after delivery.",
            "Clearly show the complete package from all sides.",
            "Clearly show the shipping/parcel packaging before it is opened.",
            "Continuously record the complete opening of the package.",
            "Clearly show the product immediately after it is removed from the package.",
          ]}
        />
        <P>
          The video must be continuous and should not have cuts, edits, pauses, or missing
          portions during the unboxing process.
        </P>
        <P>
          If a complete and valid unboxing video is not provided, Ratan Mandir reserves the right
          to reject the replacement request.
        </P>
      </Section>

      <Section number="4" heading="Products Eligible for Replacement">
        <P>The 3-Day Replacement Policy applies only when:</P>
        <List items={["The product is received broken; or", "The product is received damaged."]} />
        <P>All replacement requests are subject to verification by Ratan Mandir.</P>
      </Section>

      <Section number="5" heading="Cases Not Eligible for Replacement">
        <P>Replacement will not be provided for:</P>
        <List
          items={[
            "Change of mind.",
            "Personal preference.",
            "Size-related issues or change of size preference.",
            "Colour preference.",
            "Damage caused after delivery.",
            "Damage caused due to improper handling, usage, storage, or care.",
            "Requests submitted after the 3-day replacement period.",
            "Claims without the mandatory complete unboxing video.",
            "Manufacturing defects, which are not covered under this policy.",
          ]}
        />
      </Section>

      <Section number="6" heading="Original Packaging and Accessories">
        <P>
          For an approved replacement request, the customer may be required to return the
          product along with its original packaging, tags, certificate (where applicable),
          accessories, and other items supplied with the original order.
        </P>
        <P>
          The product and accompanying items must be preserved until the replacement request has
          been reviewed and resolved.
        </P>
      </Section>

      <Section number="7" heading="6-Month Colour-Fading Replacement Policy">
        <P>
          Ratan Mandir provides a separate 6-month replacement facility specifically for
          qualifying colour-fading cases.
        </P>
        <P>
          This facility is applicable only when the eligible product shows genuine colour fading
          within 6 months from the date of delivery.
        </P>
        <P>A ₹100 handling and shipping charge will be applicable for an approved 6-month colour-fading replacement.</P>
        <P>The 6-month colour-fading replacement does not apply to:</P>
        <List
          items={[
            "Breakage or physical damage.",
            "Accidental damage.",
            "Improper handling or usage.",
            "Size-related issues.",
            "Personal preference.",
            "Change of mind.",
            "Manufacturing defects.",
            "Any issue unrelated to qualifying colour fading.",
          ]}
        />
      </Section>

      <Section number="8" heading="Verification of Replacement Claims">
        <P>All replacement requests are subject to verification and approval by Ratan Mandir.</P>
        <P>
          Ratan Mandir may request photographs, videos, order details, packaging information, or
          any other relevant information required to verify the claim.
        </P>
        <P>Submitting a replacement request does not automatically guarantee approval.</P>
      </Section>

      <Section number="9" heading="Final Decision">
        <P>
          After reviewing the submitted evidence and product condition, Ratan Mandir will
          determine whether the replacement request qualifies under this policy.
        </P>
        <P>The replacement will be processed only after the claim has been verified and approved.</P>
      </Section>
    </LegalPageLayout>
  );
}
