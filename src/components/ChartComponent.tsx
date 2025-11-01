// src/components/ChartComponent.tsx
import Chart from "chart.js/auto";
import { onCleanup, onMount } from "solid-js";

interface DataPoint {
  name: string;
  visits: number;
}

interface Props {
  data: DataPoint[];
}

export default function ChartComponent(props: Props) {
  let canvas: HTMLCanvasElement | undefined;

  onMount(() => {
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: props.data.map(d => d.name),
        datasets: [
          {
            label: "Visitas",
            data: props.data.map(d => d.visits),
            backgroundColor: "#8b5cf6",
            borderRadius: 8,
            borderSkipped: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { mode: "index", intersect: false }
        },
        scales: {
          x: { grid: { display: false } },
          y: { beginAtZero: true, grid: { color: "#e5e7eb" } }
        }
      }
    });

    onCleanup(() => chart.destroy());
  });

  return (
    <div class="w-full h-80">
      <canvas ref={canvas} />
    </div>
  );
}