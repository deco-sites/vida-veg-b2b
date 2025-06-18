

import { CEP_VALIDATION_MODAL_ID } from "../../constants.ts";

export interface Props {
  cepsCsvUrl: string;
}

export default function CepValidation({ cepsCsvUrl }: Props) {
  return (
    <>
      <label for={CEP_VALIDATION_MODAL_ID} class="btn">Consultar CEP</label>
      <div
        hx-get={`/api/verifica-cep?csv=${encodeURIComponent(cepsCsvUrl)}`}
        hx-trigger="load"
        hx-target="body"
        hx-swap="beforeend"
      />
    </>
  );
}
