# MarketMate — Owner Dashboard Foundation

MarketMate is being built as a WhatsApp-first storefront and commerce platform for African small businesses, starting with Nigeria.

## Included in this package
- Responsive owner/admin dashboard interface.
- Overview of planned seller, store, payment volume and platform revenue metrics.
- Navigation for seller management, transactions, subscriptions, integration health and platform settings.
- Clear pending-connection states instead of fabricated demo statistics.
- Next.js App Router, TypeScript, Supabase client foundation and environment-variable template.

## Important: not production-ready yet
This package provides the owner dashboard UI and project foundation. The controls are not yet backed by authenticated admin APIs, and the visible status/empty states are intentionally not presented as live data. Before using this with real sellers or payments, implement and test:
1. Supabase Auth and server-side platform-admin role checks.
2. Database queries and tenant-safe row-level security policies for real seller/store data.
3. Protected admin endpoints and audit logging for sensitive actions.
4. Paystack checkout using server-calculated order totals, signed webhook validation, idempotent payment processing and verified order updates.
5. Meta WhatsApp Cloud API integration, secure token storage and verified webhook handling.
6. Seller dashboard and public storefront routes, subscription billing, monitoring and deployment configuration.

Never grant admin access from client-side input. Never commit `.env.local`, Supabase secret keys, Paystack secret keys, or Meta tokens to GitHub. Put secret values only in server-side Vercel environment variables.

## Run locally
1. Install Node.js LTS.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.
4. Run `npm run dev`.

## Deploy
Upload the contents of this folder to the MarketMate GitHub repository, import the repository into Vercel, configure environment variables, then deploy. Do not accept real customer payments until the security and payment requirements above have been implemented and tested.
