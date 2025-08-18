import type { ImageWidget } from "apps/admin/widgets.ts";

/** @titleBy title */
export interface Item {
  /** @title Ícone */
  icon: ImageWidget;

  /** @title Título do card */
  title: string;

  /** @title Descrição */
  description: string;
}

export interface Props {
  /** @title Título da seção */
  title: string;

  /** @title Cards */
  cards: Item[];
}

const Cards = ({ title, cards }: Props) => (
  <div>
    <h2 class="text-lg font-bold text-base-300 mx-4 lg:mx-0 mb-2 mt-4">
      {title}
    </h2>
    <div class="flex overflow-x-auto gap-4 md:grid md:grid-cols-4 snap-x snap-mandatory">
      {cards.map((card, i) => (
        <div
          key={i}
          class="bg-primary rounded-xl bg-base-100 border border-base-200 p-4 flex flex-col items-center text-center gap-2 flex-shrink-0 max-w-[230px] w-full min-h-[210px] first:ml-4 last:mr-4 lg:first:ml-0 lg:last:mr-0"
        >
          <img src={card.icon} alt={card.title} class="h-12 mb-2" />
          <div class="font-bold text-white">{card.title}</div>
          <div class="text-xs text-white">{card.description}</div>
        </div>
      ))}
    </div>
  </div>
);

export default Cards;
