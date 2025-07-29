import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Login from "./Login.tsx";
import Collapsible from "../ui/Collapsible.tsx";

export interface Props {
  navItems?: SiteNavigationElement[];
}

function MenuItem({ item, isChild = false }: { item: SiteNavigationElement, isChild?: boolean }) {
  const hasChildren = item.children && item.children.length > 0;

  if (hasChildren) {
    return (
      <Collapsible title={item.name} className="h-auto">
        <ul>
          {item.children?.map((node) => (
            <li class="py-1">
              <MenuItem item={node} isChild={true} />
            </li>
          ))}
        </ul>
      </Collapsible>
    );
  }

  // Item sem filhos - sem ícone, sem collapsible
  return (
    <div class="flex items-center h-[60px] px-4 cursor-pointer hover:bg-gray-50">
      <a href={item.url} class={isChild ? "w-full" : "font-semibold w-full"}>
        {item.name}
      </a>
    </div>
  );
}

function Menu({ navItems = [] }: Props) {
  return (
    <div
      class="flex flex-col h-full overflow-y-auto"
      style={{ minWidth: "100vw" }}
    >
      <ul class="flex flex-col bg-accent">
        <Login />
      </ul>

      <ul class="flex-grow flex flex-col divide-y divide-base-200 overflow-y-auto">
        {navItems.map((item) => (
          <li class="odd:bg-base-200">
            <MenuItem item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Menu;
