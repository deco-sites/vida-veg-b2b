import { type ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import { useSendEvent } from "../../sdk/useSendEvent.ts";

export interface BannerItem {
  mobile: ImageWidget;
  desktop: ImageWidget;
  alt: string;
  href: string;
}

export interface Props {
  topBanner1?: BannerItem;
  topBanner2?: BannerItem;
  bottomBanner?: BannerItem;
}

function DoubleBanner({ topBanner1, topBanner2, bottomBanner }: Props) {
  // Placeholders padrão
  const defaultBanner: BannerItem = {
    mobile: "https://placehold.co/350x164",
    desktop: "https://placehold.co/612x292",
    alt: "Banner Placeholder",
    href: "#",
  };

  const defaultBottomBanner: BannerItem = {
    mobile: "https://placehold.co/350x164",
    desktop: "https://placehold.co/1440x292",
    alt: "Banner Placeholder",
    href: "#",
  };

  const renderBanner = (
    banner: BannerItem,
    index: number,
    isBottom = false,
  ) => {
    const params = { promotion_name: banner.alt };

    const selectPromotionEvent = useSendEvent({
      on: "click",
      event: { name: "select_promotion", params },
    });

    const viewPromotionEvent = useSendEvent({
      on: "view",
      event: { name: "view_promotion", params },
    });

    return (
      <div key={index} class={isBottom ? "w-full" : "flex-1"}>
        <a
          {...selectPromotionEvent}
          href={banner.href}
        >
          <Picture
            {...viewPromotionEvent}
          >
            <Source
              media="(max-width: 768px)"
              src={banner.mobile}
              width={350}
              height={164}
            />
            <Source
              media="(min-width: 768px)"
              src={banner.desktop}
              width={isBottom ? 1440 : 612}
              height={292}
            />
            <img
              src={banner.desktop}
              alt={banner.alt}
              class="w-full object-cover rounded-2xl h-[164px] md:h-[292px]"
              loading="lazy"
            />
          </Picture>
        </a>
      </div>
    );
  };

  return (
    <div class="w-full container px-4 py-5 lg:px-0 mx-auto">
      <div class="flex flex-col gap-4">
        {/* Top banners - side by side on desktop, stacked on mobile */}
        <div class="flex flex-col md:flex-row gap-4">
          {renderBanner(topBanner1 || defaultBanner, 0)}
          {renderBanner(topBanner2 || defaultBanner, 1)}
        </div>

        {/* Bottom banner - full width */}
        {renderBanner(bottomBanner || defaultBottomBanner, 2, true)}
      </div>
    </div>
  );
}

export const LoadingFallback = () => (
  <div class="w-full container px-4 lg:pt-5 mx-auto">
    <div class="flex flex-col gap-4">
      {/* Top banners placeholder */}
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1 bg-gray-200 rounded-2xl h-[164px] md:h-[292px] animate-pulse">
        </div>
        <div class="flex-1 bg-gray-200 rounded-2xl h-[164px] md:h-[292px] animate-pulse">
        </div>
      </div>
      {/* Bottom banner placeholder */}
      <div class="w-full bg-gray-200 rounded-2xl h-[164px] md:h-[292px] animate-pulse">
      </div>
    </div>
  </div>
);

export default DoubleBanner;
