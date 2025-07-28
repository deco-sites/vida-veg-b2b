import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Slider from "../../components/ui/Slider.tsx";
import { useId } from "../../sdk/useId.ts";
import { useSendEvent } from "../../sdk/useSendEvent.ts";

/**
 * @titleBy alt
 */
export interface Banner {
  /** @description desktop otimized image */
  desktop: ImageWidget;

  /** @description mobile otimized image */
  mobile: ImageWidget;

  /** @description Image's alt text */
  alt: string;

  /** @description when user clicks on the image, go to this link */
  href: string;
}

export interface Props {
  images?: Banner[];

  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean;

  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

function BannerItem(
  { image, lcp }: { image: Banner; lcp?: boolean },
) {
  const {
    alt,
    mobile,
    desktop,
    href,
  } = image;
  const params = { promotion_name: image.alt };

  const selectPromotionEvent = useSendEvent({
    on: "click",
    event: { name: "select_promotion", params },
  });

  const viewPromotionEvent = useSendEvent({
    on: "view",
    event: { name: "view_promotion", params },
  });

  return (
    <a
      {...selectPromotionEvent}
      href={href ?? "#"}
      class="relative block overflow-y-hidden w-full"
    >
      <Picture preload={lcp} {...viewPromotionEvent}>
        <Source
          media="(max-width: 767px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={mobile}
          width={412}
          height={400}
        />
        <Source
          media="(min-width: 768px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={desktop}
          width={1440}
          height={400}
        />
        <img
          class="object-cover w-full h-[400px]"
          loading={lcp ? "eager" : "lazy"}
          src={desktop}
          alt={alt}
        />
      </Picture>
    </a>
  );
}

function Carousel({ images = [], preload, interval = 5 }: Props) {
  const id = useId();

  return (
    <div
      id={id}
      class="relative w-full"
    >
      <Slider class="carousel carousel-center w-full gap-6 scroll-smooth">
        {images.map((image, index) => (
          <Slider.Item index={index} class="carousel-item w-full">
            <BannerItem image={image} lcp={index === 0 && preload} />
          </Slider.Item>
        ))}
      </Slider>

      <div class="container absolute inset-0 pointer-events-none">
        <div class="hidden sm:flex items-center justify-center z-10 absolute top-1/2 -translate-y-1/2 left-0 mx-4 pointer-events-auto">
          <Slider.PrevButton
            class="hidden sm:flex  disabled:invisible btn  text-white   btn-circle no-animation border  bg-white  bg-opacity-50"
            disabled={false}
          >
            <Icon id="arrow-white" size={24} />
          </Slider.PrevButton>
        </div>

        <div class="hidden sm:flex items-center justify-center z-10 absolute top-1/2 -translate-y-1/2 right-0 mx-4 pointer-events-auto">
          <Slider.NextButton
            class="hidden sm:flex disabled:invisible btn  text-white  btn-circle no-animation border  bg-white  bg-opacity-50"
            disabled={false}
          >
            <Icon id="arrow-white" size={24} class="rotate-180" />
          </Slider.NextButton>
        </div>
      </div>

      <Slider.JS
        rootId={id}
        interval={interval && interval * 1e3}
        infinite
        scroll="smooth"
      />
    </div>
  );
}

export default Carousel;
