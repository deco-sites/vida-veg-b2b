import { Handlers } from "$fresh/server.ts";
import { h } from "preact";
import { renderToString } from "preact-render-to-string";

function parseCsv(text: string): string[] {
  const [headerLine, ...lines] = text.trim().split(/\r?\n/);
  const headers = headerLine.split(',').map((h) => h.trim().toLowerCase());
  const cepIndex = headers.indexOf('cep');
  if (cepIndex === -1) return [];
  return lines
    .map((line) => line.split(',')[cepIndex]?.trim() ?? '')
    .filter((v) => v);
}

function FormHtml({ csvUrl, cep = "" }: { csvUrl: string; cep?: string }) {
  return (
    <form
      class="cep-form flex gap-2 items-end"
      hx-post={`/api/verifica-cep?csv=${encodeURIComponent(csvUrl)}`}
      hx-target="this"
      hx-swap="outerHTML"
    >
      <input
        type="text"
        name="cep"
        class="input input-bordered"
        placeholder="00000-000"
        value={cep}
      />
      <button type="submit" class="btn btn-primary">
        <span class="[.htmx-request_&]:hidden">Consultar</span>
        <span class="hidden [.htmx-request_&]:inline loading loading-spinner loading-xs" />
      </button>
    </form>
  );
}

function SuccessHtml({ cep, csvUrl }: { cep: string; csvUrl: string }) {
  return (
    <div class="cep-success p-4 bg-green-200 text-green-800 rounded-xl space-y-2">
      <p>O CEP {cep} está disponível para entrega.</p>
      <FormHtml csvUrl={csvUrl} cep={cep} />
    </div>
  );
}

function UnavailableHtml({ cep, csvUrl }: { cep: string; csvUrl: string }) {
  return (
    <div class="cep-unavailable p-4 bg-red-200 text-red-800 rounded-xl space-y-2">
      <p>Infelizmente não entregamos no CEP {cep}.</p>
      <FormHtml csvUrl={csvUrl} cep={cep} />
    </div>
  );
}

export const handler: Handlers = {
  async GET(req) {
    const url = new URL(req.url);
    const csvUrl = url.searchParams.get("csv") ?? "";
    const html = renderToString(<FormHtml csvUrl={csvUrl} />);
    return new Response(html, {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  },
  async POST(req) {
    const url = new URL(req.url);
    const csvUrl = url.searchParams.get("csv") ?? "";
    const form = await req.formData();
    const cep = form.get("cep")?.toString().trim() ?? "";

    const csvText = await fetch(csvUrl).then((res) => res.text());
    const cepsValidos = parseCsv(csvText);

    const html = cepsValidos.includes(cep)
      ? renderToString(<SuccessHtml cep={cep} csvUrl={csvUrl} />)
      : renderToString(<UnavailableHtml cep={cep} csvUrl={csvUrl} />);

    return new Response(html, {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  },
};
