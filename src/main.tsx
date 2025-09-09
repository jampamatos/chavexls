/** Application entry point with routing */
import React from "react";
import ReactDom from "react-dom/client";
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

// function Terms() {
//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h1 className="text-2xl font-bold mb-2">Termos do Beta (preview)</h1>
//       <p>Sem SLA/garantias; limites de uso; retenção de dados de 48 horas; “apagar agora” no MVP.</p>
//     </div>
//   )
// }

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
    </BrowserRouter>
  </React.StrictMode>
)
