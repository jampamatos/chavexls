import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { formatBRL } from '../lib/utils';
import { DEFAULT_FOUNDER_DISCOUNT, PRICE_BUSINESS, PRICE_STARTER } from '../lib/pricing';
import { useBetaSignupForm } from '../hooks/useBetaSignupForm';

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
    utms,
    cid,
    handleFirstFocus,
    handlePlanChange,
    onSubmit,
  } = useBetaSignupForm({ variant, planHint, selectedPlanProp: selectedPlan });

  // Founder pricing is shown only for Variant A
  const founderMode = variant === 'A';
  const starterDisplay = founderMode
    ? { main: PRICE_STARTER * (1 - FOUNDER_DISCOUNT), original: PRICE_STARTER }
    : { main: PRICE_STARTER, original: null as number | null };
  const businessDisplay = founderMode
    ? { main: PRICE_BUSINESS * (1 - FOUNDER_DISCOUNT), original: PRICE_BUSINESS }
    : { main: PRICE_BUSINESS, original: null as number | null };

  // Logic moved to useBetaSignupForm

  if (submitted) {
    return (
      <p className="mt-4 text-sm" role="status" aria-live="polite">
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
      <fieldset className="border rounded-2xl p-3">
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

      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">Nome (opcional)</label>
        <input id="name" name="name" className="w-full border rounded px-3 py-2" placeholder="Maria Contábil" />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">E-mail</label>
        <input id="email" name="email" type="email" required className="w-full border rounded px-3 py-2" placeholder="seu@email.com.br" />
      </div>

      <div>
        <label htmlFor="profile" className="block text-sm font-medium mb-1">Perfil</label>
        <select id="profile" name="profile" required className="w-full border rounded px-3 py-2">
          <option value="">Escolha...</option>
          <option>Contador</option>
          <option>SMB</option>
          <option>MEI</option>
          <option>Outros</option>
        </select>
      </div>

      <div>
        <label htmlFor="monthlyVolume" className="block text-sm font-medium mb-1">Volume Mensal de XMLs</label>
        <select id="monthlyVolume" name="monthlyVolume" required className="w-full border rounded px-3 py-2">
          <option value="">Escolha...</option>
          <option value="10">Até 10</option>
          <option value="50">Até 50</option>
          <option value="100">Até 100</option>
          <option value="500">Até 500</option>
          <option value="1000">Até 1.000</option>
          <option value="5000">Mais de 1.000</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1">Mensagem (opcional)</label>
        <textarea
          id="message"
          name="message"
          rows={3}
          maxLength={500}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Escreva dúvidas, sugestões ou deixe um telefone/WhatsApp para contato."
          className="w-full border rounded px-3 py-2"
        />
        <div className="mt-1 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">Não compartilhe dados sensíveis (senhas, chaves, etc.).</p>
          <span className="text-xs text-muted-foreground">{message.length}/500</span>
        </div>
      </div>

      <label className="inline-flex items-center gap-2">
        <input name="acceptedBetaTerms" type="checkbox" required />
        <span>
          Concordo com os{' '}
          <a href="/terms" target="_blank" rel="noopener" className="underline">Termos do Beta</a>
          {' '}e{' '}
          <a href="/privacy" target="_blank" rel="noopener" className="underline">Política de Privacidade</a>.
        </span>
      </label>

      <button type="submit" className="w-full bg-primary text-primary-foreground py-2 rounded-xl">
        Entrar no Beta Gratuito
      </button>
    </form>
  );
}
