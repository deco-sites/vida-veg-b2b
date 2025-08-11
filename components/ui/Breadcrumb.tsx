import type { BreadcrumbList } from "apps/commerce/types.ts";
import { relative } from "../../sdk/url.ts";

interface Props {
  itemListElement: BreadcrumbList["itemListElement"];
}

function Breadcrumb({ itemListElement = [] }: Props) {
  const items = [{ name: "Home", item: "/" }, ...itemListElement];

  return (
    <div class="py-0 text-xs font-normal text-base-300">
      <ul class="flex items-center gap-2">
        {items
          .filter(({ name, item }) => name && item)
          .map(({ name, item }, index) => (
            <>
              <li class="last:font-semibold">
                <a href={relative(item)}>{name}</a>
              </li>
              {index < items.length - 1 && <li>|</li>}
            </>
          ))}
      </ul>
    </div>
  );
}

export default Breadcrumb;
