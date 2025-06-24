import { h } from "preact";
import Image from "apps/website/components/Image.tsx";
import {
  HEADER_HEIGHT_DESKTOP,
  NAVBAR_HEIGHT_DESKTOP,
} from "../../constants.ts";
import Icon from "../ui/Icon.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
/**
 * @titleBy name
 */
export interface MenuItem {
  /**
   * @title Nome
   */
  name?: string;
  /**
   * @title Link
   */
  url?: string;
  /**
   * @title Paragrafo do submenu
   */
  identifier?: string;
  /**
   * @title Imagem do submenu
   * @description  
   * Largura: 372px x Altura: 245px
   */
  image?: {
    /**
     * @title Imagem do submenu
     * Clique para procurar a imagem
     */
    url: ImageWidget;
    /**
     * @description Nome alternativo da imagem, preencha para leitura de tela.
     */
    alternateName?: string;
  };
  /**
   * @title Clique para Adicionar submenus
   */
  children?: Children[];
}
/**
 * @titleBy name
 */
interface Children {
  /**
   * @title nome
   */
  name?: string;
  /**
   * @title Url
   */
  url?: string;
}

// Função auxiliar para particionar o array em colunas de tamanho fixo
function chunk<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

function NavItem({ item }: { item: MenuItem }) {
  const { url, name, identifier, image, children } = item;

  // Verifica se existem submenus
  const hasChildren = Array.isArray(children) && children.length > 0;
  // Determina se cabe em única coluna (<= 4 itens)
  const isSingleColumn = hasChildren && children!.length <= 4;

  // Divide os submenus em colunas de até 4 itens cada
  const columns = hasChildren ? chunk(children!, 4) : [];

  return (
    <li
      class="group flex items-center pr-5 text-accent transition-all"
      style={{ height: NAVBAR_HEIGHT_DESKTOP }}
    >
      <a
        href={url}
        class="flex gap-1 items-center text-sm font-medium transition-all"
      >
        {name}
        {hasChildren && (
          <Icon
            id="new-chevron-down"
            class="group-hover:rotate-180 transition-transform"
            width={12}
            height={12}
          />
        )}
      </a>

      {hasChildren && (
        <div
          class="fixed hidden group-hover:flex bg-base-100 z-40 items-start justify-center w-screen border-t-2 border-b-2 border-base-200"
          style={{
            top: HEADER_HEIGHT_DESKTOP,
            left: 0,
          }}
        >
          <div className={`container flex items-start py-5 gap-6 ${isSingleColumn ? 'justify-center' : ''}`}>
            {/* Render da imagem, se existir */}
            {image?.url && (
              <Image
                src={image.url}
                alt={image.alternateName ?? ""}
                width={372}
                height={245}
                loading="lazy"
              />
            )}

            <div class="flex flex-col gap-5">
              {/* Exibe o parágrafo identificador acima das colunas */}
              {identifier && (
                <div class="w-full text-start">
                  <strong class="text-primary font-semibold">
                    {identifier}
                  </strong>
                </div>
              )}

              {/* Colunas de submenus */}
              <div className={`flex gap-10 ${isSingleColumn ? 'justify-center' : 'justify-start'}`}>
                {columns.map((col, colIndex) => (
                  <ul
                    class="flex flex-col items-start gap-4"
                    key={colIndex}
                  >
                    {col.map((node) => (
                      <li
                        class="px-5 h-10 flex items-center bg-base-200 rounded-2xl min-w-[300px] max-w-[300px] justify-between gap-3"
                        key={node.name}
                      >
                        <a
                          class="hover:text-primary text-sm text-black font-medium transition-all"
                          href={node.url}
                        >
                          {node.name}
                        </a>
                        <Icon
                          id="new-chevron-right"
                          width={12}
                          height={12}
                        />
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </li>
  );
}

export default NavItem;
