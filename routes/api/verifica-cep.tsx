import { Handlers } from "$fresh/server.ts";
import Papa from "https://esm.sh/papaparse@5.4.1";
import { renderToString } from "preact-render-to-string";

function FormHtml(csvUrl: string) { /* igual antes */ }
function SuccessHtml({ cep }: { cep: string }) { /* igual antes */ }
function UnavailableHtml({ cep }: { cep: string }) { /* igual antes */ }

export const handler: Handlers = {
  async GET(req) {
    const url = new URL(req.url);
    const csvUrl = url.searchParams.get("csv") ?? "";
    const html = renderToString(FormHtml(csvUrl));
    return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
  },
  async POST(req) {
    const url = new URL(req.url);
    const csvUrl = url.searchParams.get("csv") ?? "";
    const form = await req.formData();
    const cep = form.get("cep")?.toString().trim() ?? "";

    const csvText = await fetch(csvUrl).then(res => res.text());
    const parsed = Papa.parse<{ cep: string }>(csvText, { header: true });
    const cepsValidos = parsed.data.map(r => r.cep?.trim()).filter(Boolean);

    const html = cepsValidos.includes(cep)
      ? renderToString(<SuccessHtml cep={cep} />)
      : renderToString(<UnavailableHtml cep={cep} />);

    return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
  },
};
