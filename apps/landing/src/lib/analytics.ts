/**
 * Analítica mínima y sin dependencias. Los eventos van a `window.dataLayer`
 * (Google Tag Manager, si NEXT_PUBLIC_GTM_ID está definido) y a Plausible si
 * su script está presente. Sin ninguno de los dos no hace nada.
 */
type Props = Record<string, string | number | boolean>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    plausible?: (event: string, options?: { props?: Props }) => void;
  }
}

export function track(event: string, props: Props = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer?.push({ event, ...props });
  window.plausible?.(event, { props });
}
