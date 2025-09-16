import * as React from "react";
import { setAnalyticsConsent, getAnalyticsConsent } from "../lib/analytics";

/** MUST match the key used inside lib/analytics.ts */
const CONSENT_KEY= 'chavexls_analytics_consent';

/** Minimal cookie banner: shows only if no prior decision was stored */
export default function CookieConsent(): React.ReactElement | null {
    // open only when there's no saved decidion; default to open=false in SSR/no-LS
    const [open, setOpen] = React.useState<boolean>(false);
    // controls the slide-up transition once mounted
    const[entered, setEntered] = React.useState<boolean>(false);

    // Decide initial visibility
    React.useEffect(() => {
        try {
            const hasChoice = localStorage.getItem(CONSENT_KEY);
            // If user already chose (either 'granted' or 'denied'), do not show
            const shouldOpen = !hasChoice;
            setOpen(shouldOpen);
            // triggers slide-up on the next frame for smoother transition
            if (shouldOpen) requestAnimationFrame(() => setEntered(true));
            // If nothing saved but analytics is already "granted/denied" internally,
            // we keep the banner visible to require an explicit choice.
            void getAnalyticsConsent(); // touch for consistency (no-op here)
        } catch {
            setOpen(false);
        }
    },[]);

    function onAccept() {
        try {
            setAnalyticsConsent('granted');
            localStorage.setItem(CONSENT_KEY, 'granted');
        } catch {
            /* ignore */
        }
        setEntered(false);
        setOpen(false);
    }

    function onReject() {
        try {
            setAnalyticsConsent('denied');
            localStorage.setItem(CONSENT_KEY, 'denied');
        } catch {
            /* ignore */
        }
        setEntered(false);
        setOpen(false);
    }

    if (!open) return null;

    return (
        <div
          role="region"
          aria-label="Aviso de cookies"
          aria-live="polite"
          className={
           "fixed inset-x-0 bottom-0 z-50 border-t bg-white/95 supports-[backdrop-filter]:bg-white/80 backdrop-blur shadow-lg " +
           "transform will-change-transform transition-transform duration-300 ease-out " +
           (entered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0")
         }
        >
            <div className="mx-auto max-w-5xl px-4 py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <p className="text-sm md:text-base text-muted-foreground">
                    Usamos apenas cookies essenciais e analíticos (GA4 com IP anonimizado).
                    Ao aceitar, você nos ajuda a entender o uso do site. Você pode saber mais em{" "}
                    <a className="underline" href="/privacy" target="_blank" rel="noopener">
                      Política de Privacidade
                    </a>
                    ,{" "}
                    <a className="underline" href="/terms" target="_blank" rel="noopener">
                      Termos do Beta
                    </a>{" "}
                    e{" "}
                    <a className="underline" href="/subprocessors" target="_blank" rel="noopener">
                      Subprocessadores
                    </a>
                    .
                </p>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={onReject}
                    className="rounded-xl border px-4 py-2 text-sm md:text-base hover:bg-muted"
                  >
                    Recusar
                  </button>
                  <button
                    type="button"
                    onClick={onAccept}
                    className="rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm md:text-base hover:opacity-90"
                  >
                    Aceitar
                  </button>
                </div>
            </div>
        </div>
    )
}