import { createSignal, onMount } from "solid-js";

interface VisitsCounterProps {
  counterId: string; // ejemplo: "cristians-team-1491/lunar"
  token: string;
}

export default function VisitsCounter(props: VisitsCounterProps) {
  const [visits, setVisits] = createSignal<number>(0);

  const getVisits = async () => {
    try {
      const res = await fetch(`https://api.counterapi.dev/v2/${props.counterId}`, {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      });
      const data = await res.json();
      if (data.value !== undefined) setVisits(data.value);
    } catch (err) {
      console.error("Error al obtener visitas:", err);
    }
  };

  const incrementVisits = async () => {
    try {
      const res = await fetch(`https://api.counterapi.dev/v2/${props.counterId}/up`, {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      });
      const data = await res.json();
      if (data.value !== undefined) setVisits(data.value);
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
