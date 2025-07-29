import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import { clx } from "../../sdk/clx.ts";
import { formatPrice } from "../../sdk/format.ts";
import { relative } from "../../sdk/url.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { useSendEvent } from "../../sdk/useSendEvent.ts";
import { useVariantPossibilities } from "../../sdk/useVariantPossiblities.ts";
import WishlistButton from "../wishlist/WishlistButton.tsx";
import AddToCartButton from "./AddToCartButton.tsx";
import { Ring } from "./ProductVariantSelector.tsx";
import { useId } from "../../sdk/useId.ts";

export interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;

  /** @description index of the product card in the list */
  index?: number;

  class?: string;
}

const WIDTH = 200;
const HEIGHT = 200;
const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`;

function ProductCard({
  product,
  preload,
  itemListName,
  index,
  class: _class,
}: Props) {
  const id = useId();

  const { url, image: images, offers, isVariantOf } = product;
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const title = isVariantOf?.name ?? product.name;
  const [front, back] = images ?? [];

  const { listPrice, price, seller = "1", availability } = useOffer(offers);
  const inStock = availability === "https://schema.org/InStock";
  const possibilities = useVariantPossibilities(hasVariant, product);
  const firstSkuVariations = Object.entries(possibilities)?.[0];
  const variants = Object.entries(firstSkuVariations?.[1] ?? {});
  const relativeUrl = relative(url);
  const percent = listPrice && price
    ? Math.round(((listPrice - price) / listPrice) * 100)
    : 0;

  const item = mapProductToAnalyticsItem({ product, price, listPrice, index });

  {/* Add click event to dataLayer */ }
  const event = useSendEvent({
    on: "click",
    event: {
      name: "select_item" as const,
      params: {
        item_list_name: itemListName,
        items: [item],
      },
    },
  });

  //Added it to check the variant name in the SKU Selector later, so it doesn't render the SKU to "shoes size" in the Product Card
  const firstVariantName = firstSkuVariations?.[0]?.toLowerCase();
  const shoeSizeVariant = "shoe size";

  return (
    <div
      {...event}
      class={clx("card card-compact group text-sm justify-between", _class)}
    >
      <figure
        class={clx(
          "relative bg-base-200",
          "rounded-2xl"
        )}
        style={{ aspectRatio: ASPECT_RATIO }}
      >
        {/* Product Images */}
        <a
          href={relativeUrl}
          aria-label="view product"
          class={clx(
            "absolute top-0 left-0",
            "grid grid-cols-1 grid-rows-1",
            "w-full",
            !inStock && "opacity-70",
          )}
        >
          <Image
            src={front.url!}
            alt={front.alternateName}
            width={WIDTH}
            height={HEIGHT}
            class={clx(
              "object-cover",
              "rounded-2xl w-full",
              "col-span-full row-span-full",
            )}
            sizes="(max-width: 640px) 50vw, 20vw"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            decoding="async"
          />
          <Image
            src={back?.url ?? front.url!}
            alt={back?.alternateName ?? front.alternateName}
            width={WIDTH}
            height={HEIGHT}
            class={clx(
              "object-cover",
              "rounded-2xl w-full",
              "col-span-full row-span-full",
              "transition-opacity opacity-0 lg:group-hover:opacity-100",
            )}
            sizes="(max-width: 640px) 50vw, 20vw"
            loading="lazy"
            decoding="async"
          />
        </a>

        {/* Wishlist button */}
        <div class="absolute top-0 left-0 w-full flex items-center justify-between">
          {/* Discounts */}
          <span
            class={clx(
              "text-xs font-bold text-white bg-secondary text-center rounded-badge mt-2 ml-2 px-2 py-1",
              (percent < 1 || !inStock) && "opacity-0",
            )}
          >
            {percent} % OFF
          </span>
        </div>

        {
          /* <div class="absolute bottom-0 right-0">
          <WishlistButton item={item} variant="icon" />
        </div> */
        }
      </figure>

      <a href={relativeUrl} class="flex flex-col gap-2 py-4">
        <span class="text-sm text-ellipsis font-normal line-clamp-2 h-10 text-primary normal-case">
          {title}
        </span>
        <div class="flex items-center gap-2">
          {listPrice && (
            <span class="line-through font-normal text-base-300 text-sm">
              {formatPrice(listPrice, offers?.priceCurrency)}
            </span>
          )}
          <span class="font-bold text-primary text-base">
            {formatPrice(price, offers?.priceCurrency)}
          </span>
        </div>
      </a>

      <div>
        {inStock
          ? (
            <AddToCartButton
              product={product}
              seller={seller}
              item={item}
              class="bg-secondary rounded-2xl text-base font-bold h-10 items-center"
            />
          )
          : (
            <a
              href={relativeUrl}
              class="bg-base-200 text-white rounded-2xl text-base font-bold h-12 items-center"
            >
              Avise-me
            </a>
          )}
      </div>
    </div>
  );
}

export default ProductCard;
