import type { AnalyticsEvent } from "apps/commerce/types.ts";

declare global {
  interface Window {
    DECO_SITES_STD: {
      sendAnalyticsEvent: (event: unknown) => void;
    };
  }
}

export const sendEvent = <E extends AnalyticsEvent>(event: E) => {
  if (
    typeof globalThis.window.DECO_SITES_STD?.sendAnalyticsEvent !== "function"
  ) {
    console.info(
      "Cannot find Analytics section in your page. Press `.` to add Analytics and supress this warning",
    );

    return;
  }
  globalThis.window.DECO_SITES_STD.sendAnalyticsEvent(event);
};
/**
 * This function is usefull for sending events on click. Works with both Server and Islands components
 */
export const sendEventOnClick = <E extends AnalyticsEvent>(event: E) => ({
  onclick: () => sendEvent(event),
});

/**
 * This componente should be used when want to send event for rendered componentes.
 * This behavior is usefull for view_* events.
 */
export const SendEventOnLoad = <E extends AnalyticsEvent>(
  { event }: { event: E },
) => (
  <script
    dangerouslySetInnerHTML={{
      __html: `addEventListener("load", () => (${sendEvent})(${
        JSON.stringify(event)
      }))`,
    }}
  />
);