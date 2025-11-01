// src/pages/api/count-visit.js
const API_KEY = process.env.COUNTERAPI_TOKEN;
const BASE = "https://api.counterapi.dev/v2";

export async function GET({ request }) {
  const url = new URL(request.url);
  const collaborator = url.searchParams.get("collaborator") || "default";
  const counterUrl = `${BASE}/cristians-team-1491/${collaborator}`;

  try {
    const res = await fetch(counterUrl, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    });
    const data = await res.json();
    return new Response(JSON.stringify({ count: data.value || 0 }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ count: 0, error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST({ request }) {
  try {
    const body = await request.json();
    const collaborator = body.collaborator || "default";
    const counterUrl = `${BASE}/cristians-team-1491/${collaborator}`;

    // Incrementa el contador
    await fetch(`${counterUrl}/up`, {
      method: "POST",
      headers: { Authorization: `Bearer ${API_KEY}` },
    });

    // Obtiene el valor actualizado
    const res = await fetch(counterUrl, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    });
    const data = await res.json();

    return new Response(JSON.stringify({ count: data.value || 0 }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ count: 0, error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
