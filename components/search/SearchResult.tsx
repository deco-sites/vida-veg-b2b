import Sort from "./Sort.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Drawer from "../ui/Drawer.tsx";
import Filters from "../../components/search/Filters.tsx";
import Breadcrumb from "../ui/Breadcrumb.tsx";
import ProductCard from "../../components/product/ProductCard.tsx";

import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { ItemCard } from "../../sections/Content/OurProducts.tsx";
import { useSendEvent } from "../../sdk/useSendEvent.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { useDevice, useScript, useSection } from "@deco/deco/hooks";

import type { SectionProps } from "@deco/deco";
import type { ImageWidget, RichText } from "apps/admin/widgets.ts";
import type { ProductListingPage } from "apps/commerce/types.ts";
import type { Card } from "../../sections/Content/OurProducts.tsx";

/** @titleBy route */
interface Seo {
  route?: string;
  image?: ImageWidget;
  title?: RichText;
  description?: RichText;
  productCards?: Card[];
}

export interface Layout {
  /**
   * @title Pagination
   * @description Format of the pagination
   */
  pagination?: "show-more" | "pagination";
}

export interface Props {
  pageSeo: Seo[];
  /** @title Integration */
  page: ProductListingPage | null;
  layout?: Layout;
  /** @description 0 for ?page=0 as your first page */
  startingPage?: 0 | 1;
  /** @hidden */
  partial?: "hideMore" | "hideLess";
}

function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-10">
      <span>Página não encontrada</span>
    </div>
  );
}

const useUrlRebased = (overrides: string | undefined, base: string) => {
  let url: string | undefined = undefined;
  if (overrides) {
    const temp = new URL(overrides, base);
    const final = new URL(base);
    final.pathname = temp.pathname;
    for (const [key, value] of temp.searchParams.entries()) {
      final.searchParams.set(key, value);
    }
    url = final.href;
  }
  return url;
};

function PageResult(props: SectionProps<typeof loader>) {
  const { layout, startingPage = 0, url, partial } = props;
  const page = props.page!;
  const { products, pageInfo } = page;
  const perPage = pageInfo?.recordPerPage || products.length;
  const zeroIndexedOffsetPage = pageInfo.currentPage - startingPage;
  const offset = zeroIndexedOffsetPage * perPage;
  const nextPageUrl = useUrlRebased(pageInfo.nextPage, url);
  const prevPageUrl = useUrlRebased(pageInfo.previousPage, url);
  const partialPrev = useSection({
    href: prevPageUrl,
    props: { partial: "hideMore" },
  });
  const partialNext = useSection({
    href: nextPageUrl,
    props: { partial: "hideLess" },
  });
  const infinite = layout?.pagination !== "pagination";
  return (
    <div class="grid grid-flow-row grid-cols-1 place-items-center px-4 sm:px-0">
      <div
        class={clx(
          "pb-2 sm:pb-10",
          (!prevPageUrl || partial === "hideLess") && "hidden",
        )}
      >
        <a
          rel="prev"
          class="btn btn-ghost"
          hx-swap="outerHTML show:parent:top"
          hx-get={partialPrev}
        >
          <span class="inline [.htmx-request_&]:hidden">
            Ver menos
          </span>
          <span class="loading loading-spinner hidden [.htmx-request_&]:block" />
        </a>
      </div>

      <div
        data-product-list
        class={clx(
          "grid items-center",
          "grid-cols-2 gap-2",
          "sm:grid-cols-4 sm:gap-10",
          "w-full",
        )}
      >
        {products?.map((product, index) => (
          <ProductCard
            key={`product-card-${product.productID}`}
            product={product}
            preload={index === 0}
            index={offset + index}
            class="h-full min-w-[160px] max-w-[300px]"
          />
        ))}
      </div>

      <div class={clx("pt-2 sm:pt-10 w-full", "")}>
        {infinite
          ? (
            <div class="flex justify-center [&_section]:contents">
              <a
                rel="next"
                class={clx(
                  "btn btn-ghost",
                  (!nextPageUrl || partial === "hideMore") && "hidden",
                )}
                hx-swap="outerHTML show:parent:top"
                hx-get={partialNext}
              >
                <span class="inline [.htmx-request_&]:hidden">
                  Ver Mais
                </span>
                <span class="loading loading-spinner hidden [.htmx-request_&]:block" />
              </a>
            </div>
          )
          : (
            <div class={clx("join", infinite && "hidden")}>
              <a
                rel="prev"
                aria-label="previous page link"
                href={prevPageUrl ?? "#"}
                disabled={!prevPageUrl}
                class="btn btn-ghost join-item"
              >
                <Icon id="chevron-right" class="rotate-180" />
              </a>
              <span class="btn btn-ghost join-item">
                Page {zeroIndexedOffsetPage + 1}
              </span>
              <a
                rel="next"
                aria-label="next page link"
                href={nextPageUrl ?? "#"}
                disabled={!nextPageUrl}
                class="btn btn-ghost join-item"
              >
                <Icon id="chevron-right" />
              </a>
            </div>
          )}
      </div>
    </div>
  );
}

const setPageQuerystring = (page: string, id: string) => {
  const element = document.getElementById(id)?.querySelector(
    "[data-product-list]",
  );
  if (!element) {
    return;
  }
  new IntersectionObserver((entries) => {
    const url = new URL(location.href);
    const prevPage = url.searchParams.get("page");
    for (let it = 0; it < entries.length; it++) {
      if (entries[it].isIntersecting) {
        url.searchParams.set("page", page);
      } else if (
        typeof history.state?.prevPage === "string" &&
        history.state?.prevPage !== page
      ) {
        url.searchParams.set("page", history.state.prevPage);
      }
    }
    history.replaceState({ prevPage }, "", url.href);
  }).observe(element);
};

