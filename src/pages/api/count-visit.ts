// src/pages/api/count-visit.ts
import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';

// Función para anonimizar IP
function hashIP(ip: string): string {
  return btoa(ip.split('.').slice(0, 3).join('.') + '.0');
}

// GET: contar visitas de un colaborador
export const get: APIRoute = async ({ url }) => {
  const collaborator = url.searchParams.get('collaborator') || 'unknown';

  const { data, error } = await supabase
    .from('visits')
    .select('id')
    .eq('collaborator', collaborator);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ count: data?.length || 0 }));
};

// POST: registrar visita
export const post: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const collaborator: string = body.collaborator || 'unknown';
    const page: string = body.page || '/';

    const ip = request.headers.get('x-forwarded-for') || '0.0.0.0';
    const ip_hash = hashIP(ip);
    const user_agent = request.headers.get('user-agent') || 'unknown';

    const { error } = await supabase
      .from('visits')
      .insert([{ collaborator, ip_hash, user_agent, page }]);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true }));
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};