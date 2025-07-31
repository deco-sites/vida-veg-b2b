import { useScript, useDevice } from "@deco/deco/hooks";
import { useId } from "../../sdk/useId.ts";

/** @titleBy label  */
export interface MenuInstitutionalProps {
  label?: string;
  link?: string;
}
interface Props {
  /** @title Adicione novos menus  */
  menus: MenuInstitutionalProps[];
}



const MockMenu = [
  { label: "Quem Somos", link: "/quem-somos" },
  { label: "Trocas e Devoluções", link: "/trocas-e-devolucoes" },
  { label: "Políticas de Privacidade", link: "/politicas-de-privacidade" },
  { label: "Políticas de Frete e Envio", link: "/politicas-de-frete-e-envio" },
  { label: "Termos de Uso", link: "/termos-de-uso" },
  { label: "Contato", link: "/contato" },
];




const MenuInstitutional = ({ menus }: Props) => {
  const menuList = menus && menus.length > 0 ? menus : MockMenu;
  const menuId = useId();
  const device = useDevice();


  const isMobile = device === "mobile";

  return (
    <div id={menuId}>
      <h2 class="font-bold lg:text-xl border-b border-base-200 text-base-300 pb-5 ">Navegue</h2>
      {isMobile ? (
        <details class="relative w-full group">
          <summary class="w-full flex justify-between items-center p-3 border border-base-200 rounded bg-white text-sm font-medium shadow-sm cursor-pointer select-none">
            <span>Selecione</span>
            <svg class="w-4 h-4 ml-2 text-base-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </summary>
          <ul class="absolute z-10 left-0 right-0 mt-2 bg-white border border-base-200 rounded shadow-lg">
            {menuList.map((menu, idx) => (
              <li key={idx}>
                <a
                  href={menu.link}
                  class="block px-4 py-3 text-sm hover:bg-gray-100"
                  style={{ display: 'block' }}
                >
                  {menu.label}
                </a>
              </li>
            ))}
          </ul>
        </details>
      ) : (
        <>
          <div class="flex flex-col gap-4 mt-5">
            {menuList.map((menu, index) => (
              <a
                key={index}
                href={menu.link}
                class="block text-sm text-base-300"
                data-link={menu.link}
              >
                {menu.label}
              </a>
            ))}
          </div>
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: useScript((id) => {
                const menu = document.getElementById(id);
                if (!menu) return;
                const path = window.location.pathname;
                menu.querySelectorAll('a[data-link]').forEach((a) => {
                  if (a.getAttribute('data-link') === path) {
                    a.classList.add('font-bold');
                  } else {
                    a.classList.remove('font-bold');
                  }
                });
              }, menuId),
            }}
          />
        </>
      )}
    </div>
  );
};

export default MenuInstitutional