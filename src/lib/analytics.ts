declare global { interface Window { dataLayer?: any[]; gtag?: (...args:any[]) => void } }

export function initGA(id: string) {
    if (!id) return;

    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    window.gtag = (...args:any[]) => window.dataLayer!.push(args);
    window.gtag('js', new Date());
    window.gtag('config', id);
}

export function trackEvent(name: string, params: Record<string, any> = {}) {
    if (typeof window.gtag === 'function') window.gtag('event', name, params);
}