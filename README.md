# Supabase schema status

The MarketMate Supabase project has already had the initial database setup run manually in the SQL Editor. Keep a local backup of that SQL. Before launch, review and apply a versioned migration that matches the live database exactly, then add public storefront read policies and server-only order/payment workflows. Do not expose the Supabase secret key to browser code.
