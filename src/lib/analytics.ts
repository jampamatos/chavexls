declare global {
  interface Window { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void }
}
import type { PlanId } from './pricing';
import type { UTMKey } from './utm';

/** Consent storage key and types */
type ConsentState = 'granted' | 'denied';
const CONSENT_KEY= 'chavexls_analytics_consent';

/** In-memory event queue whie consent is denied or gtag not ready */
const eventQueue: Array<{ name:string; params: Record<string, unknown> }> = [];

/** Read saved consent from storage (default to denied) */
let consentState: ConsentState = (() => {
  try {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') return 'denied';
    const saved = localStorage.getItem(CONSENT_KEY);
    return saved === 'granted' ? 'granted' : 'denied';
  } catch {
    return 'denied';
  }
})();

/** Initialize GA4 script and configuration */
export function initGA(id: string): void {
    if (typeof window.gtag === 'function') return; // tag already initialized
    if (!id) {
        if (import.meta.env.PROD) console.warn("[GA4] VITE_GA4_ID missing in production build");
        return;
    }

    // Load tag once
    if (typeof window.gtag !== 'function') {
      const s = document.createElement("script");
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
      document.head.appendChild(s);
  
      window.dataLayer = window.dataLayer || [];
      window.gtag = (...args: unknown[]) => window.dataLayer!.push(args);
      window.gtag('js', new Date());

      // Default consent: analytics denied (privacy-first)
      window.gtag('consent', 'default', {
        ad_storage: 'denied',
        analytics_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        functionality_storage: 'denied',
        security_storage: 'granted', // needed for _ga cookies
        wait_for_update: 500,
      });
    }

    // Apply current consent choice (persisted)
    if (consentState == 'granted') {
      window.gtag('consent', 'update', { analytics_storage: 'granted' });
    }

    // Safe config
    window.gtag('config', id, {
      send_page_view: false, // we'll track manually
      debug_mode: !import.meta.env.PROD,
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
}

/** Internal: send now or enqueue until consent/gtag ready */
function sendOrQueue(name: string, params: Record<string, unknown>): void {
  const ready = typeof window.gtag === 'function';
  const allowed = consentState === 'granted';
  if (!ready || !allowed) {
    eventQueue.push({ name, params });
    return;
  }
  if (typeof window.gtag === 'function') {
    window.gtag('event', name, params);
  }
}

/** Public: safely send an event (respects consent and queue) */
export function trackEvent(name: string, params: Record<string, unknown>): void {
  sendOrQueue(name, params);
}

/** Update consent and flush queued events if granted */
export function setAnalyticsConsent(next: ConsentState): void {
  consentState = next;
  try { localStorage.setItem(CONSENT_KEY, next); } catch {}
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', { analytics_storage: next });
  }
  if (next === 'granted' && eventQueue.length) {
    // Flush current queue
    const pending = eventQueue.splice(0);
    for (const e of pending) {
      if (typeof window.gtag === 'function') {
        window.gtag('event', e.name, e.params);
      } else {
        // if still not ready, requeue (should be rare)
        eventQueue.push(e);
      }
    }
  }
}

export function getAnalyticsConsent(): ConsentState {
  return consentState;
}

/** Best-effort GA client id extraction (fallback-friendly) */
export function getClientId(): { cid: string; source: 'gtag'|'cookie'|'fallback' } {
  // 1) Potential hook for gtag('get', 'G-XXXX', 'client_id', cb) — omitted to keep sync/simple
  try {
    if (typeof document !== 'undefined') {
      // 2) Parse cookies (_ga or _ga_*). Formats vary between GA3/GA4; we keep raw id if unsure.
      const cookies = document.cookie.split(';').map(s => s.trim());
      const ga = cookies.find(c => c.startsWith('_ga='));
      if (ga) {
        const val = decodeURIComponent(ga.split('=')[1] || '');
        const parts = val.split('.');
        if (parts.length >= 4) {
          const cid = `${parts[2]}.${parts[3]}`;
          if (/^\d+\.\d+$/.test(cid)) return { cid, source: 'cookie' };
        }
        return { cid: val, source: 'cookie' };
      }
      const ga4 = cookies.find(c => c.startsWith('_ga_'));
      if (ga4) {
        const val = decodeURIComponent(ga4.split('=')[1] || '');
        return { cid: val, source: 'cookie' };
      }
    }
  } catch {
    // ignore
  }

  // 3) Fallback: ephemeral pseudo-id
  return { cid: `lf_${Date.now()}_${Math.floor(Math.random()*1e6)}`, source: 'fallback' };
}

// Typed analytics façade
export type Variant = 'A' | 'B';
type UtmParams = Partial<Record<UTMKey, string>>;

export type AnalyticsEventMap = {
  page_view: { variant: Variant } & UtmParams;
  form_start: { variant: Variant } & UtmParams;
  scroll_50: { variant: Variant } & UtmParams;
  plan_select_change: { variant: Variant; plan: PlanId } & UtmParams;
  pricing_interest_click: { variant: Variant; plan_id: PlanId | 'founder'; plan_variant?: 'founder' | 'regular' } & UtmParams;
  demo_view: { variant: 'B' } & UtmParams;
  demo_generate_click: { variant: 'B' } & UtmParams;
  sample_download: { variant: Variant } & UtmParams;
  footer_link_click: { variant: Variant; label: string; href: string } & UtmParams;
  lead_submit: {
    variant: Variant;
    profile: string;
    volume: string;
    plan_hint: 'starter' | 'business' | 'founder' | '';
    message_len: number;
    has_phone: boolean;
    cid: string;
  } & UtmParams;
  beta_signup: AnalyticsEventMap['lead_submit'];
};

export function track<E extends keyof AnalyticsEventMap>(name: E, params: AnalyticsEventMap[E]): void {
  trackEvent(name as string, params as Record<string, unknown>);
}
