import Image from "apps/website/components/Image.tsx";

import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Image {
  /** @title Imagem */
  src: ImageWidget;

  /** @title Texto alternativo */
  alt?: string;
}

export interface Props {
  /** @title Título da seção */
  title: string;

  /** @title Imagens */
  images: Image[];
}

const TwoImages = ({ title, images }: Props) => (
  <div>
    <h2 class="text-lg font-bold text-base-300 mx-4 lg:mx-0 mb-2 mt-4">
      {title}
    </h2>
    <div class="flex overflow-x-auto gap-4 md:grid md:grid-cols-2 snap-x snap-mandatory">
      {images.map((img, i) => (
        <Image
          key={i}
          src={img.src}
          alt={img.alt ?? "Imagem"}
          class="rounded-xl object-cover w-full h-56 first:ml-4 last:mr-4 lg:first:ml-0 lg:last:mr-0 min-w-[60vw] lg:min-w-[unset]"
          width={400}
          height={224}
          loading="lazy"
        />
      ))}
    </div>
  </div>
);

export default TwoImages;
