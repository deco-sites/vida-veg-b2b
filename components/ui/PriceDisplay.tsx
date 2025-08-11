import { clx } from "../../sdk/clx.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { formatPrice } from "../../sdk/format.ts";
import { AggregateOffer } from "apps/commerce/types.ts";

interface Props {
  offers?: AggregateOffer;
  /** @description Tamanho do preço principal */
  priceSize?: "sm" | "md" | "lg" | "xl";
  /** @description Tamanho do preço riscado */
  listPriceSize?: "xs" | "sm" | "md";
  /** @description Mostrar parcelamento */
  showInstallments?: boolean;
  /** @description Classe customizada para o container */
  class?: string;
  /** @description Layout do componente */
  layout?: "vertical" | "horizontal";
}

const PRICE_SIZES = {
  sm: "text-sm",
  md: "text-lg", 
  lg: "text-2xl",
  xl: "text-3xl"
};

const LIST_PRICE_SIZES = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base"
};

export default function PriceDisplay({ 
  offers,
  priceSize = "xl",
  listPriceSize = "sm", 
  showInstallments = true,
  class: customClass = "",
  layout = "vertical"
}: Props) {
  const {
    price = 0,
    listPrice,
    installments,
  } = useOffer(offers);

  const hasDiscount = listPrice && listPrice > price;

  const containerClass = clx(
    layout === "vertical" ? "flex flex-col gap-1" : "flex items-center gap-2",
    customClass
  );

  return (
    <div class={containerClass}>
      <div class="flex items-center gap-2">
        {hasDiscount && (
          <span class={clx(
            "line-through font-medium text-gray-400",
            LIST_PRICE_SIZES[listPriceSize]
          )}>
            {formatPrice(listPrice, offers?.priceCurrency)}
          </span>
        )}
        <span class={clx(
          "font-bold text-primary",
          PRICE_SIZES[priceSize]
        )}>
          {formatPrice(price, offers?.priceCurrency)}
        </span>
      </div>

      {showInstallments && installments && (
        <span class="text-sm text-gray-400">
          {installments}
        </span>
      )}
    </div>
  );
}
