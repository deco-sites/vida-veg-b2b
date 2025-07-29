import Image from "apps/website/components/Image.tsx";
import Section from "../../components/ui/Section.tsx";

import { asset } from "$fresh/runtime.ts";
import { useId } from "../../sdk/useId.ts";
import { useDevice } from "@deco/deco/hooks";
import { useComponent } from "../Component.tsx";

import type { ImageWidget } from "apps/admin/widgets.ts";

/** @titleBy title */
interface Item {
  href?: string;
  title?: string;
  /** @description size 20x20 */
  icon?: ImageWidget;
}

/** @titleBy title */
interface Link {
  href?: string;
  title?: string;
  children?: Item[];
}

/** @titleBy alt */
interface Social {
  alt?: string;
  href?: string;
  image?: ImageWidget;
}

/** @titleBy alt */
interface Seal {
  alt?: string;
  href?: string;
  image?: ImageWidget;
  width?: number;
  height?: number;
}

interface Logo {
  image?: ImageWidget;
  width?: number;
  height?: number;
}

interface Props {
  logo?: Logo;
  seals?: Seal[];
  links?: Link[];
  social?: Social[];
  policies?: string;
  // paymentMethods?: Social[];
}

function Footer({
  links = [],
  seals = [],
  social = [],
  policies = "© 2024 Vida Veg. Todos os Direitos Reservados. By:",
  // paymentMethods = [],
  logo,
}: Props) {
  const id = useId();
  const device = useDevice();

  return (
    <div class="pt-2 bg-primary mt-5 lg:mt-10">
      <footer class="rounded-t-3xl bg-ice">
        <div class="container mx-auto px-4 flex flex-col gap-5 sm:gap-10 py-10">
          {device === "mobile" &&
            (
              <li class="flex justify-center">
                <img
                  loading="lazy"
                  src={logo?.image}
                  width={74}
                  height={82}
                />
              </li>
            )}
          <div class="flex flex-col sm:flex-row justify-between items-center gap-4 pb-5 lg:pb-10">
            <div class="w-full">
              <form
                hx-swap="innerHTML"
                hx-sync="this:replace"
                hx-post={useComponent(import.meta.resolve("./Result.tsx"))}
                hx-target={`#${id}`}
                class="flex flex-col sm:flex-row gap-5 w-full items-center"
              >
                <div class="text-lg sm:text-2xl font-bold w-full text-accent text-center lg:text-start">
                  Receba as{" "}
                  <span class="text-secondary">novidades da Vida Veg!</span>
                </div>
                <div class="grid grid-cols-1 md:flex lg:justify-end gap-4 items-center w-full  md:max-w-full">
                  <input
                    name="name"
                    class="w-full text-sm border-white border bg-transparent lg:max-w-64 rounded-2xl text-accent outline-0 h-14 placeholder:text-accent px-4 lg:px-10"
                    type="text"
                    placeholder="Seu nome"
                  />
                  <input
                    name="email"
                    class="w-full text-sm border-white border bg-transparent lg:max-w-64 rounded-2xl text-accent outline-0 h-14 placeholder:text-accent px-4 lg:px-10"
                    type="text"
                    placeholder="seu@email.com.br"
                  />
                  <button
                    class="h-14 bg-secondary px-8 w-full sm:w-auto lg:max-w-44 rounded-2xl border-0 font-bold"
                    type="submit"
                  >
                    <span class="[.htmx-request_&]:hidden inline">
                      Cadastrar
                    </span>
                    <span class="[.htmx-request_&]:inline hidden loading loading-spinner" />
                  </button>
                </div>
              </form>
              <div id={id} />
            </div>
          </div>
          {device === "mobile"
            ? (
              <ul class="flex flex-col gap-4">
                {social && social.length > 0 && (
                  <li class="flex justify-center gap-4">
                    {social.map(({ image, href, alt }) => (
                      <div
                        key={href}
                        class="w-12 h-12 flex items-center justify-center border border-primary rounded-full"
                      >
                        <a href={href}>
                          <Image
                            src={image}
                            alt={alt}
                            loading="lazy"
                            width={32}
                            height={32}
                          />
                        </a>
                      </div>
                    ))}
                  </li>
                )}
                {links.map(({ title, children }) => (
                  <details class="collapse collapse-arrow px-4 bg-accent rounded-2xl">
                    <summary class="collapse-title font-normal flex items-center justify-between pl-0">
                      {title}
                    </summary>
                    <div class="collapse-content p-0">
                      <ul class="flex flex-col gap-4">
                        {children?.map(({ title, href }) => (
                          <li>
                            <a
                              class="text-sm font-medium text-base-400"
                              href={href}
                            >
                              {title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </details>
                ))}

                {seals.length > 0 && (
                  <ul class="flex items-center gap-4 justify-center sm:justify-start w-full sm:w-auto">
                    {seals.map(({ image, alt, href, width, height }) => {
                      if (href) {
                        return (
                          <li>
                            <a href={href}>
                              {image &&
                                (
                                  <Image
                                    src={image}
                                    alt={alt}
                                    width={width}
                                    height={height}
                                    loading="lazy"
                                  />
                                )}
                            </a>
                          </li>
                        );
                      }

                      return (
                        <li>
                          <Image
                            src={image}
                            alt={alt}
                            width={width}
                            height={height}
                            loading="lazy"
                          />
                        </li>
                      );
                    })}
                  </ul>
                )}
              </ul>
            )
            : (
              <ul class="grid grid-flow-row sm:grid-flow-col gap-6 pb-10">
                <li>
                  <img
                    loading="lazy"
                    src={logo?.image}
                    width={logo?.width}
                    height={logo?.height}
                  />
                </li>
                {links.map(({ title, href, children }) => (
                  <li class="flex flex-col gap-4">
                    <a class="text-accent font-semibold" href={href}>
                      {title}
                    </a>
                    <ul class="flex flex-col gap-4">
                      {children?.map(({ title, href, icon }) => (
                        <li>
                          <a
                            class="flex items-center gap-1 text-sm font-medium text-accent"
                            href={href}
                          >
                            {icon && (
                              <Image
                                src={icon}
                                alt={title}
                                width={20}
                                height={20}
                                loading="lazy"
                              />
                            )}
                            {title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
                <div class="flex flex-col justify-between">
                  {social && social.length > 0 && (
                    <li class="flex gap-4 justfy-center sm:justify-end w-full sm:w-auto">
                      {social.map(({ image, href, alt }) => (
                        <div class="w-12 h-12 flex items-center justify-center border border-primary rounded-full">
                          <a href={href}>
                            <Image
                              src={image}
                              alt={alt}
                              loading="lazy"
                              width={32}
                              height={32}
                            />
                          </a>
                        </div>
                      ))}
                    </li>
                  )}

                  {seals.length > 0 && (
                    <ul class="flex items-center gap-4 justify-center sm:justify-end w-full sm:w-auto">
                      {seals.map(({ image, alt, href, width, height }) => {
                        if (href) {
                          return (
                            <li>
                              <a href={href}>
                                {image &&
                                  (
                                    <Image
                                      src={image}
                                      alt={alt}
                                      width={width}
                                      height={height}
                                      loading="lazy"
                                    />
                                  )}
                              </a>
                            </li>
                          );
                        }

                        return (
                          <li>
                            <Image
                              src={image}
                              alt={alt}
                              width={width}
                              height={height}
                              loading="lazy"
                            />
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </ul>
            )}


          <div class="flex flex-col items-center lg:items-start lg:flex-row gap-5 lg:gap-1">
            <p class="text-xs text-accent">{policies}</p>
            <div class="flex flex-nowrap items-center justify-center sm:justify-end gap-4 col-span-2">
              <a href="https://www.wavecommerce.com.br/?utm_source=rodape&utm_medium=site+vida-veg">
                <img
                  width={97}
                  height={17}
                  src="https://assets.decocache.com/vida-veg-b2b/d3d67d8a-7381-4383-9aea-bfc2feaf0e07/Group-697.svg"
                />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export const LoadingFallback = () => <Section.Placeholder height="1145px" />;

export default Footer;
