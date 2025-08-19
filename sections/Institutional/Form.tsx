import Icon from "../../components/ui/Icon.tsx";

import { contact } from "../../db/schema.ts";
import { useSection } from "@deco/deco/hooks";
import type { AppContext } from "../../apps/deco/records.ts";

export async function loader(
  _props: unknown,
  req: Request,
  ctx: AppContext,
) {
  const drizzle = await ctx.invoke.records.loaders.drizzle();

  if (req.body) {
    const formData = await req.formData();

    const email = formData.get("email")?.toString();
    const name = formData.get("name")?.toString();
    const phone = formData.get("phone")?.toString();
    const city = formData.get("city")?.toString();
    const message = formData.get("message")?.toString();

    if (!email || !name || !phone || !city || !message) {
      throw new Error("Todos os campos são obrigatórios");
    }

    const newContact: typeof contact.$inferInsert = {
      email,
      name,
      phone,
      city,
      message,
    };

    console.log("newContact", newContact);

    await drizzle.insert(contact).values(newContact);
  }

  return null;
}

export default function Form() {
  const createUrl = useSection();

  return (
    <div class="container px-4 lg:px-0 w-full">
      <div class="flex flex-col gap-3">
        <div class="flex flex-col gap-2">
          <h1 class="text-2xl font-bold text-base-300">Contato</h1>
          <p class="text-base-300">
            Entre em contato por nossos canais de atendimento ou preenchendo o
            formulário da página.
          </p>
          <div class="flex items-center gap-2">
            <Icon id="phone-green" class="text-primary" size={20} />
            <span class="text-base-300 font-bold">SAC:</span>
            <span class="text-secondary font-normal">
              +55 (35) 99932-7472
            </span>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <form
            class="flex flex-col gap-4"
            hx-post={createUrl}
            hx-trigger="click"
            hx-target="closest section"
            hx-swap="outerHTML"
          >
            <div>
              <label
                class="font-bold text-primary"
                htmlFor="email"
              >
                E-mail*
              </label>
              <input
                class="block w-full rounded-xl border border-base-300 p-3 mt-1 text-base-300 focus:outline-none focus:ring-2 focus:ring-primary"
                type="email"
                id="email"
                name="email"
                placeholder="loremipsum@lorem.com"
                required
                title="Digite um e-mail válido"
              />
            </div>
            <div class="flex flex-col md:flex-row gap-4">
              <div class="flex-1">
                <label
                  class="font-bold text-primary"
                  htmlFor="name"
                >
                  Nome completo*
                </label>
                <input
                  class="block w-full rounded-xl border border-base-300 p-3 mt-1 text-base-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Lorem Ipsum"
                  required
                  title="Digite apenas letras e espaços"
                />
              </div>
              <div class="flex-1">
                <label
                  class="font-bold text-primary"
                  htmlFor="phone"
                >
                  Telefone*
                </label>
                <input
                  class="block w-full rounded-xl border border-base-300 p-3 mt-1 text-base-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="(00) 00000-0000"
                  required
                  title="Digite um telefone válido no formato (99) 99999-9999"
                  maxlength={15}
                  inputmode="tel"
                />
              </div>
            </div>
            <div>
              <label
                class="font-bold text-primary"
                htmlFor="city"
              >
                Cidade*
              </label>
              <input
                class="block w-full rounded-xl border border-base-300 p-3 mt-1 text-base-300 focus:outline-none focus:ring-2 focus:ring-primary"
                type="text"
                id="city"
                name="city"
                required
                title="Digite apenas letras e espaços"
              />
            </div>
            <div>
              <label
                class="font-bold text-primary"
                htmlFor="message"
              >
                Mensagem*
              </label>
              <textarea
                class="block w-full rounded-xl border border-base-300 p-3 mt-1 text-base-300 focus:outline-none focus:ring-2 focus:ring-primary min-h-[120px]"
                id="message"
                name="message"
                placeholder="Escreva aqui..."
                required
              />
            </div>
            <div id="form-mensagem"></div>
            <button
              type="submit"
              class="w-full bg-primary text-white font-bold rounded-xl py-3 mt-2 hover:bg-green-700 transition-colors"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
