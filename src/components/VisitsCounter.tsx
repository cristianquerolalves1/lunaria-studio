import { createSignal, onMount } from "solid-js";

interface VisitsCounterProps {
  collaborator: string; // nombre del colaborador
}

export default function VisitsCounter({ collaborator }: VisitsCounterProps) {
  const [visits, setVisits] = createSignal<number>(0);

  const getVisits = async () => {
    try {
      const res = await fetch(`/api/count-visit?collaborator=${collaborator}`);
      const data = await res.json();
      if (data.count !== undefined) setVisits(data.count);
    } catch (err) {
      console.error("Error al obtener visitas:", err);
    }
  };

  const incrementVisits = async () => {
    try {
      await fetch("/api/count-visit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collaborator }),
      });
    } catch (err) {
      console.error("Error al incrementar visitas:", err);
    }
  };

  onMount(async () => {
    await incrementVisits(); // suma 1 al entrar
    await getVisits();       // actualiza valor
  });

  return <span class="font-bold">{visits()} visitas</span>;
}
