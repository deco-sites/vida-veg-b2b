import { ProductListingPage } from "apps/commerce/types.ts";
import { useScript } from "@deco/deco/hooks";
import Icon from "../ui/Icon.tsx";
const SORT_QUERY_PARAM = "sort";
const PAGE_QUERY_PARAM = "page";
export type Props = Pick<ProductListingPage, "sortOptions"> & {
  url: string;
};
const getUrl = (href: string, value: string) => {
  const url = new URL(href);
  url.searchParams.delete(PAGE_QUERY_PARAM);
  url.searchParams.set(SORT_QUERY_PARAM, value);
  return url.href;
};
const labels: Record<string, string> = {
  "relevance:desc": "Relevância",
  "price:desc": "Maior Preço",
  "price:asc": "Menor Preço",
  "orders:desc": "Mais vendidos",
  "name:desc": "Nome - de Z a A",
  "name:asc": "Nome - de A a Z",
  "release:desc": "Lançamento",
  "discount:desc": "Maior desconto",
};
function Sort({ sortOptions, url }: Props) {
  const current = getUrl(
    url,
    new URL(url).searchParams.get(SORT_QUERY_PARAM) ?? "",
  );
  const options = sortOptions?.map(({ value, label }) => ({
    value: getUrl(url, value),
    label,
  }));
  return (
    <>
      <label for="sort" class="sr-only">Sort by</label>
      <div class="grid grid-cols-[24px_1fr] items-center gap-2 bg-transparent sm:bg-base-200 rounded-lg w-full max-w-32 sm:max-w-sm p-2">
        <Icon id="list" size={24} class="text-secondary" />
        <select
          name="sort"
          class="w-full text-sm font-medium text-base-300 appearance-none bg-transparent"
          hx-on:change={useScript(() => {
            const select = event!.currentTarget as HTMLSelectElement;
            window.location.href = select.value;
          })}
        >
          {options.map(({ value, label }) => (
            <option
              label={labels[label] ?? label}
              value={value}
              selected={value === current}
            >
              {label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
export default Sort;
