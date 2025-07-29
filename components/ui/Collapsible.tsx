import { useScript } from "@deco/deco/hooks";

export interface CollapsibleProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const toggleCollapse = () => {
  const button = event.currentTarget as HTMLDivElement;
  const checkbox = button.previousElementSibling as HTMLInputElement;
  const icon = button.querySelector("svg");

  if (checkbox) {
    checkbox.checked = !checkbox.checked;

    // Rotacionar o ícone
    if (icon) {
      if (checkbox.checked) {
        icon.style.transform = "rotate(180deg)";
      } else {
        icon.style.transform = "rotate(0deg)";
      }
    }
  }
};

function Collapsible({ title, children, className = "" }: CollapsibleProps) {
  return (
    <div class={`${className}`}>
      <input type="checkbox" class="hidden peer" />
      <div
        class="font-bold flex items-center justify-between px-4 h-[60px] cursor-pointer hover:bg-gray-50"
        hx-on:click={useScript(toggleCollapse)}
      >
        <span>{title}</span>

        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="transition-transform duration-200 rotate-180"
        >
          <path
            d="M2.64646 9.64622L7.64646 4.64622C7.6929 4.59973 7.74804 4.56285 7.80874 4.53769C7.86944 4.51252 7.9345 4.49957 8.00021 4.49957C8.06592 4.49957 8.13098 4.51252 8.19168 4.53769C8.25238 4.56285 8.30752 4.59973 8.35396 4.64622L13.354 9.64622C13.4478 9.74004 13.5005 9.86728 13.5005 9.99997C13.5005 10.1326 13.4478 10.2599 13.354 10.3537C13.2601 10.4475 13.1329 10.5002 13.0002 10.5002C12.8675 10.5002 12.7403 10.4475 12.6465 10.3537L8.00021 5.70684L3.35396 10.3537C3.3075 10.4002 3.25235 10.437 3.19166 10.4622C3.13096 10.4873 3.06591 10.5002 3.00021 10.5002C2.93451 10.5002 2.86946 10.4873 2.80876 10.4622C2.74806 10.437 2.69291 10.4002 2.64646 10.3537C2.6 10.3073 2.56316 10.2521 2.53801 10.1914C2.51287 10.1307 2.49993 10.0657 2.49993 9.99997C2.49993 9.93427 2.51287 9.86922 2.53801 9.80852C2.56316 9.74782 2.6 9.69267 2.64646 9.64622Z"
            fill="#A1C342"
          />
        </svg>
      </div>
      <div class="overflow-hidden peer-checked:max-h-screen max-h-0 transition-all duration-300">
        <div class="pb-3">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Collapsible;
