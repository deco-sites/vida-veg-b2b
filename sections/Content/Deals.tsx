import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
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
const Deals = ({ deals, preload }: Props) => {
  const width = 200;
  const height = 200;
  const device = useDevice();
  return (
    <div className="lg:container px-0 lg:px-5">
      {device === "mobile"
        ? (
          <div className="overflow-x-auto no-scrollbar px-5">
            <div className="flex space-x-4 animate-scroll">
              {deals && deals.map((deal, index) => (
                <div
                  key={index}
                  className="flex items-start px-5 py-4 bg-base-200 min-w-[230px] rounded-2xl"
                >
                  <div className="flex items-center flex-row gap-2">
                    <img src={deal?.image} />
                    <p
                      className="text-sm font-semibold text-primary"
                      dangerouslySetInnerHTML={{ __html: deal.label }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
        : (
          <div className="flex justify-around gap-4 py-5">
            {deals && deals.map((deal, index) => (
              <div
                key={index}
                className="flex items-start gap-2 px-5 py-4 bg-base-200  lg:max-w-[230px] rounded-2xl"
              >
                <div className="flex items-center flex-row gap-2">
                  <img src={deal?.image} width={32} height={32} />
                  <p
                    className="text-sm font-semibold text-primary"
                    dangerouslySetInnerHTML={{ __html: deal.label }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
  );
};
export default Deals;
