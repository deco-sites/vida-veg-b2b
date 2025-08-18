import { JSX } from "preact";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import { useScript } from "@deco/deco/hooks";
import { AnalyticsItem, Product } from "apps/commerce/types.ts";

import Icon from "../ui/Icon.tsx";

export interface Props extends JSX.HTMLAttributes<HTMLButtonElement> {
  product: Product;
  seller: string;
  item: AnalyticsItem;
  type?: "shelf" | "productPage";
  /** @description Mostrar seletor de quantidade */
  showQuantitySelector?: boolean;
  /** @description Texto do botão */
  buttonText?: string;
  /** @description Esconder ícone */
  hideIcon?: boolean;
}

const onClick = async () => {
  event?.stopPropagation();
  const button = event?.currentTarget as HTMLButtonElement | null;
  const container = button!.closest<HTMLDivElement>("div[data-cart-item]")!;

  const quantityInput = container.querySelector<HTMLInputElement>(
    'input[type="number"]',
  );
  const quantity = quantityInput ? Number(quantityInput.value) || 1 : 1;

  const { item, platformProps } = JSON.parse(
    decodeURIComponent(container.getAttribute("data-cart-item")!),
  );

  item.quantity = quantity;

  try {
    await window.STOREFRONT.CART.addToCart(item, platformProps);

    if (quantity > 1) {
      await setTimeout(() => {
        window.STOREFRONT.CART.setQuantity(item.item_id, quantity);
      }, 500);
    }
  } catch (error) {
    console.error("Erro ao adicionar ao carrinho:", error);
  }
};

const quantityScript = (containerId: string) => {
  const container = document.getElementById(containerId);
  if (!container) return;

  const quantityInput = container.querySelector<HTMLInputElement>(
    'input[type="number"]',
  );
  const decreaseBtn = container.querySelector('[data-quantity="decrease"]');
  const increaseBtn = container.querySelector('[data-quantity="increase"]');

  if (!quantityInput || !decreaseBtn || !increaseBtn) return;

  const updateQuantity = (newQuantity: number) => {
    const min = parseInt(quantityInput.min) || 1;
    const max = parseInt(quantityInput.max) || 100;
    const validQuantity = Math.max(min, Math.min(max, newQuantity));
    quantityInput.value = validQuantity.toString();
  };

  decreaseBtn.addEventListener("click", () => {
    const currentValue = parseInt(quantityInput.value) || 1;
    updateQuantity(currentValue - 1);
  });

  increaseBtn.addEventListener("click", () => {
    const currentValue = parseInt(quantityInput.value) || 1;
    updateQuantity(currentValue + 1);
  });

  quantityInput.addEventListener("input", () => {
    const currentValue = parseInt(quantityInput.value) || 1;
    updateQuantity(currentValue);
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
  const {
    product,
    item,
    type = "shelf",
    class: _class,
    showQuantitySelector = false,
    buttonText = "Adicionar",
    hideIcon = false,
  } = props;
  const platformProps = useAddToCart(props);
  const id = useId();
  const qtdId = useId();

  const onClickScript = useScript(onClick);
  const quantityScriptContent = useScript(quantityScript, id);

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
      {(showQuantitySelector || type === "productPage") && (
        <div class="flex items-center border border-primary rounded-2xl bg-white">
          <button
            type="button"
            class="flex items-center justify-center w-8 h-8 text-primary"
            data-quantity="decrease"
          >
            -
          </button>
          <input
            id={qtdId}
            type="number"
            min={1}
            max={100}
            value={1}
            class="w-12 h-8 text-center border-0 outline-none bg-transparent text-base font-bold text-base-300"
          />
          <button
            type="button"
            class="flex items-center justify-center w-8 h-8 text-primary"
            data-quantity="increase"
          >
            +
          </button>
        </div>
      )}
      <button
        type="button"
        class={clx(
          "flex items-center gap-2 flex-grow justify-center text-accent",
          _class?.toString(),
        )}
        hx-on:click={onClickScript}
      >
        {!hideIcon && <Icon id="cart-white" size={20} />}
        {buttonText}
      </button>

      {(showQuantitySelector || type === "productPage") && (
        <script
          type="module"
          src={`data:text/javascript,${
            encodeURIComponent(quantityScriptContent)
          }`}
        />
      )}
    </div>
  );
}
export default AddToCartButton;