function Result(props: SectionProps<typeof loader>) {
  const container = useId();
  const controls = useId();
  const device = useDevice();
  const { startingPage = 0, url, partial } = props;
  const page = props.page!;
  const { products, filters, breadcrumb, pageInfo, sortOptions } = page;
  const perPage = pageInfo?.recordPerPage || products.length;
  const zeroIndexedOffsetPage = pageInfo.currentPage - startingPage;
  const offset = zeroIndexedOffsetPage * perPage;

  const viewItemListEvent = useSendEvent({
    on: "view",
    event: {
      name: "view_item_list",
      params: {
        // TODO: get category name from search or cms setting
        item_list_name: breadcrumb.itemListElement?.at(-1)?.name,
        item_list_id: breadcrumb.itemListElement?.at(-1)?.item,
        items: page.products?.map((product, index) =>
          mapProductToAnalyticsItem({
            ...(useOffer(product.offers)),
            index: offset + index,
            product,
            breadcrumbList: page.breadcrumb,
          })
        ),
      },
    },
  });

  const results = (
    <span class="text-sm font-normal text-base-300">
      {page.pageInfo.recordPerPage} resultados
    </span>
  );

  const sortBy = sortOptions.length > 0 && (
    <Sort sortOptions={sortOptions} url={url} />
  );

  const { pageSeo = [] } = props;
  const {
    image: seoImage,
    title: seoTitle,
    description: seoDescription,
    productCards: seoProductCards = [],
  } = pageSeo[0] || {};

  return (
    <>
      <div id={container} {...viewItemListEvent} class="w-full">
        {partial ? <PageResult {...props} /> : (
          <>
            {device === "mobile" && (
              <div class="flex flex-col gap-2 w-full p-4">
                <div class="">
                  <Breadcrumb itemListElement={breadcrumb?.itemListElement} />
                </div>
                <div class="flex items-center text-base-300 gap-2 font-semibold text-4xl leading-none">
                  Produtos
                  <small>{results}</small>
                </div>
              </div>
            )}
            {seoImage && (
              <div
                class="flex items-center justify-end h-52 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${seoImage})`,
                }}
              >
                {seoTitle && (
                  <div
                    class="container px-5 sm:px-0 text-3xl font-bold text-white text-right"
                    dangerouslySetInnerHTML={{ __html: seoTitle }}
                  />
                )}
              </div>
            )}
            <div class="container w-full">
              <div class="flex flex-col gap-4 py-4 sm:py-8">
                {device === "desktop" && (
                  <>
                    <div class="px-4 sm:px-0">
                      <Breadcrumb
                        itemListElement={breadcrumb?.itemListElement}
                      />
                    </div>
                    <div class="flex items-center text-base-300 gap-2 font-semibold text-4xl leading-none px-4 sm:px-0">
                      Produtos
                      <small>{results}</small>
                    </div>
                  </>
                )}

                {seoDescription && (
                  <div
                    class="text-sm text-base-300 px-4 sm:px-0"
                    dangerouslySetInnerHTML={{ __html: seoDescription }}
                  />
                )}

                {seoProductCards.length > 0 && (
                  <div class="flex gap-4 sm:gap-8 overflow-x-auto flex-nowrap sm:flex-wrap justify-start sm:justify-center">
                    {seoProductCards.map((card, index) => (
                      <div class="first:ml-4 last:mr-4 min-w-32">
                        <ItemCard
                          key={index}
                          src={card.src}
                          label={card.label}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {device === "mobile" && (
                <Drawer
                  id={controls}
                  aside={
                    <div class="bg-base-100 flex flex-col h-full overflow-y-hidden w-full max-w-[85vw]">
                      <div class="flex justify-between items-center bg-secondary text-white">
                        <h1 class="flex items-center px-4 py-3 gap-2">
                          <Icon id="filter" size={24} />
                          <span class="font-semibold text-base">Filtrar</span>
                        </h1>
                        <label class="btn btn-ghost" for={controls}>
                          <Icon id="close" />
                        </label>
                      </div>
                      <div class="flex-grow overflow-auto">
                        <Filters filters={filters} />
                      </div>
                    </div>
                  }
                >
                  <div class="flex sm:hidden justify-between px-4 mb-4">
                    <label class="btn btn-ghost text-base-300" for={controls}>
                      <Icon id="filter" size={24} class="text-secondary" />
                      Filtrar
                    </label>
                    {sortBy}
                  </div>
                </Drawer>
              )}

              <div class="grid grid-cols-1 sm:grid-cols-[250px_1fr] gap-10">
                {device === "desktop" && (
                  <aside class="flex flex-col gap-4 w-full">
                    <span class="font-bold h-12 flex gap-2 items-center text-base-300 text-xl">
                      <Icon id="filter" />
                      Filtrar
                    </span>

                    <Filters filters={filters} />
                  </aside>
                )}

                <div class="flex flex-col gap-4 items-end">
                  {device === "desktop" && (
                    <div class="flex justify-between items-center">
                      {sortBy}
                    </div>
                  )}
                  <PageResult {...props} />
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript(
            setPageQuerystring,
            `${pageInfo.currentPage}`,
            container,
          ),
        }}
      />
    </>
  );
}

function SearchResult({ page, ...props }: SectionProps<typeof loader>) {
  if (!page) {
    return <NotFound />;
  }
  return <Result {...props} page={page} />;
}

export const loader = (props: Props, req: Request) => {
  return {
    ...props,
    url: req.url,
  };
};

export default SearchResult;
