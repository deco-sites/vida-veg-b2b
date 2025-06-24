import { MINICART_FORM_ID } from "../../constants.ts";
import { useScript } from "@deco/deco/hooks";
export interface Props {
  coupon?: string;
}
function Coupon({ coupon }: Props) {
  return (

      <div class="flex items-center justify-between">
        <span class="text-sm text-base-content font-bold">Adicionar cupom:</span>
        <input
          form={MINICART_FORM_ID}
          name="coupon"
          class="px-5 h-10 flex items-center text-start text-xs text-base-300 rounded-2xl max-w-[270px] bg-base-200"
          type="text"
          value={coupon ?? ""}
          placeholder={"Digite o Cupom"}
        />
        <button
          form={MINICART_FORM_ID}
          class="bg-base-content text-xs font-bold text-accent rounded-2xl px-5 h-10 flex items-center"
          name="action"
          value="set-coupon"
        >
          Ok
        </button>
    </div>
  );
}
export default Coupon;
