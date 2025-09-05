import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { trackEvent } from '../lib/analytics';

/** Props for the signup form component */
type Props = { variant: "A" | "B"; selectedPlan?: 'starter' | 'business' | '' };
/** Possible plan hints passed via query string */
type PlanHint = 'starter' | 'business' | 'founder' | '';
/** Plans the user can select */
type Plan = 'starter' | 'business' | '';

/** Format a number as BRL currency */
function formatBRL(n: number): string {
    try {
        return n.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits:2
        });
    } catch {
        return `R$ ${n.toFixed(2)}`;
    }
}

/** Pricing constants */
const PRICE_STARTER = 19.9;
const PRICE_BUSINESS = 59.9;
const FOUNDER_DISCOUNT = 0.3; // 30%

/** Beta signup form component */
export default function BetaSignupForm({ variant, selectedPlan = '' }: Props) {
    // Read ?plan_hint= from URL (starter, business, founder)
    const location = useLocation()
    const planHint: PlanHint = useMemo(() => {
        const hint = new URLSearchParams(location.search).get('plan_hint') || '';
        return hint === 'starter' || hint === 'business' || hint === 'founder' ? hint : '';
    }, [location.search]);

    // Selected plan visible to the user. If plan_hint is starter or business, preselect it.
    const [plan, setPlan] = useState<Plan>('');
    useEffect(() => {
        if (planHint === 'starter' || planHint === 'business') setPlan(planHint);
    }, [planHint]);

    // If selectedPlan prop changes (from URL param in VariantA), update plan state    
    useEffect(() => {
        if (selectedPlan === 'starter' || selectedPlan === 'business') setPlan(selectedPlan);
    }, [selectedPlan]);

    const [submitted, setSubmitted] = useState(false)
    
    // Track first real interaction (for anti-bot delay)
    const [started, setStarted] = useState(false);
    const startedAtRef = useRef<number | null>(null);

    // Optional message
    const [message, setMessage] = useState('');
    const messageLen = message.length;
    const hasPhone = /\d{8,13}/.test(message.replace(/\D/g, '')); // 8–13 digits

    // Founder pricing is shown only for Variant A
    const founderMode = variant === 'A';
    const starterDisplay = founderMode
      ? { main: PRICE_STARTER * (1 - FOUNDER_DISCOUNT), original: PRICE_STARTER }
      : { main: PRICE_STARTER, original: null as number | null};
    const businessDisplay = founderMode
      ? { main: PRICE_BUSINESS * (1 - FOUNDER_DISCOUNT), original: PRICE_BUSINESS }
      : { main: PRICE_BUSINESS, original: null as number | null};

    /** Encode object to x-www-form-urlencoded for Netlify */
    function encode(data: Record<string, string>): string {
        return Object.keys(data)
            .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
            .join("&")
    }

    /** Track form_start once on first user focus */
    function handleFirstFocus(): void {
        if(!started) {
            setStarted(true);
            startedAtRef.current = Date.now();
            trackEvent('form_start', { variant });
        }
    }

    /** Handle plan selection changes and track analytics */
    function handlePlanChange(next: Plan): void {
        if (next != plan) {
            setPlan(next);
            if (next) trackEvent('plan-select-change', { variant, plan: next });
        }
    }

    /** Submit the form and send analytics events */
    async function onSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault()

        // Anti-bot: require 3s since first interaction
        const now = Date.now()
        if (startedAtRef.current && now - startedAtRef.current < 3000) {
            alert('Por favor, revise e envie novamente em alguns segundos.');
            return;
        }

        const form = e.currentTarget
        const formData = new FormData(form)

        const profile = String(formData.get('profile') || '');
        const volume = String(formData.get('monthlyVolume') || '');
        const accepted = formData.get('acceptedBetaTerms') ? 'yes' : 'no';
        const selectedPlanValue = String(formData.get('plan') || '');
        const messageValue = String(formData.get('message') || '');

        // Build Netlify payload
        const payload: Record<string, string> = {
            "form-name": "beta-signup",
            name: String(formData.get("name") || ""),
            email: String(formData.get("email") || ""),
            profile,
            monthlyVolume: volume,
            acceptedBetaTerms: accepted,
            variant,
            plan: selectedPlanValue,
            plan_hint: planHint,
            message: messageValue,
        };

        try {
            await fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: encode(payload),
            });

            // GA: DO NOT send the message text, only derived metrics
            trackEvent('lead_submit', {
                variant,
                profile,
                volume,
                plan_hint: planHint,
                message_len: Math.min(messageLen, 500), // max 500 chars
                has_phone: hasPhone,
            }); 
            // Mark conversion
            trackEvent('beta_signup', {
                variant,
                profile,
                volume,
                plan_hint: planHint,
                message_len: Math.min(messageLen, 500), // max 500 chars
                has_phone: hasPhone,
            });

            setSubmitted(true)
            form.reset()
            setMessage('');
        } catch {
            alert("Falha no envio. Por favor, tente novamente.")
        }
    }

    if (submitted) {
        return (
            <p className="mt-4 text-sm" role="status" aria-live="polite">
                Obrigado! Enviaremos seu convite do Beta por e-mail. Você também garantiu o{' '}
                <strong>preço fundador (-30% por 12 meses)</strong>.
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
            {/* Honeypot */}
            <p className="hidden"><label>Favor não preencher: <input name="bot-field" /></label></p>

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
                        <div className="flex item-center justify-between gap-3">
                            <div>
                                <div className="font-semibold">Starter</div>
                                <div className="text-xs text-muted-foreground">até 100 XML/mês</div>
                            </div>
                            <div className="text-right">
                                <div className={`text-base font-bold ${founderMode ? 'text-emerald-700' : ''}`}>
                                    {formatBRL(Number((starterDisplay.main).toFixed(2)))}
                                </div>
                                {founderMode ? (
                                    <div className="text-[10px text-muted-foreground line-through">
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
                      <div className="flex item-center justify-between gap-3">
                        <div>
                            <div className="font-semibold">Business</div>
                            <div className="text-xs text-muted-foreground">até 1.000 XML/mês</div>
                        </div>
                        <div className="text-right">
                            <div className={`text-base font-bold ${founderMode ? 'text-emerald-700' : ''}`}>
                                {formatBRL(Number((businessDisplay.main).toFixed(2)))}
                            </div>
                            {founderMode ? (
                                <div className="text-[10px text-muted-foreground line-through">
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
                <label htmlFor="montlhyVolume" className="block text-sm font-medium mb-1">Volume Mensal de XMLs</label>
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
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Mensagem (opcional)
                </label>
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
                <span>Concordo com os <a href="/terms" className="underline">Termos do Beta</a>.</span>
            </label>

            <button type="submit" className="w-full bg-primary text-primary-foreground py-2 rounded-xl">
                Entrar no Beta Gratuito
            </button>
        </form>
    )
}