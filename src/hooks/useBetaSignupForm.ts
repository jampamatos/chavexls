import { useEffect, useMemo, useRef, useState } from 'react';
import { encodeFormUrl } from '../lib/http';
import { getClientId, track } from '../lib/analytics';
import { readStoredUtms, UTM_KEYS } from '../lib/utm';

export type Variant = 'A' | 'B';
export type Plan = 'starter' | 'business' | '';
export type PlanHint = 'starter' | 'business' | 'founder' | '';

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

  // derived
  const messageLen = message.length;
  const hasPhone = /\d{8,13}/.test(message.replace(/\D/g, ''));

  // Preselect from hint or external prop
  useEffect(() => {
    if (planHint === 'starter' || planHint === 'business') setPlan(planHint);
  }, [planHint]);
  useEffect(() => {
    if (selectedPlanProp === 'starter' || selectedPlanProp === 'business') setPlan(selectedPlanProp);
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
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    // Anti-bot minimal dwell time
    const now = Date.now();
    if (startedAtRef.current && now - startedAtRef.current < 3000) {
      alert('Por favor, revise e envie novamente em alguns segundos.');
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);

    const profile = String(formData.get('profile') || '');
    const volume = String(formData.get('monthlyVolume') || '');
    const accepted = formData.get('acceptedBetaTerms') ? 'yes' : 'no';
    const selectedPlanValue = String(formData.get('plan') || '');
    const messageValue = String(formData.get('message') || '');

    const payload: Record<string, string> = {
      'form-name': 'beta-signup',
      name: String(formData.get('name') || ''),
      email: String(formData.get('email') || ''),
      profile,
      monthlyVolume: volume,
      acceptedBetaTerms: accepted,
      variant,
      plan: selectedPlanValue,
      plan_hint: planHint,
      message: messageValue,
      cid,
    };

    for (const k of UTM_KEYS) {
      const v = (utms as any)[k];
      if (v) payload[k] = String(v);
    }

    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodeFormUrl(payload),
      });

      // Do not send message content; only derived metrics
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
      form.reset();
      setMessage('');
    } catch {
      alert('Falha no envio. Por favor, tente novamente.');
    }
  }

  return {
    // state
    plan,
    setPlan,
    submitted,
    message,
    setMessage,
    messageLen,
    hasPhone,
    // derived tracking data
    utms,
    cid,
    // handlers
    handleFirstFocus,
    handlePlanChange,
    onSubmit,
  };
}

