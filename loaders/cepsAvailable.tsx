import { parse } from "@std/encoding/csv";

interface Props {
  /**
   * @title Arquivo CSV com CEPs permitidos
   * @description Caminho para o arquivo CSV hospedado no CMS.
   */
  file?: string;
  /**
   * @title CEP para verificar
   */
  cep: string;
}

export interface Returns {
  available: boolean;
}

function normalize(value: string): string {
  return value.replace(/\D/g, "");
}

async function loadData(path: string): Promise<string> {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Failed to fetch ${path}`);
    return await res.text();
  }
  const filePath = path.startsWith("/") ? path.slice(1) : path;
  return await Deno.readTextFile(filePath);
}

export default async function loader(
  { file = "./static/allowed_ceps.csv", cep }: Props,
): Promise<Returns> {
  const csv = await loadData(file);
  const records = [] as Array<Record<string, string>>;
  for await (const row of parse(csv, { skipFirstRow: true })) {
    records.push(row as Record<string, string>);
  }
  const normalized = normalize(cep);
  const match = records.some((r) => normalize(r["cep"] || "") === normalized);
  return {
    available: match,
  };
}
