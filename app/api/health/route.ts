
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const paystackConfigured = Boolean(process.env.PAYSTACK_SECRET_KEY);
  const whatsappConfigured = Boolean(
    process.env.META_WHATSAPP_TOKEN &&
    process.env.META_WHATSAPP_PHONE_NUMBER_ID
  );

  if (!url || !key) {
    return NextResponse.json({
      status: 'setup_required',
      service: 'marketmate',
      integrations: {
        supabase: { configured: false, connected: false },
        paystack: { configured: paystackConfigured },
        whatsapp: { configured: whatsappConfigured },
      },
    });
  }

  try {
    const supabase = createClient(url, key);
    const { error } = await supabase
      .from('profiles')
      .select('id')
      .limit(1);

    return NextResponse.json({
      status: error ? 'connection_check_failed' : 'ok',
      service: 'marketmate',
      integrations: {
        supabase: {
          configured: true,
          connected: !error,
          message: error
            ? 'Database query failed. Check table permissions and configuration.'
            : 'Database query succeeded.',
        },
        paystack: { configured: paystackConfigured },
        whatsapp: { configured: whatsappConfigured },
      },
    });
  } catch {
    return NextResponse.json({
      status: 'connection_check_failed',
      service: 'marketmate',
      integrations: {
        supabase: {
          configured: true,
          connected: false,
          message: 'Unable to reach Supabase.',
        },
        paystack: { configured: paystackConfigured },
        whatsapp: { configured: whatsappConfigured },
      },
    });
  }
}

