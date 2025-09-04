import * as React from 'react';

type SecurityLGPDProps = {
    /** Section title (default: "Segurança e LGPD") */
    title?: string;
    /** Main paragraph under the title (passable JSX).
     * If ommited, uses a default copy.
     */
    description?: React.ReactNode;
    /** Small note line below the main paragraph */
    note?: React.ReactNode;
    /** Optional list of small badges (chips) for quick highlights */
    badges?: string[];
    /** Section id for deep-linking (default: "lgpd") */
    id?: string;
    /** Extra classes for outer container (spacing is usually handled by the page) */
    className?: string;
    /** Optional callback you can use for analytics (fires on mount) */
    onMount?(): void;
};

/** Inline icon (no extra deps) */
function ShieldIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
            <path 
              fill="currentColor"
              d="M12 2 4 5v6c0 5 3.4 9.74 8 11 4.6-1.26 8-6 8-11V5l-8-3Zm0 18c-3.31-1.02-6-4.94-6-9.01V6.3l6-2.25 6 2.25v4.69C18 15.06 15.31 18 12 20Zm-1-5.59L8.91 13.3l-1.41 1.41L11 18.22l5.5-5.5-1.41-1.41L11 14.41Z"
            />
        </svg>
    );

}

/** Default copy aligned to our LD DoD */
const DEFAULT_DESC = (
    <>
      Seus arquivos expiram automaticamente em <strong>48h</strong> e você pode <strong>“Apagar agora”</strong> a qualquer momento.
      Tráfego criptografado (<strong>HTTPS</strong>). Não mantemos dados sensíveis em logs.
    </>
);

const DEFAULT_NOTE = <>Conformidade total com a LGPD.</>;

const DEFAULT_BADGES = [
    'Expiração autompatica em 48 horas',
    '"Apagar agora" a qualquer momento',
    'HTTPS em trânsito',
];

export default function SecurityLGPD({
    title = 'Segurança & LGPD',
    description = DEFAULT_DESC,
    note = DEFAULT_NOTE,
    badges = DEFAULT_BADGES,
    id = 'lgpd',
    className = '',
    onMount,
}: SecurityLGPDProps) {
    React.useEffect(() => {
        onMount?.();
    }, [onMount]);

    return (
        <section id={id} aria-labelledby={`${id}-heading`} className={className}>
            <div className="rounded-3xl border bg-white p-8 md:p-10 shadow-sm">
                <div className="flex item-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                        <ShieldIcon className="w-6 h-6" />
                    </div>

                    <div className="min-w-0">
                        <h2
                          id={`${id}-heading`}
                          className="text-2xl font-bold mb-2"
                          style={{ color: 'var(--brand-navy)' }}
                        >
                            {title}
                        </h2>

                        <p className="text-muted-foreground">{description}</p>

                        {note ? (
                            <p className="mt-3 text-sm text-muted-foreground">{note}</p>
                        ) : null}

                        {badges?. length ? (
                            <div className="mt-4 flex flwx-wrap items-center gap-2 text-xs">
                                {badges.map((b, i) => (
                                    <span 
                                      key={`${id}-badge-${i}`} 
                                      className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 px-2.5 py-1 border border-emerald-100"
                                    >
                                        {b}
                                    </span>
                                ))}
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </section>
    );
}