import { Product, ProductDetailsPage } from "apps/commerce/types.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { useId } from "../../sdk/useId.ts";
import { useScript } from "@deco/deco/hooks";
import AddToCartButton from "./AddToCartButton.tsx";
import PriceDisplay from "../ui/PriceDisplay.tsx";
import DiscountBadge from "../ui/DiscountBadge.tsx";

interface Props {
  /** @description Produto */
  product: Product;
  quantity?: number;
  /** @description Breadcrumb para analytics (opcional) */
  breadcrumbList?: ProductDetailsPage["breadcrumbList"];
}

const floatingCartScript = (targetId: string) => {
  const floatingCart = document.querySelector(
    `[data-floating-cart="${targetId}"]`,
  ) as HTMLElement;
  const productInfo = document.querySelector(
    "[data-product-info]",
  ) as HTMLElement;

  if (!floatingCart || !productInfo) return;

  let isVisible = false;

  function toggleFloatingCart() {
    const rect = productInfo.getBoundingClientRect();
    const shouldShow = rect.bottom < window.innerHeight - 350;

    if (shouldShow && !isVisible) {
      floatingCart.style.transform = "translateY(0)";
      isVisible = true;
    } else if (!shouldShow && isVisible) {
      floatingCart.style.transform = "translateY(100%)";
      isVisible = false;
    }
  }

  // Verificação inicial ao carregar a página
  function initialCheck() {
    const rect = productInfo.getBoundingClientRect();
    const shouldShow = rect.bottom < window.innerHeight - 350;
    
    if (shouldShow) {
      floatingCart.style.transform = "translateY(0)";
      isVisible = true;
    }
  }

  // Executar verificação inicial
  initialCheck();

  addEventListener("scroll", toggleFloatingCart);
  addEventListener("resize", toggleFloatingCart);

  addEventListener("beforeunload", function () {
    removeEventListener("scroll", toggleFloatingCart);
    removeEventListener("resize", toggleFloatingCart);
  });
};

export default function FloatingCartButton({
  product,
  breadcrumbList,
}: Props) {
  const targetId = useId();
  
  const scriptContent = useScript(floatingCartScript, targetId);
  
  const { offers, isVariantOf } = product;
  const title = isVariantOf?.name ?? product.name;

  const {
    price = 0,
    listPrice,
    seller = "1",
    availability,
  } = useOffer(offers);

  const inStock = availability === "https://schema.org/InStock";

  if (!inStock) {
    return null;
  }

  const defaultBreadcrumb = breadcrumbList
    ? {
      ...breadcrumbList,
      itemListElement: breadcrumbList?.itemListElement.slice(0, -1),
      numberOfItems: breadcrumbList.numberOfItems - 1,
    }
    : undefined;

  const item = mapProductToAnalyticsItem({
    product,
    breadcrumbList: defaultBreadcrumb,
    price,
    listPrice,
  });

  return (
    <>
      <div
        class="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg transform translate-y-full transition-transform duration-300 ease-in-out rounded-t-2xl"
        data-floating-cart={targetId}
      >
        <div class="container grid grid-cols-[1fr_auto_1fr] items-center p-4 gap-4">
          <div class="flex items-center gap-3 sm:hidden col-span-2">
            <div class="flex flex-col">
              <span class="text-sm font-medium line-clamp-1">{title}</span>
              <PriceDisplay
                offers={offers}
                priceSize="lg"
                listPriceSize="xs"
                showInstallments={false}
                layout="horizontal"
              />
            </div>
          </div>

          <div class="hidden sm:flex items-center gap-4">
            <div class="w-28 h-28 bg-gray-100 rounded-2xl overflow-hidden">
              {product.image?.[0] && (
                <img
                  src={product.image[0].url}
                  alt={product.image[0].alternateName || title}
                  class="w-full h-full object-cover"
                />
              )}
            </div>
            <div class="flex flex-col gap-2">
              <DiscountBadge offers={offers} />
              <span class="font-medium line-clamp-1">{title}</span>
            </div>
          </div>

          <div class="hidden sm:flex justify-center">
            <PriceDisplay
              offers={offers}
              priceSize="xl"
              listPriceSize="sm"
              showInstallments={false}
              layout="vertical"
            />
          </div>

          <div class="flex justify-end sm:justify-center">
            <AddToCartButton
              item={item}
              seller={seller}
              product={product}
              disabled={false}
              buttonText="Adicionar"
              showQuantitySelector
              class="btn btn-primary no-animation min-w-[120px] sm:min-w-[140px]"
            />
          </div>
        </div>
      </div>

      <script
        type="module"
        src={`data:text/javascript,${encodeURIComponent(scriptContent)}`}
      />
    </>
  );
}
