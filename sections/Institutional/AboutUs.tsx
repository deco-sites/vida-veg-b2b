/**
 * @title Quem Somos - Página Completa
 * @description Página institucional completa "Quem Somos" com banner, introdução, história, produtos, vídeo e valores
 */

import type { MenuInstitutionalProps } from "./MenuInstitutional.tsx";
import MenuInstitutional from "./MenuInstitutional.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

// Tipagens
export interface BlockImage {
  /** @title Imagem */
  src: ImageWidget;
  
  /** @title Texto alternativo */
  alt?: string;
}

export interface BlockText {
  /** @title Conteúdo */
  /** @format rich-text */
  content: string;
}

/** @titleBy title */
export interface TextListItem {
  /** @title Título do item */
  title: string;
  
  /** @title Conteúdo do item */
  content: string;
}

export interface BlockTextListImage {
  /** @title Título da seção */
  title: string;
  
  /** @title Lista de itens */
  items: TextListItem[];
  
  /** @title Imagem */
  image: BlockImage;
  
  /** @title Legenda da imagem */
  imageCaption?: string;
}

export interface BlockTitleTwoImages {
  /** @title Título da seção */
  title: string;
  
  /** @title Imagens */
  images: BlockImage[];
}

export interface BlockVideo {
  /** @title URL do vídeo (YouTube) */
  embedUrl: string;
}

/** @titleBy title */
export interface CardItem {
  /** @title Ícone */
  icon: ImageWidget;
  
  /** @title Título do card */
  title: string;
  
  /** @title Descrição */
  description: string;
}

export interface BlockTitleCards {
  /** @title Título da seção */
  title: string;
  
  /** @title Cards */
  cards: CardItem[];
}

export interface AboutUsProps {
  /** @title Menu institucional */
  menus?: MenuInstitutionalProps[];
  
  /** @title Banner principal */
  fullbanner?: BlockImage;
  
  /** @title Introdução */
  intro?: BlockText;
  
  /** @title Seção com texto, lista e imagem */
  blocoTextListImage?: BlockTextListImage;
  
  /** @title Seção com título e duas imagens */
  blocoTitleTwoImages?: BlockTitleTwoImages;
  
  /** @title Seção de vídeo */
  blocoVideo?: BlockVideo;
  
  /** @title Seção com cards */
  blocoTitleCards?: BlockTitleCards;
}

