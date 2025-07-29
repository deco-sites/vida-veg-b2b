import { useId } from "../../sdk/useId.ts";
import { useScript } from "@deco/deco/hooks";
import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  /**
   * @title Título da sessão
   */
  title?: string;
  /**
   * @title Subtítulo da sessão
   * @format rich-text
   */
  subtitle?: string;
  /**
   * @title Clique no + para adicionar um novo card
   */
  cards?: Card[];
  /**
   * @title Configurar CTA
   */
  cta?: CTA;
}

export interface Card {
  /**
   * @title Imagem
   * @description tamanho da imagem 132x132
   */
  src?: ImageWidget;
  /**
   * @title Texto do card
   */
  label?: string;
}

interface CTA {
  label?: string;
  link?: string;
}

export const ItemCard = ({ src, label }: Card) => (
  <div class="swiper-slide max-w-32">
    <div class="flex flex-col gap-2">
      <Image
        src={src || ""}
        alt={label}
        width={128}
        height={128}
        class="object-cover"
      />
      <p class="text-center max-w-32">{label}</p>
    </div>
  </div>
);

const OurProducts = ({ title, subtitle, cards, cta }: Props) => {
  const id = useId();

  return (
    <>
      <div class="px-4 lg:px-0 py-5 container flex flex-col lg:gap-7 items-center overflow-hidden">
        {title && (
          <h3 class="text-2xl sm:text-3xl font-semibold text-secondary mb-4 lg:mb-0">
            {title}
          </h3>
        )}
        {subtitle && (
          <div
            class="text-lg text-primary text-center mb-7 lg:mb-0"
            dangerouslySetInnerHTML={{ __html: subtitle }}
          />
        )}
        <div id={id} class="max-w-full">
          <div class="swiper-wrapper flex gap-4 lg:gap-10 lg:transform-none overflow-x-auto lg:overflow-x-visible lg:flex-wrap lg:justify-center">
            {cards?.map((item, index) => <ItemCard key={index} {...item} />)}
          </div>
        </div>

        {cta?.label && cta?.link && (
          <a
            class="py-4 px-6 bg-primary text-base font-bold rounded-full"
            href={cta.link}
          >
            {cta.label}
          </a>
        )}
      </div>

      <script
        type="text/javascript"
        defer
        dangerouslySetInnerHTML={{
          __html: useScript((id) => {
            // Aplicar Swiper apenas em mobile
            if (window.innerWidth < 1024) {
              // @ts-ignore .
              new Swiper(`#${id}`, {
                freeMode: true,
                grabCursor: true,
                slidesPerView: "auto",
                centeredSlides: false,
                centerInsufficientSlides: true,
                spaceBetween: 16,
              });
            }
          }, id),
        }}
      />
    </>
  );
};

export default OurProducts;
