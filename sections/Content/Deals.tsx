import type { ImageWidget } from "apps/admin/widgets.ts";
import { useDevice } from "@deco/deco/hooks";
interface Deal {
  /**
   * @title Titulo do card
   */
  title?: string;
  /**
   * @title Subtitulo do card
   * @format rich-text
   */
  label?: string;
  /**
   * @title Adicionar uma imagem?
   */
  image?: ImageWidget;
  /**
   * @title Largura da imagem?
   */
  width?: number;
  /**
   * @title Altura da imagem?
   */
  height?: number;
}
interface Props {
  /**
   * @title Carregamento da Imagem
   * @description Ative caso queira adiar o carregamento
   */
  preload?: boolean;
  /**
   * @description Clique no ícone de + caso queira adicionar um novo card
   */
  deals: Deal[];
}
const Deals = ({ deals, preload: _preload }: Props) => {
  const device = useDevice();
  return (
    <div className="lg:container px-0 lg:px-5" >
      {device === "mobile" ? (
        <div className="overflow-x-auto no-scrollbar py-5 px-4 ">
          <ul className="flex gap-3 min-w-full">
            {deals && deals.map((deal, idx) => (
              <li
                key={deal.title || idx}
                className="flex flex-col items-start bg-base-200 min-w-[200px] max-w-[70vw] rounded-2xl px-4 py-4 shadow-sm"
                style={{ flex: '0 0 auto' }}
              >
                <div className="flex items-center gap-2 mb-2 w-full">
                  {deal.image && (
                    <img
                      src={deal.image}
                      alt={deal.title || ''}
                      className="object-contain w-10 h-10 flex-shrink-0"
                      width={40}
                      height={40}
                    />
                  )}
                  <span className="text-sm font-semibold text-primary line-clamp-2 w-full" dangerouslySetInnerHTML={{ __html: deal.label || '' }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <ul className="flex justify-center gap-4 py-5">
          {deals && deals.map((deal, index) => (
            <li
              key={index}
              className="flex items-start gap-2 px-5 py-4 bg-base-200  lg:max-w-[230px] rounded-2xl list-none"
            >
              <div className="flex items-center flex-row gap-2">
                <img src={deal?.image} width={32} height={32} />
                <p
                  className="text-sm font-semibold text-primary"
                  dangerouslySetInnerHTML={{ __html: deal.label || "" }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default Deals;
