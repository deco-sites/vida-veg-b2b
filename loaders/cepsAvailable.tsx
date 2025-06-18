import Papa from "https://esm.sh/papaparse@5.4.1";

export interface Props {
  cepsCsvUrl: string; // arquivo do CMS (upload de CSV)
}

interface CsvCep {
  cep: string;
}

export default async function loader({ cepsCsvUrl }: Props, req: Request) {
  const res = await fetch(cepsCsvUrl);
  const text = await res.text();

  const parsed = Papa.parse<CsvCep>(text, { header: true });
  const validCeps = parsed.data.map(({ cep }) => cep.trim());

  const cookies = Object.fromEntries(
    req.headers.get("cookie")?.split("; ").map((c) => c.split("=")) ?? [],
  );
  const userCep = cookies["__dc-cep"];

  return {
    cep: userCep,
    isAvailable: validCeps.includes(userCep),
  };
}
