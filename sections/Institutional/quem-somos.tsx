import type { MenuInstitutionalProps } from "./MenuInstitutional.tsx";
import MenuInstitutional from "./MenuInstitutional.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

// Tipagens
export interface BlockImage {
  src: ImageWidget;
  alt?: string;
}
export interface BlockText {
  content: string;
}
export interface BlockTextListImage {
  title: string;
  items: { title: string; content: string }[];
  image: BlockImage;
  imageCaption?: string;
}
export interface BlockTitleTwoImages {
  title: string;
  images: BlockImage[];
}
export interface BlockVideo {
  embedUrl: string;
}
export interface BlockTitleCards {
  title: string;
  cards: {
    icon: ImageWidget;
    title: string;
    description: string;
  }[];
}
export interface QuemSomosProps {
  menus?: MenuInstitutionalProps[];
  fullbanner: BlockImage;
  intro: BlockText;
  blocoTextListImage: BlockTextListImage;
  blocoTitleTwoImages: BlockTitleTwoImages;
  blocoVideo: BlockVideo;
  blocoTitleCards: BlockTitleCards;
}

// Utils
function getYouTubeEmbedUrl(url: string): string {
  const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/);
  if (ytMatch?.[1]) return `https://www.youtube.com/embed/${ytMatch[1]}`;
  if (url.includes("/embed/")) return url;
  return url;
}

// Subcomponentes
const YouTubeEmbed = ({ url }: { url: string }) => (
  <iframe
    src={getYouTubeEmbedUrl(url)}
    class="w-full h-full"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
    loading="lazy"
    title="YouTube video"
  />
);

const SectionImageTextList = ({ data }: { data: BlockTextListImage }) => (
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 bg-secondary rounded-2xl p-6">
    <div class="lg:col-span-2 flex flex-col gap-4 max-w-[310px]">
      <h3 class="font-bold text-white text-lg mb-2">{data.title}</h3>
      {data.items.map((item, i) => (
        <div key={i} class="flex flex-col">
          <div class="font-bold mb-1 text-white">{item.title}</div>
          <div class="text-sm text-white whitespace-pre-line">{item.content}</div>
        </div>
      ))}
    </div>
    <figure class="h-full flex flex-col items-center justify-center">
      <img
        src={data.image.src}
        alt={data.image.alt ?? "Imagem"}
        class="object-cover w-full h-full min-h-[180px] rounded-xl"
      />
      {data.imageCaption && (
        <figcaption class="text-xs text-base-300 p-2">{data.imageCaption}</figcaption>
      )}
    </figure>
  </div>
);

const SectionTwoImages = ({ data }: { data: BlockTitleTwoImages }) => (
  <div>
    <h3 class="text-lg font-bold text-base-300 mb-4">{data.title}</h3>
    <div class="flex overflow-x-auto gap-4 md:grid md:grid-cols-2 snap-x snap-mandatory">
      {data.images.map((img, i) => (
        <figure
          key={i}
          class="rounded-xl overflow-hidden bg-base-100 border border-base-200 flex-shrink-0 snap-start min-w-[80%] md:min-w-0 md:w-auto"
        >
          <img src={img.src} alt={img.alt ?? "Imagem"} class="object-cover w-full h-56" />
        </figure>
      ))}
    </div>
  </div>
);

const SectionVideo = ({ embedUrl }: { embedUrl: string }) => (
  <div class="grid grid-cols-1 gap-4">
    <div class="rounded-xl overflow-hidden aspect-video bg-black">
      <YouTubeEmbed url={embedUrl} />
    </div>
  </div>
);

const SectionCards = ({ data }: { data: BlockTitleCards }) => (
  <div>
    <h3 class="text-lg font-bold text-base-300 mb-4">{data.title}</h3>
    <div class="flex overflow-x-auto gap-4 md:grid md:grid-cols-4 snap-x snap-mandatory">
      {data.cards.map((card, i) => (
        <div
          key={i}
          class="bg-primary rounded-xl bg-base-100 border border-base-200 p-4 flex flex-col items-center text-center gap-2 flex-shrink-0 snap-start max-w-[230px] w-full min-h-[323px]"
        >
          <img src={card.icon} alt={card.title} class="h-12 mb-2" />
          <div class="font-bold text-white">{card.title}</div>
          <div class="text-xs text-white">{card.description}</div>
        </div>
      ))}
    </div>
  </div>
);

// Componente principal
const QuemSomos = ({
  menus,
  fullbanner,
  intro,
  blocoTextListImage,
  blocoTitleTwoImages,
  blocoVideo,
  blocoTitleCards,
}: QuemSomosProps) => (
  <div class="container py-5 px-4 lg:px-0 lg:py-10">
    <div class="flex flex-col gap-5 lg:flex-row lg:gap-20">
      <div class="lg:max-w-48">
        <MenuInstitutional menus={menus ?? []} />
      </div>
      <div class="lg:w-3/4 flex flex-col gap-8">
        {fullbanner && (
          <img
            src={fullbanner.src}
            alt={fullbanner.alt ?? "Banner"}
            class="rounded-xl w-full object-cover mb-4"
          />
        )}
        {intro && (
          <div
            class="font-normal text-sm text-base-300 mb-2"
            dangerouslySetInnerHTML={{ __html: intro.content }}
          />
        )}
        {blocoTextListImage && <SectionImageTextList data={blocoTextListImage} />}
        {blocoTitleTwoImages && <SectionTwoImages data={blocoTitleTwoImages} />}
        {blocoVideo && <SectionVideo embedUrl={blocoVideo.embedUrl} />}
        {blocoTitleCards && <SectionCards data={blocoTitleCards} />}
      </div>
    </div>
  </div>
);

export default QuemSomos;
