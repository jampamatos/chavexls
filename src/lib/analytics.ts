declare global { interface Window { dataLayer?: any[]; gtag?: (...args:any[]) => void } }

export function initGA(id: string) {
    if (typeof window.gtag === 'function') return; // tag already initialized
    if (!id) {
        if (import.meta.env.PROD) console.warn("[GA4] VITE_GA4_ID missing in production build");
        return;
    }

    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    window.gtag = (...args:any[]) => window.dataLayer!.push(args);
    window.gtag('js', new Date());
    window.gtag('config', id, { send_page_view:false, debug_mode: !import.meta.env.PROD });
}

export function trackEvent(name: string, params: Record<string, any> = {}) {
    if (typeof window.gtag === 'function') window.gtag('event', name, params);
}