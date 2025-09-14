/** Application entry point with routing */
import React from "react";
import ReactDom from "react-dom/client";
import CookieConsent from "./components/CookieConsent";
import ScrollDepthTracker from "./components/ScrollDepthTracker";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GA_MEASUREMENT_ID } from "./lib/config";
import { initGA } from "./lib/analytics";

// Lazy-load route components to keep initial bundle small
const RootRedirect = React.lazy(() => import('./pages/RootRedirect'));
const VariantA = React.lazy(() => import('./pages/VariantA'));
const VariantB = React.lazy(() => import('./pages/VariantB'));
const Terms = React.lazy(() => import('./pages/Terms'));
const Privacy = React.lazy(() => import('./pages/Privacy'));
const Subprocessors = React.lazy(() => import('./pages/Subprocessors'));

import "./index.css";

/** Initialize Google Analytics */
initGA(GA_MEASUREMENT_ID);

ReactDom.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <React.Suspense fallback={<main className="min-h-screen" aria-busy="true" aria-live="polite" /> }>
        <Routes>
          <Route path="/" element={<RootRedirect /> } />
          <Route path="/a" element={<VariantA /> } />
          <Route path="/b" element={<VariantB /> } />
          <Route path="/terms" element={<Terms /> } />
          <Route path="/privacy" element={<Privacy /> } />
          <Route path="/subprocessors" element={<Subprocessors /> } />
        </Routes>
      </React.Suspense>
      {/* Global cookie banner: appears on all routes, even during lazy route loads */}
      <CookieConsent />
      {/* Global scroll depth tracker (fires once per route per session at 50%) */}
      <ScrollDepthTracker />
    </BrowserRouter>
  </React.StrictMode>
)
