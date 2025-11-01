// src/pages/api/get-visits.ts
import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';

export const get: APIRoute = async () => {
  try {
    const { data, error } = await supabase
      .from('visits')
      .select('collaborator,page,created_at')
      .order('created_at', { ascending: true });

    if (error) throw error;
    return new Response(JSON.stringify(data ?? []), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error('Error en get-visits:', err.message);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
