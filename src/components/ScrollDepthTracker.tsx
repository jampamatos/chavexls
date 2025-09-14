import * as React from "react";
import { track, type Variant } from "../lib/analytics";
import { readStoredUtms } from "../lib/utm";

/** LocalStorage key used elsewhere to persist the chosen A/B variant */
const VAR_KEY = "chavexls_variant";

/** Return current variant from a global hint or localStorage (fallback to 'A') */
function getVariant() : Variant {
    // Prefer the global set by RootRedirect (no storage hit)
    try {
        // @ts-expect-error debug/global helper set in RootRedirect
        const gv = window.__chavexlsVariant;
        if (gv === 'A' || gv === 'B') return gv;
    } catch { /* noop */ }

    // Sticky from localStorage (if available)
    try {
        const v = localStorage.getItem(VAR_KEY);
        if (v === 'A' || v === 'B') return v;
    } catch { /* noop */ }

    return "A";
}

/** Compute if the user has reached 50% of the document height */
function reachedHalfViewport(): boolean {
    const docEl = document.documentElement;
    const body = document.body;

    const scrollTop = window.scrollY || docEl.scrollTop || 0;
    const viewportH = window.innerHeight || docEl.clientHeight || 0;

    // robust document height
    const docH = Math.max(
        docEl.scrollHeight,
        docEl.offsetHeight,
        docEl.clientHeight,
        body ? body.scrollHeight : 0,
        body ? body.offsetHeight : 0
    );

    // If the page is very short, reaching 50% can happen immediately; that's OK.
    const scrolled = scrollTop + viewportH;
    return docH > 0 ? scrolled >= docH * 0.5 : false;
}

/**
 * Fires a single GA4 event 'scroll_50' per route (pathname) per session.
 * Uses sessionStorage to avoid duplicate fires while the user navigates/refreshes.
 */
export default function ScrollDepthTracker(): React.ReactElement | null {
    const [variant] = React.useState<Variant>(() => getVariant());
    const utms = React.useMemo(() => readStoredUtms(), []);
    const onceKey = React.useMemo(
        () => `scroll50:${typeof window !== "undefined" ? window.location.pathname : "/"}`,
        []
    );
    const firedRef = React.useRef<boolean>(false);
    const tickingRef = React.useRef<boolean>(false);

    // On mount, read previous session flag and check current position immediately
    React.useEffect(() => {
        try {
            firedRef.current = sessionStorage.getItem(onceKey) === "1";
        } catch { /* noop */ }

        const check = () => {
            if (!firedRef.current && reachedHalfViewport()) {
                // Mark fired before tracking to avoid race conditions
                firedRef.current = true;
                try {
                    sessionStorage.setItem(onceKey, "1");
                } catch { /* noop */ }
                track("scroll_50", { variant, ...utms });
            }
        };

        // Throttled handlers via rAF
        const onScrollOrResize = () => {
            if (tickingRef.current) return;
            tickingRef.current = true;
            requestAnimationFrame(() => {
                tickingRef.current = false;
                check();
            });
        };

        // Initial check (covers short pages and load-at-middle scenarios)
        check();

        window.addEventListener("scroll", onScrollOrResize, { passive: true });
        window.addEventListener("resize", onScrollOrResize);
        return () => {
            window.removeEventListener("scroll", onScrollOrResize);
            window.removeEventListener("resize", onScrollOrResize);
        };
    }, [onceKey, utms, variant]);

    return null;
}