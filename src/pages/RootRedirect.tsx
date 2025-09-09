import React from "react";
import { useLocation } from "react-router-dom";
import { captureUtms } from "../lib/utm";

// Lazy-load to avoid shipping both variants at once
const VariantA = React.lazy(() => import("./VariantA"));
const VariantB = React.lazy(() => import("./VariantB"));

const VAR_KEY = "chavexls_variant";

function resolveVariant(search: string): "A" | "B" {
  const params = new URLSearchParams(search || "");
  const forced = params.get("v");

  // 1) Query override (?v=a|b)
  if (forced && (forced.toLowerCase() === "a" || forced.toLowerCase() === "b")) {
    const v = forced.toUpperCase() as "A" | "B";
    try {
      localStorage.setItem(VAR_KEY, v);
    } catch {}
    return v;
  }

  // 2) Sticky from localStorage
  try {
    const sticky = localStorage.getItem(VAR_KEY);
    if (sticky === "A" || sticky === "B") return sticky;
  } catch {}

  // 3) Random 50/50 and persist
  const random = Math.random() < 0.5 ? "A" : "B";
  try {
    localStorage.setItem(VAR_KEY, random);
  } catch {}
  return random;
}

// moved to lib/utm.ts

export default function RootRedirect(): React.ReactElement {
  const location = useLocation();

  // Decide variant synchronously to avoid flicker
  const variant = React.useMemo<"A" | "B">(
    () => resolveVariant(location.search),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location.search]
  );

  // Capture UTMs and clean querystring from the address bar (keep path “/”)
  React.useEffect(() => {
    captureUtms(location.search);

    if (location.search) {
      const cleanUrl = location.pathname + location.hash; // drop ?...
      try {
        window.history.replaceState({}, "", cleanUrl);
      } catch {}
    }
  }, [location.search, location.pathname, location.hash]);

  // Expose variant globally if needed by analytics later
  // @ts-expect-error attach for debugging
  window.__chavexlsVariant = variant;

  return (
    <React.Suspense
      fallback={
        // Minimal skeleton to avoid visible CLS on first paint
        <main className="min-h-screen" aria-busy="true" aria-live="polite" />
      }
    >
      {variant === "A" ? <VariantA /> : <VariantB />}
    </React.Suspense>
  );
}
