import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { useScript } from "@deco/deco/hooks";
import { useSendEvent } from "../../sdk/useSendEvent.ts";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";

import OutOfStock from "./OutOfStock.tsx";
import AddToCartButton from "./AddToCartButton.tsx";
import ProductSelector from "./ProductVariantSelector.tsx";
import ShippingSimulationForm from "../shipping/Form.tsx";
import PriceDisplay from "../ui/PriceDisplay.tsx";
import DiscountBadge from "../ui/DiscountBadge.tsx";

const onLoad = () => {
  window.STOREFRONT.CART.subscribe((sdk) => {
    console.log("Cart SDK:", sdk);
  });
};

interface Props {
  page: ProductDetailsPage | null;
}

function ProductInfo({ page }: Props) {
  const id = useId();

  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const { breadcrumbList, product } = page;
  const { productID, offers, isVariantOf } = product;
  const title = isVariantOf?.name ?? product.name;

  const {
    price = 0,
    listPrice,
    seller = "1",
    availability,
  } = useOffer(offers);

  const breadcrumb = {
    ...breadcrumbList,
    itemListElement: breadcrumbList?.itemListElement.slice(0, -1),
    numberOfItems: breadcrumbList.numberOfItems - 1,
  };

  const item = mapProductToAnalyticsItem({
    product,
    breadcrumbList: breadcrumb,
    price,
    listPrice,
  });

  const viewItemEvent = useSendEvent({
    on: "view",
    event: {
      name: "view_item",
      params: {
        item_list_id: "product",
        item_list_name: "Product",
        items: [item],
      },
    },
  });

  const hasValidVariants = isVariantOf?.hasVariant?.some(
    (variant) =>
      variant?.name?.toLowerCase() !== "title" &&
      variant?.name?.toLowerCase() !== "default title",
  ) ?? false;

  return (
    <div {...viewItemEvent} class="flex flex-col gap-6 mx-4 sm:mx-0" id={id}>
      <DiscountBadge offers={offers} />

      <h1 class="text-3xl font-semibold">
        {title}
      </h1>

      {hasValidVariants && <ProductSelector product={product} />}
      <div class="flex flex-col gap-6 w-full">
        {availability === "https://schema.org/InStock"
          ? (
            <>
              <PriceDisplay
                offers={offers}
                priceSize="xl"
                showInstallments
              />
              <div class="h-12 opacity-0">
                <AddToCartButton
                  item={item}
                  seller={seller}
                  product={product}
                  class="btn btn-primary no-animation rounded-2xl"
                  disabled={false}
                />
              </div>
              <ShippingSimulationForm
                items={[{
                  id: Number(product.sku),
                  quantity: 1,
                  seller: seller,
                }]}
              />
            </>
          )
          : <OutOfStock productID={productID} />}
      </div>

      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: useScript(onLoad),
        }}
      />
    </div>
  );
}

export default ProductInfo;
