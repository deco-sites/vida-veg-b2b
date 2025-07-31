import type { MenuInstitutionalProps } from "./MenuInstitutional.tsx";
import MenuInstitutional from "./MenuInstitutional.tsx";
import Icon from "../../components/ui/Icon.tsx";
export interface FormProps {
    menus?: MenuInstitutionalProps[];
}

const Form = ({ menus }: FormProps) => (
    <div class="container py-8 px-4 lg:px-0 lg:py-14">
        <div class="flex flex-col gap-5 lg:flex-row lg:gap-20">
            <div class="lg:max-w-48">
                <MenuInstitutional menus={menus ?? []} />
            </div>
            <div class="lg:w-3/4 flex flex-col gap-3">
                <div class="flex flex-col gap-2">
                    <h1 class="text-2xl font-bold text-base-300">Contato</h1>
                    <h2 class="text-lg font-bold text-base-300">Contato - Fale Conosco</h2>
                    <p class="text-base-300">
                        Entre em contato por nossos canais de atendimento ou preenchendo o formulário da página.
                    </p>
                    <div class="flex items-center gap-2">
                        <Icon id="phone-green" class="text-primary" size={20} />
                        <span class="text-base-300 font-bold">SAC:</span>
                        <span class="text-secondary font-normal">+55 (35) 99932-7472</span>
                    </div>
                </div>
                <div class="flex flex-col gap-2">
                    <div class="flex flex-col gap-2">
                        <h3 class="text-lg font-bold text-base-300">Formulário de Contato</h3>
                        <p class="text-base-300">Preencha os campos abaixo:</p>
                    </div>
                    <form
                        class="flex flex-col gap-4"
                        method="POST"
                        action="/api/contato"
                        hx-post="/api/contato"
                        hx-target="#form-mensagem"
                        hx-swap="afterbegin"
                    >
                        <div>
                            <label class="font-bold text-primary" htmlFor="email">E-mail*</label>
                            <input
                                class="block w-full rounded-xl border border-base-300 p-3 mt-1 text-base-300 focus:outline-none focus:ring-2 focus:ring-primary"
                                type="email"
                                id="email"
                                name="email"
                                placeholder="loremipsum@lorem.com"
                                required
                                pattern="^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
                                title="Digite um e-mail válido"
                            />
                        </div>
                        <div class="flex flex-col md:flex-row gap-4">
                            <div class="flex-1">
                                <label class="font-bold text-primary" htmlFor="nome">Nome completo*</label>
                                <input
                                    class="block w-full rounded-xl border border-base-300 p-3 mt-1 text-base-300 focus:outline-none focus:ring-2 focus:ring-primary"
                                    type="text"
                                    id="nome"
                                    name="nome"
                                    placeholder="Lorem Ipsum"
                                    required
                                    pattern="^[A-Za-zÀ-ÿ '´`^~çÇ-]+$"
                                    title="Digite apenas letras e espaços"
                                />
                            </div>
                            <div class="flex-1">
                                <label class="font-bold text-primary" htmlFor="telefone">Telefone*</label>
                                <input
                                    class="block w-full rounded-xl border border-base-300 p-3 mt-1 text-base-300 focus:outline-none focus:ring-2 focus:ring-primary"
                                    type="tel"
                                    id="telefone"
                                    name="telefone"
                                    placeholder="(00) 00000-0000"
                                    required
                                    pattern="^\(?\d{2}\)? ?\d{4,5}-?\d{4}$"
                                    title="Digite um telefone válido no formato (99) 99999-9999"
                                    maxlength="15"
                                    inputmode="tel"
                                />
                            </div>
                        </div>
                        <div>
                            <label class="font-bold text-primary" htmlFor="cidade">Cidade*</label>
                            <input
                                class="block w-full rounded-xl border border-base-300 p-3 mt-1 text-base-300 focus:outline-none focus:ring-2 focus:ring-primary"
                                type="text"
                                id="cidade"
                                name="cidade"
                                placeholder="Lorem Ipsum"
                                required
                                pattern="^[A-Za-zÀ-ÿ '´`^~çÇ-]+$"
                                title="Digite apenas letras e espaços"
                            />
                        </div>
                        <div>
                            <label class="font-bold text-primary" htmlFor="mensagem">Mensagem*</label>
                            <textarea
                                class="block w-full rounded-xl border border-base-300 p-3 mt-1 text-base-300 focus:outline-none focus:ring-2 focus:ring-primary min-h-[120px]"
                                id="mensagem"
                                name="mensagem"
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
    </div>
);

export default Form;
