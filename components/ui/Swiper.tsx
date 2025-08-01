import { useEffect, useRef } from "preact/hooks";

interface SwiperProps {
  children: preact.ComponentChildren;
  spaceBetween?: number;
}

export default function Swiper({ children, spaceBetween = 16 }: SwiperProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Opcional: lógica para swipe nativo pode ser adicionada aqui
  }, []);

  return (
    <div
      ref={containerRef}
      className="overflow-x-auto no-scrollbar py-5 px-4"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      <div
        className="flex"
        style={{ gap: `${spaceBetween}px` }}
      >
        {children}
      </div>
    </div>
  );
}
