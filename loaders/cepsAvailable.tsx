
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

function parseCsv(text: string): Array<Record<string, string>> {
  const [headerLine, ...lines] = text.trim().split(/\r?\n/);
  const headers = headerLine.split(',').map((h) => h.trim());
  return lines
    .filter((l) => l.trim())
    .map((line) => {
      const values = line.split(',');
      const record: Record<string, string> = {};
      headers.forEach((h, i) => {
        record[h] = values[i]?.trim() ?? '';
      });
      return record;
    });
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
  const records = parseCsv(csv);
  const normalized = normalize(cep);
  const match = records.some((r) => normalize(r["cep"] || "") === normalized);
  return {
    available: match,
  };
}
