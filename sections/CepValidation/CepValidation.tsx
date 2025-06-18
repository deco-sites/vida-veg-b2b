

export interface Props {
  cepsCsvUrl: string;
}

export default function CepValidation({ cepsCsvUrl }: Props) {
  return (
    <div
      hx-get={`/api/verifica-cep?csv=${encodeURIComponent(cepsCsvUrl)}`}
      hx-trigger="load"
      hx-target="body"
      hx-swap="beforeend"
    />
  );
}
