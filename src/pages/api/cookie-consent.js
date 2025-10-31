import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST({ request }) {
  const { ip, type, ua } = await request.json();
  const { error } = await supabase
    .from('cookie_logs')
    .insert({ ip_address: ip, consent_type: type, user_agent: ua });

  return new Response(JSON.stringify({ ok: !error }), { status: error ? 500 : 200 });
}