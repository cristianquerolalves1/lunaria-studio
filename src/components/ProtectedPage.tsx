import { createSignal } from "solid-js";

interface ProtectedPageProps {
  correctCode: string;
  children: any;
}

export default function ProtectedPage(props: ProtectedPageProps) {
  const [input, setInput] = createSignal("");
  const [unlocked, setUnlocked] = createSignal(false);

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (input() === props.correctCode) {
      setUnlocked(true);
    } else {
      alert("Código incorrecto.");
    }
  };

  return (
    <>
      {!unlocked() ? (
        <div class="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <form
            class="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg flex flex-col gap-4 w-80"
            onSubmit={handleSubmit}
          >
            <h2 class="text-xl font-bold text-center">Acceso protegido</h2>
            <input
              type="password"
              placeholder="Introduce el código"
              class="p-2 border rounded"
              value={input()}
              onInput={(e: any) => setInput(e.target.value)}
            />
            <button type="submit" class="bg-primary text-white p-2 rounded hover:bg-primary/80">
              Entrar
            </button>
          </form>
        </div>
      ) : (
        props.children
      )}
    </>
  );
}
