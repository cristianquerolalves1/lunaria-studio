import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST({ request }) {
  const { name, email, message, ip } = await request.json();
  const { error } = await supabase
    .from('contacts')
    .insert({ name, email, message, ip_address: ip });

  return new Response(JSON.stringify({ ok: !error }), { status: error ? 500 : 200 });
}