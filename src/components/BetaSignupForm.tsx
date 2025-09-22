import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { formatBRL } from '../lib/utils';
import { DEFAULT_FOUNDER_DISCOUNT, PRICE_BUSINESS, PRICE_STARTER } from '../lib/pricing';
import { useBetaSignupForm } from '../hooks/useBetaSignupForm';

// Centralized microcopy
import {
  formLabels,
  formPlaceholders,
  formHints,
  cta,
  a11y,
  errors,
} from '../copy/form';

/** Props for the signup form component */
type Props = { variant: "A" | "B"; selectedPlan?: 'starter' | 'business' | '' };
/** Possible plan hints passed via query string */
type PlanHint = 'starter' | 'business' | 'founder' | '';
// plan type moved to hook

/** Pricing constants */
const FOUNDER_DISCOUNT = DEFAULT_FOUNDER_DISCOUNT; // 30%

/** Beta signup form component */
export default function BetaSignupForm({ variant, selectedPlan = '' }: Props) {
  // Stable lead id within the tab/session (used by webhook/CRM)
  const LEAD_ID_KEY = 'chavexls_lead_id';
  const leadId = useMemo(() => {
    try {
      const existing = sessionStorage.getItem(LEAD_ID_KEY);
      if (existing) return existing;
      const id = `lead_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
      sessionStorage.setItem(LEAD_ID_KEY, id);
      return id;
    } catch {
      // fallback if sessionStorage is unavailable
      return `lead_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
    }
  }, []);
  // Best-effort user agent (useful for support; not PII-sensitive by design)
  const userAgent = useMemo(() => {
    try {
      return navigator.userAgent || '';
    } catch {
      return '';
    }
  }, []);
  // Read ?plan_hint= from URL (starter, business, founder)
  const location = useLocation();
  const planHint: PlanHint = useMemo(() => {
    const hint = new URLSearchParams(location.search).get('plan_hint') || '';
    return hint === 'starter' || hint === 'business' || hint === 'founder' ? hint : '';
  }, [location.search]);

  const {
    plan,
    submitted,
    message,
    setMessage,
    planError,
    utms,
    cid,
    handleFirstFocus,
    handlePlanChange,
    onSubmit,
    sending,
    error,
  } = useBetaSignupForm({ variant, planHint, selectedPlanProp: selectedPlan });

  const planErrorId = planError ? `plan-error-${cid.replace(/[^a-zA-Z0-9_-]/g, '-')}` : undefined;

  // Founder pricing is shown only for Variant A
  const founderMode = variant === 'A';
  const starterDisplay = founderMode
    ? { main: PRICE_STARTER * (1 - FOUNDER_DISCOUNT), original: PRICE_STARTER }
    : { main: PRICE_STARTER, original: null as number | null };
  const businessDisplay = founderMode
    ? { main: PRICE_BUSINESS * (1 - FOUNDER_DISCOUNT), original: PRICE_BUSINESS }
    : { main: PRICE_BUSINESS, original: null as number | null };

    // Show thank you message if already submitted
  if (submitted) {
    return (
      <p className="mt-4 text-sm" role="status" aria-live="polite" aria-label={a11y.statusRegionLabel}>
        Obrigado! Enviaremos seu convite do Beta por e-mail.
        {founderMode ? (
          <>
            {' '}Você também garantiu o <strong>preço fundador (-30% por 12 meses)</strong>.
          </>
        ) : null}
      </p>
    );
  }

  return (
    <form
      id="signup"
      name="beta-signup"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onFocusCapture={handleFirstFocus}
      onSubmit={onSubmit}
      className="max-w-xl mx-auto space-y-3"
      aria-describedby={planErrorId}
    >
      {/* Netlify hidden fields */}
      <input type="hidden" name="form-name" value="beta-signup" />
      <input type="hidden" name="variant" value={variant} />
      <input type="hidden" name="plan_hint" value={planHint} />
      <input type="hidden" name="cid" value={cid} />
      {/* Hidden fields for webhook/CRM */}
      <input type="hidden" name="lead_id" value={leadId} />
      <input type="hidden" name="user_agent" value={userAgent} />
      {/* UTM hidden fields (only rendered if present) */}
      {Object.keys(utms).map((k) =>
        (utms as any)[k] ? <input key={k} type="hidden" name={k} value={(utms as any)[k]} /> : null
      )}
      {/* Honeypot */}
      <p className="hidden">
        <label>
          Favor não preencher: <input name="bot-field" />
        </label>
      </p>

      {/* Visible selected preferred plan */}
      <fieldset
        className={`border rounded-2xl p-3 ${planError ? 'border-red-500' : ''}`}
        aria-describedby={planErrorId}
      >
        <legend className="px-1 text-sm font-medium">Plano preferido</legend>

        {/* Founder badge if came from founder CTA */}
        {planHint === 'founder' && (
          <p className="mb-2 inline-flex items-center gap-2 rounded-lg bg-emerald-50 text-emerald-700 px-2 py-1 text-xs border border-emerald-100">
            Preço fundador garantido (-30% por 12 meses)
          </p>
        )}

        <div className="grid md:grid-cols-2 gap-3">
          {/* Starter card */}
          <label
            className={`cursor-pointer rounded-xl border p-3 transition-all hover:-translate-y-0.5 hover:shadow-sm ${
              plan === 'starter' ? 'ring-2 ring-blue-400 border-blue-400 bg-blue-50/50' : 'bg-white'
            }`}
          >
            <input
              type="radio"
              name="plan"
              value="starter"
              checked={plan === 'starter'}
              onChange={() => handlePlanChange('starter')}
              className="sr-only"
              aria-invalid={planError ? true : undefined}
              aria-describedby={planErrorId}
            />
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="font-semibold">Starter</div>
                <div className="text-xs text-muted-foreground">até 100 XML/mês</div>
              </div>
              <div className="text-right">
                <div className={`text-base font-bold ${founderMode ? 'text-emerald-700' : ''}`}>
                  {formatBRL(Number(starterDisplay.main.toFixed(2)))}
                </div>
                {founderMode ? (
                  <div className="text-[10px] text-muted-foreground line-through">
                    {formatBRL(PRICE_STARTER)}
                  </div>
                ) : (
                  <div className="text-[10px] text-muted-foreground">/ mês</div>
                )}
              </div>
            </div>
          </label>

          {/* Business card */}
          <label
            className={`cursor-pointer rounded-xl border p-3 transition-all hover:-translate-y-0.5 hover:shadow-sm ${
              plan === 'business' ? 'ring-2 ring-blue-400 border-blue-400 bg-blue-50/50' : 'bg-white'
            }`}
          >
            <input
              type="radio"
              name="plan"
              value="business"
              checked={plan === 'business'}
              onChange={() => handlePlanChange('business')}
              className="sr-only"
              aria-invalid={planError ? true : undefined}
              aria-describedby={planErrorId}
            />
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="font-semibold">Business</div>
                <div className="text-xs text-muted-foreground">até 1.000 XML/mês</div>
              </div>
              <div className="text-right">
                <div className={`text-base font-bold ${founderMode ? 'text-emerald-700' : ''}`}>
                  {formatBRL(Number(businessDisplay.main.toFixed(2)))}
                </div>
                {founderMode ? (
                  <div className="text-[10px] text-muted-foreground line-through">
                    {formatBRL(PRICE_BUSINESS)}
                  </div>
                ) : (
                  <div className="text-[10px] text-muted-foreground">/ mês</div>
                )}
              </div>
            </div>
          </label>
        </div>
      </fieldset>

      { /* Plan error (alert region) */}
      {planError ? (
        <p id={planErrorId} className="mt-1 text-sm text-red-600" role="alert" aria-live="assertive" aria-label={a11y.errorRegionLabel}>
          {planError}
        </p>
      ) : null}

      { /* Name */ }
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          {formLabels.name} <span className="sr-only">{a11y.requiredMark}</span>
        </label>
        <input 
          id="name" 
          name="name" 
          className="w-full border rounded px-3 py-2" 
          placeholder={formPlaceholders.name} 
          autoComplete="name"
        />
      </div>

      { /* Email */ }
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          {formLabels.email} <span className="text-red-600">*</span>
        </label>
        <input 
          id="email" 
          name="email" 
          type="email" 
          required 
          className="w-full border rounded px-3 py-2" 
          placeholder={formPlaceholders.email} 
          autoComplete="email"
          aria-describedby="email-hint"
        />
        <p id="email-hint" className="mt-1 text-xs text-muted-foreground">
          {formHints.email}
        </p>
      </div>

      { /* Profile */ }
      <div>
        <label htmlFor="profile" className="block text-sm font-medium mb-1">
          {formLabels.profile} <span className="text-red-600">*</span>
        </label>
        <select 
          id="profile" 
          name="profile" 
          required 
          className="w-full border rounded px-3 py-2"
          aria-describedby="profile-hint"
          defaultValue=""
        >
          <option value="" disabled>Escolha...</option>
          <option>Fiscal</option>
          <option>Contábil</option>
          <option>Compras</option>
          <option>Empresário(a) / SMB</option>
          <option>MEI</option>
          <option>Outro</option>
        </select>
      </div>

      { /* Monthly volume */ }
      <div>
        <label htmlFor="monthlyVolume" className="block text-sm font-medium mb-1">
          {formLabels.monthlyVolume} <span className="text-red-600">*</span>
        </label>
        <select 
          id="monthlyVolume" 
          name="monthlyVolume" 
          required 
          className="w-full border rounded px-3 py-2"
          aria-describedby="volume-hint"
          defaultValue=""
        >
          <option value="" disabled>Escolha...</option>
          <option value="10">Até 10</option>
          <option value="50">Até 50</option>
          <option value="100">Até 100</option>
          <option value="500">Até 500</option>
          <option value="1000">Até 1.000</option>
          <option value="5000">Mais de 1.000</option>
        </select>
        <p id="volume-hint" className="mt-1 text-xs text-muted-foreground">
          {formHints.monthlyVolume}
        </p>
      </div>

      { /* Message */ }
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1">{formLabels.message}</label>
        <textarea
          id="message"
          name="message"
          rows={3}
          maxLength={500}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={formPlaceholders.message}
          className="w-full border rounded px-3 py-2"
          aria-describedby="message-hint message-count"
        />
        <div className="mt-1 flex items-center justify-between">
          <p id="message-hint" className="text-xs text-muted-foreground">
            Não compartilhe dados sensíveis (senhas, chaves, etc.).
          </p>
          <span className="text-xs text-muted-foreground">{message.length}/500</span>
        </div>
      </div>

      { /* Consent */ }
      <label className="inline-flex items-center gap-2">
        <input name="acceptedBetaTerms" type="checkbox" required aria-describedby="consent-hint" />
        <span>
          Li e aceito os {' '}
          <a href="/terms" target="_blank" rel="noopener" className="underline">Termos do Beta</a>
          {' '}e a{' '}
          <a href="/privacy" target="_blank" rel="noopener" className="underline">Política de Privacidade</a>.
        </span>
      </label>
      <p id="consent-hint" className="text-xs text-muted-foreground -mt-1">
        {formHints.consent}
      </p>

      { /* Network/server error */ }
      {error ? (
        <p role="alert" aria-live="assertive" className="text-sm text-red-600">
          {errors[error]}
        </p>
      ) : null}

      { /* Submit button */ }
      <button 
        type="submit" 
        disabled={sending}
        className="w-full bg-[var(--brand-navy)] text-white py-2 rounded-xl hover:opacity-95 shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {sending ? 'Enviando...' : cta(variant)}
      </button>
    </form>
  );
}
