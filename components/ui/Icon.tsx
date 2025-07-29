import { asset } from "$fresh/runtime.ts";
import type { JSX } from "preact";

export type AvailableIcons =
  | "search"
  | "new-search"
  | "new-close"
  | "new-login"
  | "new-cart"
  | "new-chevron-down"
  | "new-chevron-right"
  | "filter"
  | "new-close-white"
  | "new-trash"
  | "order-by"
  | "arrow-white"
  | "new-heart-testimonials"
  | "arrow-green"
  | "new-menu"
  | "minus"
  | "plus"
  | "cart-white"
  | "shopping_bag"
  | "menu"
  | "account_circle"
  | "close"
  | "chevron-right"
  | "favorite"
  | "home_pin"
  | "call"
  | "local_shipping"
  | "pan_zoom"
  | "share"
  | "sell"
  | "check-circle"
  | "error"
  | "trash"
  | "list";

interface Props extends JSX.SVGAttributes<SVGSVGElement> {
  /**
   * Symbol id from element to render. Take a look at `/static/icons.svg`.
   *
   * Example: <Icon id="search" />
   */
  id: AvailableIcons;
  size?: number;
}

function Icon(
  { id, size = 24, width, height, ...otherProps }: Props,
) {
  return (
    <svg
      {...otherProps}
      width={width ?? size}
      height={height ?? size}
    >
      <use href={asset(`/sprites.svg#${id}`)} />
    </svg>
  );
}

export default Icon;
