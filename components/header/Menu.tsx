import Icon from "../../components/ui/Icon.tsx";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Login from "./Login.tsx";

export interface Props {
  navItems?: SiteNavigationElement[];
}

function MenuItem({ item }: { item: SiteNavigationElement }) {
  return (
    <div class="collapse collapse-plus">
      <input type="checkbox" />
      <div class="collapse-title font-bold">{item.name}</div>
      <div class="collapse-content">
        <ul>
          {/* <li>
            <a class="underline text-sm" href={item.url}>Ver todos</a>
          </li> */}
          {item.children?.map((node) => (
            <li>
              <MenuItem item={node} />
            </li>
          ))}
        </ul>
      </div>
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
