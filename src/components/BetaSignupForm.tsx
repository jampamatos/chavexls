import { useState } from 'react';
import { trackEvent } from '../lib/analytics';

type Props = { variant: "A" | "B" }

export default function BetaSignupForm({ variant }: Props) {
    const [submitted, setSubmitted] = useState(false)

    function encode(data: Record<string, string>) {
        return Object.keys(data)
            .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
            .join("&")
    }

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const form = e.currentTarget
        const formData = new FormData(form)

        const payload: Record<string, string> = {
            "form-name": "beta-signup",
            name: String(formData.get("name") || ""),
            email: String(formData.get("email") || ""),
            profile: String(formData.get("profile") || ""),
            monthlyVolume: String(formData.get("monthlyVolume") || ""),
            acceptedBetaTerms: formData.get("acceptedBetaTerms") ? "yes" : "no",
            variant,
        }

        try {
            await fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: encode(payload),
            })
            trackEvent("beta_signup", { variant })
            setSubmitted(true)
            form.reset()
        } catch {
            alert("Falha no envio. Por favor, tente novamente.")
        }
    }

    if (submitted) return <p className="mt-4">Obrigado! Seu pedido de acesso está na fila.</p>

    return (
        <form
          id="signup"
          name="beta-signup"
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={onSubmit}
          className="max-w-xl mx-auto space-y-3"
        >
            <input type="hidden" name="form-name" value="beta-signup" />
            <input type="hidden" name="variant" value={variant} />
            <p className="hidden"><label>Favor não preencher: <input name="bot-field" /></label></p>

            <div>
                <label className="block text-sm font-medium mb-1">Nome (opcional)</label>
                <input name="name" className="w-full border rounded px-3 py-2" placeholder="Maria Contábil" />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">E-mail</label>
                <input name="email" type="email" required className="w-full border rounded px-3 py-2" placeholder="seu@email.com.br" />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Perfil</label>
                <select name="profile" required className="w-full border rounded px-3 py-2">
                    <option value="">Escolha...</option>
                    <option>Contador</option>
                    <option>SMB</option>
                    <option>MEI</option>
                    <option>Outros</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Volume Mensal de XMLs</label>
                <input name="monthlyVolume" type="number" min={0} required className="w-full border rounded px-3 py-2" placeholder="10"/>
            </div>

            <label className="inline-flex items-center gap-2">
                <input name="acceptedBetaTerms" type="checkbox" required />
                <span>Concordo com os <a href="/terms" className="underline">Termos do Beta</a> (sem SLA, limites, retenção de 48h).</span>
            </label>

            <button type="submit" className="w-full bg-primary text-primary-foreground py-2 rounded-xl">
                Entrar no Beta Gratuito
            </button>
        </form>
    )
}