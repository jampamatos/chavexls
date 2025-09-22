import { useEffect, useMemo, useRef, useState } from 'react';
import { encodeFormUrl } from '../lib/http';
import { getClientId, track } from '../lib/analytics';
import { readStoredUtms, UTM_KEYS } from '../lib/utm';

export type Variant = 'A' | 'B';
export type Plan = 'starter' | 'business' | '';
export type PlanHint = 'starter' | 'business' | 'founder' | '';

// Helpers and flags
const USE_NETLIFY_FORMS = typeof window !== 'undefined' && import.meta.env.PROD;

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

type Params = {
  variant: Variant;
  planHint: PlanHint;
  selectedPlanProp?: Plan;
};

export function useBetaSignupForm({ variant, planHint, selectedPlanProp = '' }: Params) {
  const [plan, setPlan] = useState<Plan>('');
  const [submitted, setSubmitted] = useState(false);
  const [started, setStarted] = useState(false);
  const startedAtRef = useRef<number | null>(null);

  const [message, setMessage] = useState('');
  const [planError, setPlanError] = useState('');

  // New: UI states for request lifecycle
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<'timeout' | 'tooMany' | 'network' | 'unknown' | null>(null);

  // derived
  const messageLen = message.length;
  const hasPhone = /\d{8,13}/.test(message.replace(/\D/g, ''));

  // Preselect from hint or external prop
  useEffect(() => {
    if (planHint === 'starter' || planHint === 'business') {
      setPlan(planHint);
      setPlanError('');
    }
  }, [planHint]);

  useEffect(() => {
    if (selectedPlanProp === 'starter' || selectedPlanProp === 'business') {
      setPlan(selectedPlanProp);
      setPlanError('');
    }
  }, [selectedPlanProp]);

  const utms = useMemo(() => readStoredUtms(), []);
  const { cid } = useMemo(() => getClientId(), []);

  function handleFirstFocus(): void {
    if (!started) {
      setStarted(true);
      startedAtRef.current = Date.now();
      track('form_start', { variant });
    }
  }

  function handlePlanChange(next: Plan): void {
    if (next && next !== plan) {
      setPlan(next);
      track('plan_select_change', { variant, plan: next });
    }
    if (next) setPlanError('');
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return; // prevent double submit
    
    setSending(true);
    setError(null);

    const formEl = e.currentTarget;
    const formData = new FormData(formEl);

    // Anti-bot: minimal dwell time (3s) BEFORE network
    const now = Date.now();
    if (startedAtRef.current && now - startedAtRef.current < 3000) {
      // Keep minimal notice, but without blocking with persistent error
      setSending(false);
      alert('Por favor, revise e envie novamente em alguns segundos.');
      return;
    }

    // Required: plan chosen
    const selectedPlanValue = String(formData.get('plan') || '');
    if (!selectedPlanValue) {
      setPlanError('Selecione um plano para continuar.');
      setSending(false);
      return;
    }

    // Build payload we want to keep (explicit > implicit)
    const profile = String(formData.get('profile') || '');
    const volume = String(formData.get('monthlyVolume') || '');
    const accepted = formData.get('acceptedBetaTerms') ? 'yes' : 'no';
    const messageValue = String(formData.get('message') || '');
    const name = String(formData.get('name') || '');
    const email = String(formData.get('email') || '');

    const payload: Record<string, string> = {
      'form-name': 'beta-signup',
      name,
      email,
      profile,
      monthlyVolume: volume,
      acceptedBetaTerms: accepted,
      variant,
      plan: selectedPlanValue,
      plan_hint: planHint,
      message: messageValue,
      cid,
    };

    // Include hidden fields (CRM/webhook)
    const leadId = String(formData.get('lead_id') || '');
    const userAgent = String(formData.get('user_agent') || '');
    if (leadId) payload.lead_id = leadId;
    if (userAgent) payload.user_agent = userAgent;

    // Append UTMs (if any)
    for (const k of UTM_KEYS) {
      const v = (utms as any)[k];
      if (v) payload[k] = String(v);
    }

    try {
      if (USE_NETLIFY_FORMS) {
        // Production: send to Netlify Forms
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);

        const res = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: encodeFormUrl(payload),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!res.ok) {
          if (res.status === 429) setError('tooMany');
          else if (res.status === 408 || res.status === 504) setError('timeout');
          else setError('unknown');
          return;
        }
      } else { 
        // Dev (Vite): simulate success after delay
        console.info('[DEV] Simulating POST / Netlify Forms. Payload:', payload);
        await sleep(500);
      }

      // Tracking (avoid sending message content; only derived metrics)
      const common = {
        variant,
        profile,
        volume,
        plan_hint: planHint,
        message_len: Math.min(messageLen, 500),
        has_phone: hasPhone,
        cid,
        ...(utms as Record<string, string>),
      } as const;

      track('lead_submit', common);
      track('beta_signup', common);
      
      setSubmitted(true);
      formEl.reset();
      setMessage('');
    } catch (err: any) {
      if (err?.name === 'AbortError') setError('timeout');
      else if (err instanceof TypeError) setError('network');
      else setError('unknown');

      alert('Falha no envio. Por favor, tente novamente.');
    } finally {
      setSending(false);
    }    
  };

  return {
    // state
    plan,
    setPlan,
    submitted,
    message,
    setMessage,
    messageLen,
    hasPhone,
    planError,

    // derived tracking data
    utms,
    cid,

    // handlers
    handleFirstFocus,
    handlePlanChange,
    onSubmit,

    // request lifecycle (for UI)
    sending,
    error,
  };
}
