// counterapi version pública
const COUNTER_NAME = "elmohikano"; // nombre único del contador

export async function get({ request }) {
  // Obtener el contador desde CounterAPI
  const res = await fetch(`https://api.counterapi.dev/get/${COUNTER_NAME}`);
  const data = await res.json();

  return new Response(JSON.stringify({ count: data.value }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function post({ request }) {
  // Incrementar contador
  await fetch(`https://api.counterapi.dev/increment/${COUNTER_NAME}`);

  // Devolver el nuevo valor
  const res = await fetch(`https://api.counterapi.dev/get/${COUNTER_NAME}`);
  const data = await res.json();

  return new Response(JSON.stringify({ count: data.value }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