// Dados mockados
const DEFAULT_PROPS: AboutUsProps = {
  fullbanner: {
    src: "https://assets.decocache.com/vida-veg-b2b/d94393e2-0dcb-4c11-bfb1-6340187964f9/POST-05-1-(1).png",
    alt: "Banner Vida Veg - Quem Somos",
  },
  intro: {
    content: `
      <p>A Vida Veg foi criada com a intenção de contribuir com alimentação saudável e mais sustentável. A partir de pesquisas e da experiência de empreender, Anderson Rodrigues e Álvaro Gazolla se tornaram sócios com o objetivo de suprir a demanda por alimentos plant based no mercado. Com a chegada de novos sócios, a Vida Veg foi se aprimorando e expandindo, oferecendo alimentos cada vez mais gostosos, saudáveis e acessíveis à população.
      Hoje, a Vida Veg conta com uma equipe unida e preparada, uma fábrica em expansão, um portifólio em torno de 40 produtos e presença em mais de 6.000 pontos de venda no país. Com certeza, é uma das marcas de referência e bastante diferenciada no segmento plant based do Brasil.</p>
    `,
  },
  blocoTextListImage: {
    title: "",
    items: [
      {
        title: "POSICIONAMENTO",
        content: "Somos uma Food Tech Plant Based que acredita na alimentação como forma de cuidar da vida e contribuir para um mundo melhor..",
      },
      {
        title: "DIFERENCIAL",
        content: "O maior e mais variado portifólio de produtos Plant Based do Brasil: Leites frescos Vegetais, Iogurtes, Queijos, Cremes e Pastas, Manteigas e Sobremesas.",
      },
      {
        title: "PROPÓSITO",
        content: "Contribuir para um mundo melhor facilitando o acesso a alimentos de base vegetal.",
      },
      {
        title: "ATUAÇÃO",
        content: "Presente em todos os estados do Brasil.",
      },
    ],
    image: {
      src: "https://assets.decocache.com/vida-veg-b2b/03b9952d-55d2-448f-9eb0-f336d871639b/image-4.png",
      alt: "Timeline Vida Veg",
    },
    imageCaption: "Fundadores Álvaro e Anderson",
  },
  blocoTitleTwoImages: {
    title: "Maior e mais moderna fábrica do Brasil em Lavras",
    images: [
      {
        src: "https://assets.decocache.com/vida-veg-b2b/7fc2bea3-2234-48fe-87b9-4ed7588ce5ed/image-(27).png",
        alt: "lorem ipsum dolor sit amet",
      },
      {
        src: "https://assets.decocache.com/vida-veg-b2b/35eceb80-2369-4568-a1f5-0ddde48cd929/image-5-(1).png",
        alt: "lorem ipsum dolor sit amet",
      },
    ],
  },
  blocoVideo: {
    embedUrl: "https://www.youtube.com/watch?v=vhc4a3QbAcY&t=2s&ab_channel=VidaVeg",
  },
  blocoTitleCards: {
    title: "Nossos selos e certificações",
    cards: [
      {
        icon: "https://assets.decocache.com/vida-veg-b2b/6abf3241-5d9f-4327-806e-737eb45b2e01/image-6.png",
        title: "SELO SVB",
        description: "Todos produtos certificados pela SVB sociedade vegetariana Brasileira",
      },
      {
        icon: "https://assets.decocache.com/vida-veg-b2b/2dee4b13-229b-4162-9388-e75b11fb79ac/image-7.png",
        title: "SELO EU RECICLO",
        description: "A cada um produto vendido, 1 outra embalagem é reciclada",
      },
      {
        icon: "https://assets.decocache.com/vida-veg-b2b/727f3c95-1dd4-4ced-83dd-6a5a947c53ec/image-8-(1).png",
        title: "SELO KOSHER",
        description: "Kosher – Comunidade Judaica",
      },
      {
        icon: "https://assets.decocache.com/vida-veg-b2b/f386f6be-c08b-40eb-b072-6c480c2aa4cf/image-9.png",
        title: "SELO KOSHER",
        description: "Kosher – Comunidade Judaica.",
      },
    ],
  },
};

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
      {data.title && (
        <h3 class="font-bold text-white text-lg mb-2">{data.title}</h3>
      )}
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
        <figcaption class="text-xs text-primary w-full text-start mt-2">{data.imageCaption}</figcaption>
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
          class="bg-primary rounded-xl bg-base-100 border border-base-200 p-4 flex flex-col items-center text-center gap-2 flex-shrink-0 snap-start max-w-[230px] w-full min-h-[210px]"
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
/**
 * Componente AboutUs - Página institucional completa
 * 
 * Renderiza uma página "Quem Somos" com layout de duas colunas:
 * - Coluna esquerda: Menu institucional navegável
 * - Coluna direita: Conteúdo modular (banner, texto, imagens, vídeo, cards)
 * 
 * Todos os blocos são opcionais e possuem conteúdo mockado por padrão
 */
const AboutUs = (props: AboutUsProps) => {
  // Aplicar valores padrão
  const {
    menus = [],
    fullbanner = DEFAULT_PROPS.fullbanner,
    intro = DEFAULT_PROPS.intro,
    blocoTextListImage = DEFAULT_PROPS.blocoTextListImage,
    blocoTitleTwoImages = DEFAULT_PROPS.blocoTitleTwoImages,
    blocoVideo = DEFAULT_PROPS.blocoVideo,
    blocoTitleCards = DEFAULT_PROPS.blocoTitleCards,
  } = props;

  return (
    <div class="container py-5 px-4 lg:px-0 lg:py-10">
      <div class="flex flex-col gap-5 lg:flex-row lg:gap-20">
        <div class="lg:max-w-48">
          <MenuInstitutional menus={menus} />
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
              dangerouslySetInnerHTML={{ __html: intro?.content }}
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
};

export default AboutUs;
