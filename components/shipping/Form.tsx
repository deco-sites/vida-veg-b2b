import { useId } from "../../sdk/useId.ts";
import { useScript } from "@deco/deco/hooks";
import { useComponent } from "../../sections/Component.tsx";

import type { SKU } from "apps/vtex/utils/types.ts";

export interface Props {
  items: SKU[];
}

const onLoad = () => {
  const postalCodeInput = document.getElementById(
    "postal_code",
  ) as HTMLInputElement;
  postalCodeInput.oninput = (e) => {
    const target = e.target as HTMLInputElement;
    if (!target) return;
    let value = target.value;
    value = value.replace(/\D/g, "");
    if (value.length > 5) {
      value = value.slice(0, 5) + "-" + value.slice(5, 8);
    }
    value = value.slice(0, 9);
    target.value = value;
  };
};

export default function Form({ items }: Props) {
  const slot = useId();

  return (
    <div class="flex flex-col gap-2">
      <div class="flex flex-col">
        <span class="text-primary font-bold">Calcular Frete</span>
        <span class="text-base-300 text-sm">
          Informe seu CEP para consultar os prazos de entrega
        </span>
      </div>

      <form
        class="relative join"
        hx-swap="innerHTML"
        hx-sync="this:replace"
        hx-post={useComponent(import.meta.resolve("./Results.tsx"), {
          items,
        })}
        hx-target={`#${slot}`}
      >
        <input
          as="input"
          id="postal_code"
          type="text"
          name="postalCode"
          class="input input-bordered rounded-l-2xl join-item w-48 text-sm"
          maxLength={9}
          placeholder="Seu CEP aqui"
        />
        <button type="submit" class="btn join-item no-animation rounded-r-2xl text-base-300">
          <span class="[.htmx-request_&]:hidden inline">Calcular</span>
          <span class="[.htmx-request_&]:inline hidden loading loading-spinner loading-xs" />
        </button>
      </form>

      <div id={slot} />
      <script
        type="text/javascript"
        defer
        dangerouslySetInnerHTML={{
          __html: useScript(onLoad),
        }}
      />
    </div>
  );
}
