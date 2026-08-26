# Ratan Mandir — Web Storefront

A starter e-commerce codebase for **Ratan Mandir**, built to sell authentic
Rudraksha beads/malas and gemstones online. This is a complete, runnable
Next.js project — not a mockup — handed over as the foundation for the
client's production build.

## What's included

- Full Next.js 14 App Router project (TypeScript, Tailwind CSS)
- A Prisma/PostgreSQL schema covering products, variants, images, mukhi &
  gemstone reference data, customers, addresses, orders and reviews
- Seed data: all 14 Rudraksha mukhis, all 9 Navratna gemstones, and 12 sample
  products (9 Rudraksha across mukhis 1/5/7/9, 3 gemstones) each with
  variants, a placeholder image, and sample reviews
- Working pages: homepage, mukhi listing pages, product detail pages, cart,
  and checkout
- A Razorpay checkout integration that is fully wired up in code, with the
  live API call stubbed behind a clearly-marked function so the project runs
  end-to-end without real API keys
- A cart implemented with React Context + localStorage persistence

## What's still a placeholder (needs real business input before launch)

- **Prices.** Every price in `prisma/seed.ts` is a round, clearly-fake sample
  number (e.g. ₹1,499.00) so the Decimal fields have something valid to seed.
  None of these are real Ratan Mandir prices — replace them all.
- **Product photography.** `ProductImage.url` values point to
  `/images/placeholder/...` paths that do not contain real photos. Add real
  product images to `public/images/` (or a CDN/Vercel Blob) and update the
  seed data / admin tooling accordingly.
- **Contact details.** Phone, email and business address in `Footer.tsx` are
  left as literal `[PHONE NUMBER]`, `[EMAIL ADDRESS]`, `[BUSINESS ADDRESS]`
  placeholders — these are real facts we don't have, not something to guess.
- **Legal pages.** Privacy Policy, Refund/Returns Policy and Terms of Service
  are referenced in the footer but not yet built — see the checklist below.
- **Certificate details.** Copy referencing lab certificates is generic;
  actual certificate/lab partner details should be added per product.
- **Authentication.** `Customer.passwordHash` exists in the schema for future
  real login, but no login/signup flow is built yet — checkout currently
  works as guest checkout (a lightweight Customer record is created/matched
  by email).
- **Admin/catalog management.** There is no admin UI. Products are managed
  today via `prisma/seed.ts` or directly in the database.

## Tech stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Prisma ORM + PostgreSQL
- Razorpay (Node SDK) for payments
- Deploy target: Vercel

## Prerequisites

- Node.js 18 or later
- A free PostgreSQL database — [Neon.tech](https://neon.tech) has a
  generous free tier and works well with Vercel
- A [Razorpay](https://razorpay.com) account (free to create; test mode
  needs no business verification)

## Setup, step by step

1. **Clone the project** (or unzip the folder you were given) and install
   dependencies:

   ```bash
   cd ratan-mandir-web
   npm install
   ```

2. **Create your environment file:**

   ```bash
   cp .env.example .env
   ```

3. **Create a free Postgres database on Neon:**
   - Sign up at [neon.tech](https://neon.tech) and create a new project.
   - Copy the connection string Neon gives you (it looks like
     `postgresql://user:password@host/dbname?sslmode=require`).
   - Paste it into `.env` as `DATABASE_URL`.

4. **Create the database tables:**

   ```bash
   npx prisma migrate dev --name init
   ```

5. **Seed sample data** (mukhi info, gemstone info, sample products, sample
   reviews — see the "placeholders" section above regarding prices):

   ```bash
   npx prisma db seed
   ```

6. **Run the dev server:**

   ```bash
   npm run dev
   ```

   Visit [http://localhost:3000](http://localhost:3000).

At this point the site runs fully — including checkout — in **stub payment
mode**: no Razorpay keys are required to click through Add to Cart → Cart →
Checkout → Pay with Razorpay, because `src/lib/razorpay.ts` returns a mocked
order when no keys are configured.

## Adding real Razorpay test keys

1. Sign in to the [Razorpay Dashboard](https://dashboard.razorpay.com/).
2. Make sure you're in **Test Mode** (toggle top-left).
3. Go to **Settings → API Keys** and generate a Test key pair.
4. Add them to `.env`:

   ```
   RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
   RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxx
   ```

5. Also add `NEXT_PUBLIC_RAZORPAY_KEY_ID` (same value as `RAZORPAY_KEY_ID`)
   if you want the client-side Razorpay checkout modal to open in test mode
   — the checkout page reads this to initialise the widget.
6. Restart `npm run dev`. The checkout flow will now create real (test-mode)
   Razorpay orders and open the real Razorpay payment modal.
7. To receive payment confirmations, configure a webhook in **Settings →
   Webhooks** pointing at `https://<your-domain>/api/webhook/razorpay`,
   subscribed to the `payment.captured` event, and copy its secret into
   `RAZORPAY_WEBHOOK_SECRET` in `.env`.

## Deploying to Vercel

1. Push this repository to GitHub (or GitLab/Bitbucket).
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. In the project's **Environment Variables** settings, add the same
   variables from your `.env` file: `DATABASE_URL`, `RAZORPAY_KEY_ID`,
   `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`, `NEXT_PUBLIC_SITE_URL`
   (set this to your production URL, e.g. `https://ratanmandir.com`).
4. Deploy. Vercel will run `npm install` (which runs `prisma generate` via
   `postinstall`) and `npm run build` automatically.
5. Run `npx prisma migrate deploy` against your production database once
   (from your machine, with `DATABASE_URL` pointed at production, or via a
   one-off Vercel deploy hook) before the first real traffic hits.

No Vercel-specific configuration is required beyond the standard
`next.config.js` already in this repo.

## Before going live — checklist

- [ ] Replace every placeholder price in the catalog with real pricing
- [ ] Replace `[PHONE NUMBER]`, `[EMAIL ADDRESS]`, `[BUSINESS ADDRESS]` in
      `src/components/Footer.tsx` with real contact details
- [ ] Replace placeholder product images with real product photography
- [ ] Switch `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` from test to live keys
      (requires Razorpay business KYC/activation)
- [ ] Add real Privacy Policy and Refund/Returns Policy pages — **Razorpay
      requires these to be live on your site before it will activate live
      payments**
- [ ] Add Terms of Service
- [ ] Set up a real domain and point it at the Vercel deployment
- [ ] Decide on and implement a shipping/logistics workflow (courier
      integration, shipping cost rules, order status updates)
- [ ] Decide on a real authentication approach if customer accounts (not
      just guest checkout) are required at launch

## Cost overview (approximate, for planning only)

A domain typically costs **~₹800–1,200/year** for a `.com` or `.in`. Hosting
on **Vercel's Hobby (free) tier** is enough to launch and validate; once
traffic grows, the **Pro tier (~$20/month)** adds team features, more
bandwidth and better support. The **Neon Postgres free tier** comfortably
covers a small-to-medium storefront's database needs before a paid plan is
needed. **Razorpay** charges roughly **2% + GST per successful transaction**
with **no setup fee**, deducted automatically from each settlement — so
there is no fixed monthly payment-processing cost, only a percentage of
what actually sells.

## Project structure

```
prisma/
  schema.prisma       Database schema
  seed.ts              Seed script (mukhi info, gemstone info, sample products)
src/
  app/                 Next.js App Router pages & API routes
  components/          Shared UI components
  context/             CartContext (client-side cart state)
  lib/                 prisma client singleton, razorpay wrapper, formatting helpers
public/
  images/placeholder/  Placeholder image paths referenced by seed data
```
