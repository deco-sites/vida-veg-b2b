import { JSX } from "preact";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import { useScript } from "@deco/deco/hooks";
import { AnalyticsItem, Product } from "apps/commerce/types.ts";

import Icon from "../ui/Icon.tsx";
import QuantitySelector from "../ui/QuantitySelector.tsx";

export interface Props extends JSX.HTMLAttributes<HTMLButtonElement> {
  product: Product;
  seller: string;
  item: AnalyticsItem;
  type?: "shelf" | "productPage";
}

const onClick = () => {
  event?.stopPropagation();
  const button = event?.currentTarget as HTMLButtonElement | null;
  const container = button!.closest<HTMLDivElement>("div[data-cart-item]")!;
  const { item, platformProps } = JSON.parse(
    decodeURIComponent(container.getAttribute("data-cart-item")!),
  );
  window.STOREFRONT.CART.addToCart(item, platformProps);
};

const onChange = (containerId: string, selectorId: string) => {
  const selector = document.getElementById(selectorId) as HTMLInputElement;
  const quantity = Number(selector.value);
  const container = document.getElementById(containerId);
  if (!container) return;
  const { item, platformProps } = JSON.parse(
    decodeURIComponent(container.getAttribute("data-cart-item")!),
  );
  platformProps.orderItems[0].quantity = quantity;
  container.setAttribute(
    "data-cart-item",
    encodeURIComponent(
      JSON.stringify({ item, platformProps }),
    ),
  );
};

const onLoad = (id: string, type: string) => {
  window.STOREFRONT.CART.subscribe(() => {
    if (type === "productPage") {
      const container = document.getElementById(id);
      const checkbox = container?.querySelector<HTMLInputElement>(
        'input[type="checkbox"]',
      );
      const input = container?.querySelector<HTMLInputElement>(
        'input[type="number"]',
      );
      const quantity = 1;
      if (!input || !checkbox) {
        return;
      }
      input.value = quantity.toString();
      checkbox.checked = quantity > 0;
      container?.querySelectorAll<HTMLButtonElement>("button").forEach((node) =>
        node.disabled = false
      );
      container?.querySelectorAll<HTMLButtonElement>("input").forEach((node) =>
        node.disabled = false
      );
    }

    if (type === "shelf") {
      const container = document.getElementById(id);
      const checkbox = container?.querySelector<HTMLInputElement>(
        'input[type="checkbox"]',
      );
      const quantity = 1;
      if (!checkbox) {
        return;
      }
      checkbox.checked = quantity > 0;
      container?.querySelectorAll<HTMLButtonElement>("button").forEach((node) =>
        node.disabled = false
      );
    }
  });
};
const useAddToCart = ({ product, seller }: Props) => {
  const platform = usePlatform();
  const { additionalProperty = [], isVariantOf, productID } = product;
  const productGroupID = isVariantOf?.productGroupID;
  if (platform === "vtex") {
    return {
      allowedOutdatedData: ["paymentData"],
      orderItems: [{ quantity: 1, seller: seller, id: productID }],
    };
  }
  if (platform === "shopify") {
    return { lines: { merchandiseId: productID } };
  }
  if (platform === "vnda") {
    return {
      quantity: 1,
      itemId: productID,
      attributes: Object.fromEntries(
        additionalProperty.map(({ name, value }) => [name, value]),
      ),
    };
  }
  if (platform === "wake") {
    return {
      productVariantId: Number(productID),
      quantity: 1,
    };
  }
  if (platform === "nuvemshop") {
    return {
      quantity: 1,
      itemId: Number(productGroupID),
      add_to_cart_enhanced: "1",
      attributes: Object.fromEntries(
        additionalProperty.map(({ name, value }) => [name, value]),
      ),
    };
  }
  if (platform === "linx") {
    return {
      ProductID: productGroupID,
      SkuID: productID,
      Quantity: 1,
    };
  }
  return null;
};
function AddToCartButton(props: Props) {
  const { product, item, type = "shelf", class: _class } = props;
  const platformProps = useAddToCart(props);
  const id = useId();
  const qtdId = useId();
  return (
    <div
      id={id}
      class="flex gap-2"
      data-item-id={product.productID}
      data-cart-item={encodeURIComponent(
        JSON.stringify({ item, platformProps }),
      )}
    >
      <input type="checkbox" class="hidden peer" />
      {type === "productPage" && (
        <QuantitySelector
          id={qtdId}
          disabled
          min={0}
          max={100}
          hx-on:change={useScript(onChange, id, qtdId)}
        />
      )}
      <button
        disabled
        class={clx("flex items-center gap-2 flex-grow justify-center text-accent", _class?.toString())}
        hx-on:click={useScript(onClick)}
      >
        <Icon id="cart-white" size={20} />
        Adicionar
      </button>
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(onLoad, id, type) }}
      />
    </div>
  );
}
export default AddToCartButton;