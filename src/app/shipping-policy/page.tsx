import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout, Section, SubHeading, P, List } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Shipping Policy — Ratan Mandir",
  description: "Ratan Mandir's shipping policy covering processing, delivery timelines, charges and COD.",
};

export default function ShippingPolicyPage() {
  return (
    <LegalPageLayout title="Shipping Policy" lastUpdated="5 October 2026">
      <P>
        At Ratan Mandir, we aim to provide a smooth, reliable, and transparent shipping
        experience. The following Shipping Policy explains our order processing, delivery
        timelines, shipping charges, COD verification, tracking, and circumstances that may
        affect delivery.
      </P>

      <Section number="1" heading="Order Processing">
        <P>
          All orders are generally processed within 1 business day after the order is
          successfully placed and payment/order details have been verified.
        </P>
        <P>
          Orders may require additional verification in certain circumstances, particularly Cash
          on Delivery (COD) orders.
        </P>
      </Section>

      <Section number="2" heading="Delivery Timeline">
        <P>
          Once an order has been dispatched, the expected delivery timeline is generally 3–5
          business days.
        </P>
        <P>
          Delivery timelines may vary depending on the customer&apos;s location, pincode, courier
          availability, weather conditions, public holidays, festive periods, and other
          circumstances beyond our reasonable control.
        </P>
        <P>The stated delivery timeline is an estimated timeframe and does not constitute a guaranteed delivery date.</P>
      </Section>

      <Section number="3" heading="Shipping Charges">
        <SubHeading>Orders above ₹250</SubHeading>
        <P>Orders with a value of more than ₹250 are eligible for Free Shipping.</P>
        <SubHeading>Orders below ₹250</SubHeading>
        <P>Orders with a value below ₹250 will attract a flat ₹50 delivery charge.</P>
      </Section>

      <Section number="4" heading="Cash on Delivery (COD)">
        <P>Cash on Delivery is available for eligible orders and serviceable locations.</P>
        <P>For COD orders, phone verification is mandatory before the order is processed for dispatch.</P>
        <P>
          Ratan Mandir reserves the right to cancel or restrict COD availability for an order if
          the required verification cannot be completed or if the order cannot be reasonably
          verified.
        </P>
      </Section>

      <Section number="5" heading="Order Tracking">
        <P>
          Once an order has been dispatched, tracking information may be provided to the customer
          through the registered contact details or other available communication channels.
        </P>
        <P>
          Customers can use the tracking information to monitor the shipment status through the
          applicable courier service.
        </P>
      </Section>

      <Section number="6" heading="Delivery Delays">
        <P>While we make reasonable efforts to deliver orders within the estimated timeframe, delivery may occasionally be delayed due to circumstances including:</P>
        <List
          items={[
            "Adverse weather conditions.",
            "Courier or logistics issues.",
            "Public holidays.",
            "Festive or peak-season shipping volumes.",
            "Strikes, transportation disruptions, or other operational issues.",
            "Incorrect or incomplete customer information.",
            "Events or circumstances beyond the reasonable control of Ratan Mandir.",
          ]}
        />
        <P>Such delays do not automatically qualify an order for cancellation, refund, or compensation.</P>
      </Section>

      <Section number="7" heading="Incorrect or Incomplete Address">
        <P>
          Customers are responsible for providing a complete and accurate delivery address,
          including the correct name, phone number, house/flat number, street, city, state, and
          pincode.
        </P>
        <P>
          If an order is returned or delivery fails because of an incorrect, incomplete, or
          inaccurate address or contact information provided by the customer, any additional
          shipping or re-shipping charges may be payable by the customer.
        </P>
      </Section>

      <Section number="8" heading="Failed Delivery Attempts">
        <P>
          Customers are requested to remain available at the provided delivery address and
          cooperate with the courier partner during delivery.
        </P>
        <P>
          If delivery fails because the customer is unavailable, refuses the shipment, does not
          respond to the courier, or otherwise prevents successful delivery, additional delivery
          attempts or re-shipping may be subject to applicable charges.
        </P>
      </Section>

      <Section number="9" heading="Unserviceable Pincode">
        <P>
          If the selected delivery address is found to be outside our courier serviceable area,
          Ratan Mandir may contact the customer to obtain an alternative delivery address or
          determine the appropriate next step.
        </P>
      </Section>

      <Section number="10" heading="Partial Shipment">
        <P>
          In cases where an order contains multiple products and one or more products require
          additional processing time or are temporarily unavailable, Ratan Mandir may, where
          appropriate, dispatch the available products separately.
        </P>
      </Section>

      <Section number="11" heading="Damaged Package at Delivery">
        <P>
          Customers are advised to inspect the external condition of the package at the time of
          delivery whenever possible.
        </P>
        <P>
          If the package appears visibly damaged, customers should record the condition of the
          package and preserve relevant evidence.
        </P>
        <P>
          For product damage claims, customers must follow the requirements stated in the Ratan
          Mandir{" "}
          <Link href="/replacement-policy" className="font-bold text-maroon underline underline-offset-4">
            Replacement Policy
          </Link>
          , including the mandatory complete unboxing video requirement.
        </P>
      </Section>

      <Section number="12" heading="Delivery Partners">
        <P>
          Orders may be shipped through third-party courier and logistics partners selected by
          Ratan Mandir based on serviceability, destination, availability, and other operational
          considerations.
        </P>
      </Section>

      <Section number="13" heading="Policy Updates">
        <P>
          Ratan Mandir reserves the right to modify or update this Shipping Policy from time to
          time. Any updated version will be published on this page with the applicable revision
          date.
        </P>
      </Section>

      <Section number="14" heading="Customer Support">
        <P>
          For questions regarding an order, shipment, tracking information, or delivery issue,
          customers may contact Ratan Mandir through the official customer-support channels
          provided on our website.
        </P>
      </Section>

      <Section heading="Important">
        <P>
          By placing an order with Ratan Mandir, the customer acknowledges and agrees to the
          shipping terms described in this policy.
        </P>
      </Section>
    </LegalPageLayout>
  );
}
