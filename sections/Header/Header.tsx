import type { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import Alert from "../../components/header/Alert.tsx";
import Bag from "../../components/header/Bag.tsx";
import Menu from "../../components/header/Menu.tsx";
import NavItem from "../../components/header/NavItem.tsx";
import { MenuItem } from "../../components/header/NavItem.tsx";
import Searchbar, {
  type SearchbarProps,
} from "../../components/search/Searchbar/Form.tsx";
import Drawer from "../../components/ui/Drawer.tsx";
import Icon from "../../components/ui/Icon.tsx";
import {
  HEADER_HEIGHT_DESKTOP,
  HEADER_HEIGHT_MOBILE,
  NAVBAR_HEIGHT_MOBILE,
  SEARCHBAR_DRAWER_ID,
  SEARCHBAR_POPUP_ID,
  SIDEMENU_CONTAINER_ID,
  SIDEMENU_DRAWER_ID,
} from "../../constants.ts";
import { useDevice } from "@deco/deco/hooks";
import { type LoadingFallbackProps } from "@deco/deco";
import Login from "../../components/header/Login.tsx";
export interface Logo {
  src: ImageWidget;
  alt: string;
  width?: number;
  height?: number;
}
export interface SectionProps {
  alerts?: HTMLWidget[];
  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: MenuItem[] | null;
  /**
   * @title Searchbar
   * @description Searchbar configuration
   */
  searchbar: SearchbarProps;
  /** @title Logo */
  logo: Logo;
  /**
   * @description Usefull for lazy loading hidden elements, like hamburguer menus etc
   * @hide true */
  loading?: "eager" | "lazy";
}
type Props = Omit<SectionProps, "alert">;
const Desktop = ({ navItems, logo, searchbar }: Props) => (
  <>

    <div class="flex flex-col gap-4 pt-5 container">
      <div class="flex  items-center">
        <div class="w-1/6">
          <a href="/" aria-label="Store logo">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width || 100}
              height={logo.height || 23}
            />
          </a>
        </div>
        <div class="w-4/6 flex justify-center">

          <Searchbar {...searchbar} />
        </div>

        <div class="flex lg:gap-8 w-1/6">
          <Login />
          <Bag />
        </div>
      </div>

      <div class="flex justify-center items-center">
        <ul class="flex">
          {navItems?.slice(0, 10).map((item) => <NavItem item={item} />)}
        </ul>
        <div>
          {/* ship to */}
        </div>
      </div>
    </div>
  </>
);
const Mobile = ({ logo, searchbar, navItems, loading }: Props) => (
  <>
    <Drawer
      id={SIDEMENU_DRAWER_ID}
      class="drawer-end"

      aside={
        <Drawer.Aside title="Menu" drawer={SIDEMENU_DRAWER_ID}>
          {loading === "lazy"
            ? (
              <div
                id={SIDEMENU_CONTAINER_ID}
                class="h-full flex items-center justify-center"
                style={{ minWidth: "90vw" }}
              >
                <span class="loading loading-spinner" />
              </div>
            )
            : <Menu navItems={navItems ?? []} />}
        </Drawer.Aside>
      }
    />

    <div class="flex flex-col gap-4 bg-primary p-4 w-full shadow-sm rounded-b-3xl">
      <div
        class="flex justify-between items-center gap-4"
        style={{
          height: NAVBAR_HEIGHT_MOBILE,
          gridTemplateColumns:
            "min-content auto min-content min-content min-content",
        }}
      >
        <label
          for={SIDEMENU_DRAWER_ID}
          class="btn btn-circle btn-sm btn-primary sm:btn-ghost"
          aria-label="open menu"
        >
          <Icon id="new-menu" size={28} />
        </label>
        {logo && (
          <a
            href="/"
            class="flex-grow inline-flex justify-center"
            style={{ minHeight: NAVBAR_HEIGHT_MOBILE }}
            aria-label="Store logo"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={50}
              height={50}
            />
          </a>
        )}

        <div class="flex flex-none justify-end items-center gap-4">
          {/* <SignIn /> */}
          {/* {links?.map((link) => <Link {...link} />)} */}
          <Bag />

        </div>
      </div>
      <Searchbar {...searchbar} />
    </div>
  </>
);
function Header({
  alerts = [],
  logo = {
    src:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/986b61d4-3847-4867-93c8-b550cb459cc7",
    width: 100,
    height: 16,
    alt: "Logo",
  },
  ...props
}: Props) {
  const device = useDevice();
  return (
    <header
      style={{
        height: device === "desktop"
          ? HEADER_HEIGHT_DESKTOP
          : HEADER_HEIGHT_MOBILE,
      }}
    >
      <div class="bg-primary fixed w-full z-40">
        {device === "desktop"
          ? <Desktop logo={logo} {...props} />
          : <Mobile logo={logo} {...props} />}
      </div>
    </header>
  );
}
export const LoadingFallback = (props: LoadingFallbackProps<Props>) => (
  // deno-lint-ignore no-explicit-any
  <Header {...props as any} loading="lazy" />
);
export default Header;