import { MINICART_FORM_ID } from "../../constants.ts";
export interface Props {
  coupon?: string;
}
function Coupon({ coupon }: Props) {
  return (
    <div class="flex flex-col gap-3">
      <span class="text-sm md:text-base text-primary font-bold">
        Adicionar cupom:
      </span>
      <div class="flex gap-2">
        <input
          form={MINICART_FORM_ID}
          name="coupon"
          class="px-3 md:px-5 h-8 md:h-10 flex items-center text-start text-xs text-base-300 rounded-2xl flex-1 bg-base-200"
          type="text"
          value={coupon ?? ""}
          placeholder={"Digite o Cupom"}
        />
        <button
          form={MINICART_FORM_ID}
          class="bg-primary text-xs font-bold text-accent rounded-2xl px-3 md:px-5 h-8 md:h-10 flex items-center flex-shrink-0"
          name="action"
          value="set-coupon"
        >
          Ok
        </button>
      </div>
    </div>
  );
}
export default Coupon;
