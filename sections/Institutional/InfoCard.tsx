import type { ImageWidget, RichText } from "apps/admin/widgets.ts";

export interface Image {
  src: ImageWidget;
  alt?: string;
}

export interface Props {
  content: RichText;
  image: Image;
  imageCaption?: string;
}

const InfoCard = ({ content, image, imageCaption }: Props) => (
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 bg-secondary rounded-2xl p-6 mx-4 lg:mx-0 my-4">
    <div class="flex flex-col gap-4">
      <div 
        class="fluid-text text-sm text-white"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
    <figure class="h-full flex flex-col items-center justify-center">
      <img
        src={image.src}
        alt={image.alt ?? "Imagem"}
        class="object-cover w-full h-full min-h-[180px] rounded-xl"
      />
      {imageCaption && (
        <figcaption class="text-xs text-primary w-full text-start mt-2">{imageCaption}</figcaption>
      )}
    </figure>
  </div>
);

export default InfoCard;
