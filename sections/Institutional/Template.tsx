import { SectionProps } from "@deco/deco";
import { renderSection } from "apps/website/pages/Page.tsx";
import MenuInstitutional from "../../components/ui/MenuInstitutional.tsx";

import type { Section } from "@deco/deco/blocks";
import type { AppContext } from "../../apps/site.ts";

interface Props {
    sections?: Section[];
}

export default function Template(
    props: SectionProps<typeof loader>,
) {
    return (
        <div class="container my-5">
            <div class="grid grid-cols-1 lg:grid-cols-[190px_1fr] gap-8">
                <div class="mx-4 lg:mx-0">
                    <MenuInstitutional />
                </div>
                <div class="flex flex-col gap-4">
                    <div class="lg:max-w-4xl lg:mx-auto">
                        {props.sections?.map(renderSection)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export const loader = (props: Props, _req: Request, _ctx: AppContext) => {
    // const { menu } = ctx.props.institutional || {};

    return { ...props };
};
