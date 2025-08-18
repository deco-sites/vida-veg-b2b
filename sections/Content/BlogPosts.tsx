import Icon from "../../components/ui/Icon.tsx";
import Slider from "../../components/ui/Slider.tsx";
import { useId } from "../../sdk/useId.ts";
import { useScript } from "@deco/deco/hooks";
import type { ImageWidget, RichText } from "apps/admin/widgets.ts";

/**
 * @titleBy title
 */
export interface Post {
    title: string;
    /** @description 320x260 */
    image: ImageWidget;
    videoLink?: string;
}

export interface Props {
    icon?: ImageWidget;
    title?: RichText;
    posts?: Post[];
}

const DEFAULT_IMAGE =
    "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4763/682eb374-def2-4e85-a45d-b3a7ff8a31a9";

function SlideItem(
    { post, id, index }: { post: Post; id: string; index: number },
) {
    return (
        <Slider.Item
            index={index}
            class="carousel-item rounded-2xl first:ml-4 last:mr-4 sm:first:ml-0 sm:last:mr-0 bg-primary overflow-hidden"
        >
            <div class="max-w-[80vw] lg:max-w-[324px]">
                <div class="rounded-large overflow-hidden">
                    <div class="p-6 space-y-4">
                        <div class="space-y-2">
                            <h3 class="text-xl font-bold">{post.title}</h3>
                        </div>
                    </div>
                    <div
                        id="post_item"
                        class="h-[260px] relative"
                        style={{
                            backgroundImage: `url(${post.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        <button
                            class="btn btn-ghost hover:bg-transparent w-full h-full flex items-center justify-center"
                            hx-on:click={useScript((id) => {
                                // @ts-ignore .
                                document.getElementById(id)?.showModal();
                            }, id)}
                        >
                            <Icon id="play" size={60} />
                        </button>
                    </div>
                </div>
            </div>
        </Slider.Item>
    );
}

export default function BlogPosts({
    title = "Quer saber como fazer <b>pratos irresistíveis com nossos produtos?</b> Confira nossos vídeos com algumas receitas exclusivas que vão transformar seu cardápio:",
    posts = [
        {
            title: "Pizza com queijo muçarela Vida Veg",
            image: DEFAULT_IMAGE,
            videoLink: "https://www.youtube.com/embed/vhc4a3QbAcY?si=NuJMY-DP_D3PQ6Jk",
        },
        {
            title: "Pizza com queijo muçarela Vida Veg",
            image: DEFAULT_IMAGE,
            videoLink: "https://www.youtube.com/embed/XoodunTw0kw?si=2br2NUu3Fx_E-E0Y",
        },
        {
            title: "Pizza com queijo muçarela Vida Veg",
            image: DEFAULT_IMAGE,
            videoLink: "https://www.youtube.com/embed/vhc4a3QbAcY?si=NuJMY-DP_D3PQ6Jk",
        },
        {
            title: "Pizza com queijo muçarela Vida Veg",
            image: DEFAULT_IMAGE,
            videoLink: "https://www.youtube.com/embed/vhc4a3QbAcY?si=NuJMY-DP_D3PQ6Jk",
        },
        {
            title: "Pizza com queijo muçarela Vida Veg",
            image: DEFAULT_IMAGE,
            videoLink: "https://www.youtube.com/embed/XoodunTw0kw?si=2br2NUu3Fx_E-E0Y",
        },
    ],
}: Props) {
    const id = useId();

    return (
        <div class="container my-8">
            <div
                class="text-2xl lg:text-3xl font-bold fluid-text mb-4"
                dangerouslySetInnerHTML={{ __html: title }}
            />

            <div class="flex gap-2">
                <div
                    id={id}
                    class="grid grid-rows-1"
                    style={{
                        gridTemplateColumns: "min-content 1fr min-content",
                    }}
                >
                    <div class="col-start-1 col-span-3 row-start-1 row-span-1">
                        <Slider class="carousel carousel-center sm:carousel-end gap-4 w-full">
                            {posts.map((post, index) => (
                                <SlideItem
                                    key={post.title}
                                    post={post}
                                    id={`${id}:${index}`}
                                    index={index}
                                />
                            ))}
                        </Slider>
                    </div>

                    <div class="col-start-1 col-span-1 row-start-1 row-span-1 z-10 self-center p-2 relative bottom-[15%]">
                        <Slider.PrevButton class="hidden sm:flex disabled:invisible btn btn-outline btn-sm btn-circle no-animation bg-white">
                            <Icon
                                id="chevron-right"
                                class="rotate-180"
                            />
                        </Slider.PrevButton>
                    </div>

                    <div class="col-start-3 col-span-1 row-start-1 row-span-1 z-10 self-center p-2 relative bottom-[15%]">
                        <Slider.NextButton class="hidden sm:flex disabled:invisible btn btn-outline btn-sm btn-circle no-animation bg-white">
                            <Icon id="chevron-right" />
                        </Slider.NextButton>
                    </div>
                </div>
            </div>

            <Slider.JS rootId={id} />

            {posts.map((post, index) =>
                post.videoLink && (
                    <dialog
                        key={`modal-${index}`}
                        id={`${id}:${index}`}
                        class="modal"
                    >
                        <div class="modal-box max-w-2xl pt-12">
                            <form method="dialog">
                                <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 border-0">
                                    ✕
                                </button>
                            </form>
                            <iframe
                                class="max-w-full"
                                width="672"
                                height="390"
                                src={post.videoLink}
                                title="YouTube video player"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerpolicy="strict-origin-when-cross-origin"
                            />
                        </div>
                        <form method="dialog" class="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>
                )
            )}
        </div>
    );
}
