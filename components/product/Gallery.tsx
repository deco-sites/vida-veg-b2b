import Icon from "../ui/Icon.tsx";
import Image from "apps/website/components/Image.tsx";
import Slider from "../ui/Slider.tsx";

import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import { ProductDetailsPage } from "apps/commerce/types.ts";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
}

const WIDTH = 620;
const HEIGHT = 620;
const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`;

/**
 * @title Product Image Slider
 * @description Creates a three columned grid on destkop, one for the dots preview, one for the image slider and the other for product info
 * On mobile, there's one single column with 3 rows. Note that the orders are different from desktop to mobile, that's why
 * we rearrange each cell with col-start- directives
 */
export default function GallerySlider(props: Props) {
  const id = useId();

  if (!props.page) {
    throw new Error("Missing Product Details Page Info");
  }

  const { page: { product: { name, isVariantOf, image: pImages } } } = props;

  const groupImages = isVariantOf?.image ?? pImages ?? [];
  const filtered = groupImages.filter((img) =>
    name?.includes(img.alternateName || "")
  );
  const images = filtered.length > 0 ? filtered : groupImages;

  return (
    <div
      id={id}
      class="grid grid-flow-row sm:grid-flow-col grid-cols-1 sm:grid-cols-[128px_620px] gap-5 justify-center"
    >
      <div class="col-start-1 col-span-1 sm:col-start-2">
        <div class="relative h-min flex-grow">
          <Slider class="carousel carousel-center gap-6 w-full">
            {images.map((img, index) => (
              <Slider.Item
                index={index}
                class="carousel-item w-full"
              >
                <Image
                  class="w-full"
                  sizes="(max-width: 640px) 100vw, 40vw"
                  style={{ aspectRatio: ASPECT_RATIO }}
                  src={img.url!}
                  alt={img.alternateName}
                  width={WIDTH}
                  height={HEIGHT}
                  preload={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </Slider.Item>
            ))}
          </Slider>

          <Slider.PrevButton
            class="no-animation absolute left-2 top-1/2 btn btn-circle btn-outline disabled:invisible"
            disabled
          >
            <Icon id="chevron-right" class="rotate-180" />
          </Slider.PrevButton>

          <Slider.NextButton
            class="no-animation absolute right-2 top-1/2 btn btn-circle btn-outline disabled:invisible"
            disabled={images.length < 2}
          >
            <Icon id="chevron-right" />
          </Slider.NextButton>
        </div>
      </div>
      {images.length > 1 && (
        <div class="col-start-1 col-span-1">
          <ul
            class={clx(
              "carousel carousel-center",
              "sm:carousel-vertical",
              "gap-2",
              "max-w-full",
              "overflow-x-auto",
              "sm:overflow-y-auto",
            )}
            style={{ maxHeight: "600px" }}
          >
            {images.map((img, index) => (
              <li class="carousel-item w-32 h-32">
                <Slider.Dot index={index}>
                  <Image
                    style={{ aspectRatio: "1 / 1" }}
                    class="group-disabled:border-base-400 border rounded-2xl object-cover w-full h-full"
                    width={128}
                    height={128}
                    src={img.url!}
                    alt={img.alternateName}
                  />
                </Slider.Dot>
              </li>
            ))}
          </ul>
        </div>
      )}
      <Slider.JS rootId={id} />
    </div>
  );
}
