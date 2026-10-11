import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout, Section, SubHeading, P, List } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Cancellation & Refund Policy — Ratan Mandir",
  description: "Ratan Mandir's policy on order cancellation, refunds, and cancellations initiated by Ratan Mandir.",
};

export default function CancellationRefundPolicyPage() {
  return (
    <LegalPageLayout title="Cancellation & Refund Policy" lastUpdated="5 October 2026">
      <P>
        At Ratan Mandir, we aim to process and dispatch every order promptly. This Cancellation
        &amp; Refund Policy sets out the terms governing order cancellation, refunds, and
        cancellations initiated by Ratan Mandir.
      </P>

      <Section number="1" heading="Cancellation by Customer">
        <P>
          Customers may request cancellation of an order within 24 hours from the time of order
          placement, provided that the order has not been dispatched.
        </P>
        <P>Once an order has been dispatched, the order cannot be cancelled.</P>
        <P>
          Cancellation requests must be submitted through Ratan Mandir&apos;s official customer
          support channels with the relevant order details.
        </P>
      </Section>

      <Section number="2" heading="COD Order Cancellation">
        <P>
          A COD order for which no advance payment, deposit, booking amount, or partial payment
          has been collected may be cancelled within 24 hours of order placement, provided the
          order has not been dispatched.
        </P>
        <P>No cancellation charge shall apply to such orders.</P>
        <SubHeading>COD Orders Where an Advance or Deposit Has Been Paid</SubHeading>
        <P>
          If any advance payment, partial payment, booking amount, deposit, or other amount has
          been collected against a COD order, such amount shall be non-refundable in case the
          customer cancels the order, including where the cancellation request is made within
          the permitted 24-hour cancellation period.
        </P>
      </Section>

      <Section number="3" heading="Cancellation After Dispatch">
        <P>Once an order has been dispatched from Ratan Mandir, cancellation shall not be permitted.</P>
        <P>
          Customers are requested to carefully verify their order details before placing the
          order and to raise any cancellation request within the permitted cancellation period.
        </P>
      </Section>

      <Section number="4" heading="Cancellation by Ratan Mandir">
        <P>Ratan Mandir reserves the right to cancel an order where:</P>
        <List
          items={[
            "The ordered product is unavailable or out of stock;",
            "The product cannot be fulfilled for a genuine operational reason;",
            "The product becomes unavailable before dispatch;",
            "The order cannot reasonably be processed or fulfilled.",
          ]}
        />
        <P>
          In the event that Ratan Mandir cancels an order for which the customer has already made
          a payment, the amount received for the cancelled order shall be refunded through the
          applicable refund method.
        </P>
        <P>For COD orders where no advance or other payment has been received, no refund shall be applicable.</P>
      </Section>

      <Section number="5" heading="Refund Eligibility">
        <P>
          A refund shall be processed only in circumstances expressly covered under this
          Cancellation &amp; Refund Policy or where Ratan Mandir is required to provide a refund
          under its other applicable policies.
        </P>
        <P>
          Cancellation of an order by the customer does not automatically create a right to a
          refund of any advance, deposit, or partial payment specifically identified as
          non-refundable under this Policy.
        </P>
      </Section>

      <Section number="6" heading="Refund Method">
        <P>
          Where a refund is approved, Ratan Mandir may process the refund through the original
          payment method or another appropriate payment method, as may be reasonably applicable
          to the particular transaction.
        </P>
        <P>
          The customer may be required to provide accurate bank or payment details where
          necessary for processing the refund.
        </P>
      </Section>

      <Section number="7" heading="Refund Processing Time">
        <P>
          Once a refund has been approved, Ratan Mandir shall initiate the refund within a
          reasonable processing period. The time taken for the amount to actually reflect in the
          customer&apos;s account may additionally depend upon the relevant bank, payment
          gateway, UPI provider, card issuer, or other financial institution.
        </P>
      </Section>

      <Section number="8" heading="Product Availability">
        <P>Product availability may change between the time an order is placed and the time it is processed.</P>
        <P>
          If a product becomes unavailable and Ratan Mandir is unable to fulfil the order, Ratan
          Mandir may cancel the affected order and, where applicable, refund any amount already
          paid by the customer.
        </P>
      </Section>

      <Section number="9" heading="Cancellation and Replacement Are Separate">
        <P>Cancellation of an order and replacement of a delivered product are separate processes.</P>
        <P>
          Any request concerning a damaged, broken, defective, or otherwise eligible product
          after delivery shall be governed by the Ratan Mandir{" "}
          <Link href="/replacement-policy" className="font-bold text-maroon underline underline-offset-4">
            Replacement Policy
          </Link>
          , and not by this Cancellation &amp; Refund Policy.
        </P>
      </Section>

      <Section number="10" heading="Important Notice">
        <P>All cancellation and refund requests are subject to verification of the order and payment details.</P>
        <P>
          Nothing in this Policy shall be interpreted as limiting or excluding any rights or
          remedies available to a customer under applicable law.
        </P>
        <P>
          Ratan Mandir reserves the right to amend this Policy from time to time. The version
          published on the website at the relevant time shall apply to the applicable order,
          subject to applicable law.
        </P>
      </Section>
    </LegalPageLayout>
  );
}
