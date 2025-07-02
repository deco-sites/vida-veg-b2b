/** website/sections/Rendering/Lazy.tsx */
import { h } from "preact";
import { useState, useEffect } from "preact/hooks";

// Componente auxiliar que só rendeiza crianças no cliente
function ClientOnly({ children }: { children: preact.ComponentChildren }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // durante o SSR não renderiza nada
  }

  return <>{children}</>;
}

export default function Lazy() {
  return (
    <ClientOnly>
      {/* ...o que quer que haja aqui que dependa de `document`... */}
      <div>
        {/* Exemplo de uso de document: */}
        <p>Altura da janela: {document.documentElement.clientHeight}px</p>
      </div>
    </ClientOnly>
  );
}
