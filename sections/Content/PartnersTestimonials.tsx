import Image from "apps/website/components/Image.tsx";
import { useId } from "../../sdk/useId.ts";
import { useScript } from "@deco/deco/hooks";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Icon from "../../components/ui/Icon.tsx";

/** @titleBy name */
interface Testimonial {
  /** @description Nome do parceiro */
  name?: string;
  /** @description Avatar/Logo do parceiro */
  avatar?: ImageWidget;
  /** @description Depoimento do parceiro */
  content?: string;
  /** @description Mostrar ícone de coração */
  showHeart?: boolean;
}

interface Props {
  /** @description Título da seção */
  title?: string;
  /** @description Lista de depoimentos */
  testimonials?: Testimonial[];
}

export default function PartnersTestimonials({
  title = "Parceiros que Já Aumentaram suas Vendas com Vida Veg Chef",
  testimonials = [
    {
      name: "Monreale",
      avatar:
        "https://assets.decocache.com/vida-veg-b2b/6a002b7a-0b0d-4724-b2f0-7e5e4a47b301/Group-39217.svg",
      content:
        "Foi um produto que salvou bastante a gente, porque muita gente que restrição, pessoas que são veganas e os produtos atendem muito bem, em até receitas que vão para o salão.",
      showHeart: true,
    },
    {
      name: "Di Blasi",
      avatar:
        "https://assets.decocache.com/vida-veg-b2b/42f968dd-678d-4fe0-91d4-b6f681009391/Group-(13).svg",
      content:
        "Aqui na Di Blasi Pizzas, temos explorado opções mais saudáveis e voltadas ao público vegano e vegetariano. Os produtos Vida Veg tem sido um ótimo complemento, especialmente por serem muito versáteis e de alta qualidade. Eles se integram bem nas preparações sem comprometer o sabor ou a textura, o que é essencial para manter o padrão das nossas pizzas. O feedback dos clientes tem sido positivo, pois muitos apreciam o sabor autêntico e a leveza dos ingredientes.",
      showHeart: true,
    },
    {
      name: "Sodexo",
      avatar:
        "https://assets.decocache.com/vida-veg-b2b/fd04faca-a176-4540-8fbe-fd6472a818b3/Group-39217-(1).svg",
      content:
        "Foi um produto que salvou bastante a gente, porque muita gente que restrição, pessoas que são veganas e os produtos atendem muito bem, em até receitas que vão para o salão.",
      showHeart: true,
    },
    {
      name: "Parceiro 4",
      avatar:
        "https://assets.decocache.com/vida-veg-b2b/695ab70b-3916-4b10-a2ab-01707ffff991/Group-39217-(2).svg",
      content:
        "Cuidado com o todo, compromisso e a certeza do propósito fazendo o melhor para uma alimentação saudável, saborosa e nutritiva.",
      showHeart: false,
    },
    {
      name: "Monreale",
      avatar:
        "https://assets.decocache.com/vida-veg-b2b/6a002b7a-0b0d-4724-b2f0-7e5e4a47b301/Group-39217.svg",
      content:
        "Foi um produto que salvou bastante a gente, porque muita gente que restrição, pessoas que são veganas e os produtos atendem muito bem, em até receitas que vão para o salão.",
      showHeart: true,
    },
    {
      name: "Di Blasi",
      avatar:
        "https://assets.decocache.com/vida-veg-b2b/42f968dd-678d-4fe0-91d4-b6f681009391/Group-(13).svg",
      content:
        "Aqui na Di Blasi Pizzas, temos explorado opções mais saudáveis e voltadas ao público vegano e vegetariano. Os produtos Vida Veg tem sido um ótimo complemento, especialmente por serem muito versáteis e de alta qualidade. Eles se integram bem nas preparações sem comprometer o sabor ou a textura, o que é essencial para manter o padrão das nossas pizzas. O feedback dos clientes tem sido positivo, pois muitos apreciam o sabor autêntico e a leveza dos ingredientes.",
      showHeart: true,
    },
    {
      name: "Sodexo",
      avatar:
        "https://assets.decocache.com/vida-veg-b2b/fd04faca-a176-4540-8fbe-fd6472a818b3/Group-39217-(1).svg",
      content:
        "Foi um produto que salvou bastante a gente, porque muita gente que restrição, pessoas que são veganas e os produtos atendem muito bem, em até receitas que vão para o salão.",
      showHeart: true,
    },
    {
      name: "Parceiro 4",
      avatar:
        "https://assets.decocache.com/vida-veg-b2b/695ab70b-3916-4b10-a2ab-01707ffff991/Group-39217-(2).svg",
      content:
        "Cuidado com o todo, compromisso e a certeza do propósito fazendo o melhor para uma alimentação saudável, saborosa e nutritiva.",
      showHeart: false,
    },
  ],
}: Props) {
  const id = useId();

  return (
    <section class="lg:py-5 bg-white overflow-hidden">
      <div class="w-full">
        {/* Título */}
        <div class="text-center mb-12 px-4">
          <h2 class="text-2xl lg:text-3xl font-bold text-secondary leading-tight mx-auto">
            {title}
          </h2>
        </div>

        {/* Swiper de Depoimentos */}
        <div id={id} class="swiper w-full">
          <div class="swiper-wrapper">
            {testimonials?.map((testimonial, index) => (
              <div
                key={`testimonial-${index}`}
                class="swiper-slide !w-72 lg:!w-80"
              >
                <div class="relative bg-white rounded-3xl border border-primary py-8 px-5 w-full mx-auto min-h-[486px]">
                  {/* Header com Avatar e Ícone */}
                  <div class="flex items-center justify-between mb-6 pointer-events-none">
                    {/* Avatar/Logo */}
                    <div class="overflow-hidden w-[85px] h-auto">
                      <Image
                        src={testimonial.avatar || ""}
                        alt={testimonial.name || ""}
                        width={85}
                        height={50}
                        class="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    {/* Ícone de coração */}
                    {testimonial.showHeart && (
                      <div>
                        <Icon id="new-heart-testimonials" size={24} />
                      </div>
                    )}
                  </div>

                  {/* Depoimento */}
                  <div class="text-sm text-gray-600 leading-relaxed text-justify pointer-events-none">
                    {testimonial.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Script do Swiper */}
        <script
          type="text/javascript"
          defer
          dangerouslySetInnerHTML={{
            __html: useScript(
              (id, testimonials) => {
                // @ts-ignore: Swiper is loaded via CDN
                const totalSlides = testimonials.length;

                // @ts-ignore: Swiper is loaded via CDN
                const _swiper = new Swiper(`#${id}`, {
                  grabCursor: true,
                  slidesPerView: 1.2,
                  centeredSlides: true,
                  spaceBetween: 16,
                  speed: 400,
                  touchRatio: 1,
                  touchAngle: 45,
                  threshold: 5,
                  allowTouchMove: totalSlides > 1.2,
                  breakpoints: {
                    768: {
                      slidesPerView: 2.2,
                      spaceBetween: 20,
                      centeredSlides: false,
                      allowTouchMove: totalSlides > 2.2,
                    },
                    1024: {
                      slidesPerView: 3.2,
                      spaceBetween: 24,
                      centeredSlides: false,
                      allowTouchMove: totalSlides > 3.2,
                    },
                  },
                });

                // Atualizar cursor baseado na possibilidade de movimento
                const swiperEl = document.querySelector(
                  `#${id}`,
                ) as HTMLElement;
                function updateCursor() {
                  const currentBreakpoint = globalThis.innerWidth >= 1024
                    ? "desktop"
                    : globalThis.innerWidth >= 768
                    ? "tablet"
                    : "mobile";

                  let maxVisible = 1.2;
                  if (currentBreakpoint === "desktop") maxVisible = 3.2;
                  else if (currentBreakpoint === "tablet") maxVisible = 2.2;

                  if (swiperEl) {
                    swiperEl.style.cursor = totalSlides > maxVisible
                      ? "grab"
                      : "default";
                  }
                }

                updateCursor();
                globalThis.addEventListener("resize", updateCursor);
              },
              id,
              testimonials,
            ),
          }}
        />
      </div>
    </section>
  );
}
