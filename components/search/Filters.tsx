import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import { parseRange } from "apps/commerce/utils/filters.ts";
import Avatar from "../../components/ui/Avatar.tsx";
import { clx } from "../../sdk/clx.ts";
import { formatPrice } from "../../sdk/format.ts";

interface Props {
  filters: ProductListingPage["filters"];
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem(
  { url, selected, label }: FilterToggleValue,
) {
  return (
    <a href={url} rel="nofollow" class="flex items-center gap-2">
      <div
        aria-checked={selected}
        class={`relative h-6 w-6 rounded-lg border border-secondary after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-[3px] after:w-3 after:h-3 after:bg-secondary after:transition-all ${
          selected ? "after:opacity-100" : "after:opacity-0"
        }`}
      />
      <span class="text-sm text-base-300">{label}</span>
    </a>
  );
}

function FilterValues({ key, values }: FilterToggle) {
  const avatars = key === "tamanho" || key === "cor";
  const flexDirection = avatars ? "flex-row items-center" : "flex-col";

  return (
    <ul class={clx(`flex flex-wrap gap-2`, flexDirection)}>
      {values.map((item) => {
        const { url, selected, value } = item;

        if (avatars) {
          return (
            <a href={url} rel="nofollow">
              <Avatar
                content={value}
                variant={selected ? "active" : "default"}
              />
            </a>
          );
        }

        if (key === "price") {
          const range = parseRange(item.value);

          return range && (
            <ValueItem
              {...item}
              label={`${formatPrice(range.from)} - ${formatPrice(range.to)}`}
            />
          );
        }

        return <ValueItem {...item} />;
      })}
    </ul>
  );
}

function Filters({ filters }: Props) {
  return (
    <div class="flex flex-col gap-4 w-full">
      {filters
        .filter(isToggle)
        .map((filter) => {
          const hasAnyFilterSelected = filter.values.some((value) =>
            value.selected
          );
          return (
            <details
              class="collapse collapse-arrow rounded-none sm:rounded-2xl bg-base-200 max-w-sm:odd:bg-white"
              open={hasAnyFilterSelected}
            >
              <summary class="relative collapse-title text-sm text-secondary font-semibold !flex items-center justify-between min-h-[unset] after:!top-1/2">
                {filter.label}
              </summary>
              <div class="collapse-content">
                <FilterValues {...filter} />
              </div>
            </details>
          );
        })}
    </div>
  );
}

export default Filters;
