import Section from "../../components/ui/Section.tsx";
import Breadcrumb from "../../components/ui/Breadcrumb.tsx";
import ProductInfo from "../../components/product/ProductInfo.tsx";
import ImageGallerySlider from "../../components/product/Gallery.tsx";
import FloatingCartButton from "../../components/product/FloatingCartButton.tsx";

import { clx } from "../../sdk/clx.ts";
import { ProductDetailsPage } from "apps/commerce/types.ts";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
}

export default function ProductDetails(props: Props) {
  const {
    page,
  } = props;

  const product = page?.product;

  if (!page) {
    return (
      <div class="w-full flex justify-center items-center py-28">
        <div class="flex flex-col items-center justify-center gap-6">
          <span class="font-medium text-2xl">Page not found</span>
          <a href="/" class="btn no-animation">
            Go back to Home
          </a>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div class="w-full flex justify-center items-center py-28">
        <div class="flex flex-col items-center justify-center gap-6">
          <span class="font-medium text-2xl">Product not found</span>
          <a href="/" class="btn no-animation">
            Go back to Home
          </a>
        </div>
      </div>
    );
  }

  const { isVariantOf } = product;

  const description = product.description || isVariantOf?.description;
  const selectedVariant = isVariantOf?.hasVariant.find(
    (variant: { sku: string }) => {
      return product.sku === variant.sku;
    },
  );

  const nutritionFacts = selectedVariant?.additionalProperty?.find(
    (prop) => prop.name === "descriptionHtml",
  )?.value || null;

  return (
    <div class="container flex flex-col gap-4 sm:gap-5 w-full py-4 sm:py-5 px-5 sm:px-0">
      <Breadcrumb itemListElement={page.breadcrumbList.itemListElement} />

      <div
        class={clx(
          "container grid",
          "grid-cols-1 gap-2 py-0",
          "sm:grid-cols-5 sm:gap-6",
        )}
      >
        <div class="sm:col-span-3">
          <ImageGallerySlider page={page} />
        </div>
        <div class="sm:col-span-2" data-product-info>
          <ProductInfo page={page} />
        </div>
      </div>

      <div>
        {description && (
          <details class="collapse bg-base-100 border-base-300 border-y rounded-none">
            <summary class="collapse-title font-semibold">Descrição</summary>
            <div
              class="collapse-content text-sm"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </details>
        )}
        {nutritionFacts && (
          <details class="collapse bg-base-100 border-base-300 border-b rounded-none">
            <summary class="collapse-title font-semibold">
              Tabela Nutricional
            </summary>
            <div
              class="collapse-content text-sm"
              dangerouslySetInnerHTML={{ __html: nutritionFacts }}
            />
          </details>
        )}
      </div>

      <FloatingCartButton
        product={product}
        breadcrumbList={page.breadcrumbList}
      />
    </div>
  );
}

export const LoadingFallback = () => <Section.Placeholder height="635px" />;
