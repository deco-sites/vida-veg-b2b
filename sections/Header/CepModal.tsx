import Icon from "../../components/ui/Icon.tsx";
import { useScript } from "@deco/deco/hooks";
import { useId } from "../../sdk/useId.ts";

const onLoad = (modalId: string) => {
  const modal = document.getElementById(modalId) as HTMLDialogElement;
  if (!modal) return;

  // Verificar se o usuário já informou o CEP
//   const cepInformed = localStorage.getItem('userCepInformed');
  
//   if (!cepInformed) {
    // Mostrar modal após 2 segundos
    setTimeout(() => {
      modal.showModal();
    }, 2000);
//   }

  // Função para formatar CEP
  const formatCep = (value: string) => {
    const cleanValue = value.replace(/\D/g, '');
    if (cleanValue.length <= 5) {
      return cleanValue;
    } else {
      return `${cleanValue.slice(0, 5)}-${cleanValue.slice(5, 8)}`;
    }
  };

  // Configurar eventos do modal
  const form = modal.querySelector('form[data-cep-form]');
  const cepInput = modal.querySelector('input[name="cep"]') as HTMLInputElement;
  const closeBtn = modal.querySelector('[data-close-modal]');

  // Máscara do CEP
  if (cepInput) {
    cepInput.addEventListener('input', (e) => {
      const target = e.target as HTMLInputElement;
      target.value = formatCep(target.value);
    });
  }

  // Submit do formulário
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form as HTMLFormElement);
      const cep = formData.get('cep') as string;
      
      if (cep && cep.length >= 8) {
        localStorage.setItem('userCepInformed', 'true');
        localStorage.setItem('userCep', cep);
        modal.close();
        console.log('CEP informado:', cep);
      }
    });
  }

  // Botão de fechar
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      localStorage.setItem('userCepInformed', 'true');
      modal.close();
    });
  }

  // Fechar ao clicar no backdrop
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      localStorage.setItem('userCepInformed', 'true');
      modal.close();
    }
  });
};

export default function CepModal() {
  const id = useId();
  const onLoadScript = useScript(onLoad, id);
  return (
    <dialog id={id} class="modal modal-bottom sm:modal-middle">
      <div class="modal-box relative bg-white max-w-md mx-auto">
        <div class="bg-primary relative -mx-6 -mt-6 px-6 py-4 rounded-t-2xl flex justify-end">
            <button
            type="button"
            class="btn btn-sm btn-circle btn-ghost text-white"
            aria-label="Fechar modal"
            data-close-modal
            >
                <Icon id="close" size={20} />
            </button>
        </div>

        <div class="py-6 px-2">
          <h3 class="font-bold text-2xl text-secondary text-center">
            Olá, tudo bem?
          </h3>
          <p class="text-base-300 text-center mb-6">
            Informe seu CEP para verificarmos a disponibilidade de entrega no
            seu endereço. É rapidinho!
          </p>

          <form class="space-y-4" data-cep-form>
            <div class="relative">
              <input
                type="text"
                name="cep"
                placeholder="Digite seu CEP"
                class="input input-bordered w-full bg-base-200 border-base-200 rounded-2xl px-4 py-3 text-secondary placeholder-secondary focus:outline-none"
                maxLength={9}
                required
              />
              <button
                type="submit"
                class="absolute right-2 top-1/2 transform -translate-y-1/2 btn btn-circle btn-sm bg-transparent border-transparent text-secondary shadow-none"
                aria-label="Buscar CEP"
              >
                <Icon id="new-search" size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>

      <form method="dialog" class="modal-backdrop">
        <button type="button">close</button>
      </form>
      
      <script
        type="module"
        src={`data:text/javascript,${encodeURIComponent(onLoadScript)}`}
      />
    </dialog>
  );
}
