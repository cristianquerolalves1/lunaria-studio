// src/components/VisitsCounter.tsx
import { createSignal, onMount } from "solid-js";
import { supabase } from "../lib/supabase";

interface Props {
  collaborator: string;
}

export default function VisitsCounter({ collaborator }: Props) {
  const [count, setCount] = createSignal(0);

  const load = async () => {
    const { count, error } = await supabase
      .from("visits")
      .select("*", { count: "exact", head: true })
      .eq("collaborator", collaborator);

    if (!error && count !== null) {
      setCount(count);
    }
  };

  onMount(() => {
    load();

    // Usa window.setInterval → devuelve number (Node & DOM compatible)
    const id = window.setInterval(load, 30000);

    // Limpia con window.clearInterval
    return () => window.clearInterval(id);
  });

  return (
    <span class="inline-block min-w-[4rem] font-mono text-6xl tracking-wider">
      {count().toLocaleString()}
    </span>
  );
}