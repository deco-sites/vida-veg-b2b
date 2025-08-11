import { clx } from "../../sdk/clx.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { AggregateOffer } from "apps/commerce/types.ts";

interface Props {
  offers?: AggregateOffer;
  /** @description Tamanho da tag */
  size?: "xs" | "sm" | "md" | "lg";
  /** @description Estilo da tag */
  variant?: "primary" | "secondary" | "success" | "warning" | "error";
  /** @description Forma da tag */
  shape?: "badge" | "rounded" | "square";
  /** @description Classe customizada */
  class?: string;
  /** @description Mostrar apenas se estiver em estoque */
  onlyInStock?: boolean;
}

const SIZES = {
  xs: "text-xs px-2 py-0.5",
  sm: "text-xs px-3 py-1", 
  md: "text-sm px-4 py-1",
  lg: "text-base px-6 py-2"
};

const VARIANTS = {
  primary: "bg-primary text-white",
  secondary: "bg-secondary text-white",
  success: "bg-green-500 text-white",
  warning: "bg-yellow-500 text-black",
  error: "bg-red-500 text-white"
};

const SHAPES = {
  badge: "rounded-badge",
  rounded: "rounded-lg",
  square: "rounded-none"
};

export default function DiscountBadge({ 
  offers,
  size = "sm",
  variant = "secondary",
  shape = "badge",
  class: customClass = "",
  onlyInStock = true
}: Props) {
  const {
    price = 0,
    listPrice,
    availability,
  } = useOffer(offers);

  const inStock = availability === "https://schema.org/InStock";
  const hasDiscount = listPrice && listPrice > price;
  const discountPercentage = hasDiscount ? Math.round(((listPrice - price) / listPrice) * 100) : 0;

  // Não renderizar se não houver desconto
  if (!hasDiscount || discountPercentage <= 0) {
    return null;
  }

  // Verificar se deve mostrar apenas quando em estoque
  if (onlyInStock && !inStock) {
    return null;
  }

  const badgeClass = clx(
    "font-bold text-center uppercase w-fit",
    SIZES[size],
    VARIANTS[variant],
    SHAPES[shape],
    customClass
  );

  return (
    <span class={badgeClass}>
      {discountPercentage}% off
    </span>
  );
}
