import { Suggestion } from "apps/commerce/types.ts";
import {
  SEARCHBAR_INPUT_FORM_ID,
  SEARCHBAR_POPUP_ID,
} from "../../../constants.ts";
import { useId } from "../../../sdk/useId.ts";
import { useUI } from "../../../sdk/useUI.ts";
import { useComponent } from "../../../sections/Component.tsx";
import Icon from "../../ui/Icon.tsx";
import { Props as SuggestionProps } from "./Suggestions.tsx";
import { useScript } from "@deco/deco/hooks";
import { asResolved } from "@deco/deco";
import { type Resolved } from "@deco/deco";

export const ACTION = "/s";
export const NAME = "q";

export interface SearchbarProps {
  placeholder?: string;
  loader: Resolved<Suggestion | null>;
}

const Suggestions = import.meta.resolve("./Suggestions.tsx");

export default function Searchbar({
  placeholder = "O que você está procurando?",
  loader,
}: SearchbarProps) {
  const slot = useId();

  return (
    <div
      id="search-bar"
      class="gap-4 rounded-xl transition-all flex items-center w-full lg:max-w-[880px] bg-white"
    >
      <form
        id={SEARCHBAR_INPUT_FORM_ID}
        action={ACTION}
        class="flex items-center gap-2 justify-between w-full "
      >
        <div id="input" class="flex items-center gap-1 w-full px-3 bg-white  rounded-xl">
          <button
            type="submit"
            class=""
            aria-label="Search"
            tabIndex={-1}
          >
            <span class="loading loading-spinner loading-xs hidden [.htmx-request_&]:inline" />
            <Icon id="new-search" class="inline [.htmx-request_&]:hidden w-5 h-5" />
          </button>

          <input
            autoFocus
            tabIndex={0}
            class="h-10 px-3 w-full outline-0"
            name={NAME}
            placeholder={placeholder}
            autoComplete="off"
            hx-target={`#${slot}`}
            hx-post={
              loader &&
              useComponent<SuggestionProps>(Suggestions, {
                loader: asResolved(loader),
              })
            }
            hx-trigger={`input changed delay:300ms, ${NAME}`}
            hx-indicator={`#${SEARCHBAR_INPUT_FORM_ID}`}
            hx-swap="innerHTML"
            hx-on:click={`
              const sb = document.getElementById('search-bar');
              const sl = document.getElementById('${slot}');
              const btn = sb?.querySelector('button[type=submit]');
              const closed = document.getElementById('closed');
              sb?.classList.add('p-5');
              sb?.classList.add('bg-base-200');
              closed?.classList.remove('hidden');
              closed?.classList.add('flex');
              sl?.classList.add('active-slot');
              btn?.classList.add('highlight-btn');
            `}
          />
        </div>

        <button
          id="closed"
          type="button"
          class="text-gray-400 hidden items-center gap-1"  /* comece escondido */
          aria-label="Close search"
          hx-on:click={`
            const sb = document.getElementById('search-bar');
            const sl = document.getElementById('${slot}');
            const btn = sb?.querySelector('button[type=submit]');
            const closed = document.getElementById('closed');
            closed?.classList.add('hidden');
            closed?.classList.remove('flex');
            sb?.classList.remove('p-5');
            sb?.classList.remove('bg-base-200');
            sl?.classList.remove('active-slot');
          `}
        >
          <Icon id="new-close" class="w-5 h-5" />
          Fechar
        </button>
      </form>

      <div id={slot} class="transition-all duration-300" />

      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('click', (e) => {
              const sb = document.getElementById('search-bar');
              const sl = document.getElementById('${slot}');
              const btn = sb?.querySelector('button[type=submit]');
              const closed = document.getElementById('closed');
              
              // Se clicar fora do search-bar, fecha e esconde botão fechar
              if (!sb?.contains(e.target)) {
                closed?.classList.add('hidden');
                closed?.classList.remove('flex');
                sb?.classList.remove('p-5');
                sb?.classList.remove('bg-base-200');
                sl?.classList.remove('active-slot');
              }
            });
          `,
        }}
      />
    </div>
  );
}
