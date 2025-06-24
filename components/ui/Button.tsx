import type { JSX } from "preact";
import { forwardRef } from "preact/compat";
import { AvailableIcons } from "./Icon.tsx";

export type Props =
  & Omit<JSX.IntrinsicElements["button"], "loading">
  & {
    loading?: boolean;
    iconId?: AvailableIcons;
  };

const Button = forwardRef<HTMLButtonElement, Props>(({
  type = "button",
  class: _class = "",
  loading,
  disabled,
  children,
  iconId,
  ...props
}, ref) => (
  <button
    {...props}
    className={`rounded-full border border-solid no-animation ${_class}`}
    disabled={disabled || loading}
    type={type}
    ref={ref}
  >
    {loading ? <span class="loading loading-spinner" /> : children}
  </button>
));

export default Button;