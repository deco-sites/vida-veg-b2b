import { useEffect, useRef, useState } from "preact/hooks";

interface DropdownMenuProps {
  options: { label: string; value: string }[];
  selected?: string;
  onSelect?: (value: string) => void;
}

const DropdownMenu = ({ options, selected, onSelect }: DropdownMenuProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div class="relative w-full" ref={ref}>
      <button
        type="button"
        class="w-full flex justify-between items-center p-3 border border-base-200 rounded bg-white text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
        onClick={() => setOpen((v) => !v)}
      >
        {(() => {
          const current = options.find((opt) =>
            typeof window !== "undefined" &&
            window.location.pathname === opt.value
          );
          return current ? current.label : "Selecione";
        })()}
        <svg
          class="w-4 h-4 ml-2 text-base-300"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {open && (
        <ul class="absolute z-10 left-0 right-0 mt-2 bg-white border border-base-200 rounded shadow-lg">
          {options.map((opt, idx) => (
            <li key={idx}>
              <a
                href={opt.value}
                class={`block px-4 py-3 text-sm ${
                  typeof window !== "undefined" &&
                    window.location.pathname === opt.value
                    ? "bg-primary/10 text-primary font-bold"
                    : "hover:bg-gray-100"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(false);
                  if (onSelect) onSelect(opt.value);
                  if (typeof window !== "undefined") {
                    window.location.href = opt.value;
                  }
                }}
              >
                {opt.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;
