// src/components/ProtectedPage.tsx
import { createSignal, onMount, Show } from "solid-js";

interface Props {
  envKey: "DASHBOARD_PASSWORD" | "ELMOHIKANO_PASSWORD";
  children: any;
}

export default function ProtectedPage({ envKey, children }: Props) {
  const [code, setCode] = createSignal("");
  const [unlocked, setUnlocked] = createSignal(false);

  // Obtiene la contraseña del .env
  const correctCode = import.meta.env[envKey] as string;

  const submit = (e: Event) => {
    e.preventDefault();
    if (code().trim() === correctCode) {
      localStorage.setItem(`auth_${envKey}`, "true");
      setUnlocked(true);
    } else {
      alert("Código incorrecto");
    }
  };

  onMount(() => {
    if (localStorage.getItem(`auth_${envKey}`) === "true") {
      setUnlocked(true);
    }
  });

  return (
    <Show
      when={unlocked()}
      fallback={
        <div class="fixed inset-0 bg-gradient-to-br from-purple-900 via-pink-800 to-purple-900 flex items-center justify-center z-[9999] p-6">
          <div class="relative w-full max-w-md">
            <div class="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-3xl scale-105 animate-pulse"></div>

            <form
              onSubmit={submit}
              class="relative bg-white/95 dark:bg-gray-900/95 p-10 rounded-3xl shadow-2xl border border-white/20"
            >
              <div class="text-center mb-8">
                <h1 class="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Lunaria Studio
                </h1>
                <p class="text-sm text-gray-500 mt-2">Acceso Privado</p>
              </div>

              <div class="relative">
                <input
                  type="password"
                  placeholder="Introduce tu código"
                  value={code()}
                  onInput={(e) => setCode(e.currentTarget.value)}
                  class="w-full px-5 py-4 pl-12 text-lg rounded-2xl border-2 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300"
                  autofocus
                />
                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </span>
              </div>

              <button
                type="submit"
                class="mt-6 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Entrar al Panel
              </button>

              <p class="mt-6 text-center text-xs text-gray-500">
                Solo personal autorizado
              </p>
            </form>
          </div>
        </div>
      }
    >
      {children}
    </Show>
  );
}