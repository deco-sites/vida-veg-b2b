
import type { RichText } from "apps/admin/widgets.ts";

interface Props {
  content: RichText;
  verticalPadding?: boolean;
}

const InstitutuonalContent = ({ content, verticalPadding = false }: Props) => {
  return (
    <div class={`container px-4 lg:px-0 ${verticalPadding ? 'py-5 lg:py-10' : ''}`}>
      <div class="flex flex-col justify-start gap-6">
        <div class="fluid-text font-normal text-sm text-base-300" dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
}

export const LoadingFallback = () => {
  return (
    <div class="container mx-4 lg:mx-0 my-4">
      <div class="flex flex-col gap-5 lg:flex-row lg:gap-20">
        <div class="lg:max-w-48 w-full flex flex-col gap-4 mt-5">
          {[...Array(6)].map((_, i) => (
            <div key={i} class="h-8 bg-base-200 rounded animate-pulse w-full" />
          ))}
        </div>
        <div class="lg:w-3/4 w-full">
          <div class="flex flex-col justify-start gap-6">
            <div class="h-8 w-1/2 bg-base-200 rounded animate-pulse mb-2" />
            <div class="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} class="h-6 bg-base-200 rounded animate-pulse w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutuonalContent;