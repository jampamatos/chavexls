import * as React from 'react';

/** Tiny inline icons (no extra deps) */
function UploadIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
            <path fill="currentColor" d="M5 20h14v-2H5v2zm7-16-5 5h3v4h4v-4h3l-5-5z" />
        </svg>
    );
}

function CreditCardIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
            <path fill="currentColor" d="M20 4H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6c0-1.11-.89-2-2-2Zm0 14H4V10h16v8ZM4 8V6h16v2H4Z" />
        </svg>
    );
}

function DownloadIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
            <path fill="currentColor" d="M5 20h14v-2H5v2Zm7-16v8.17l3.59-3.58L17 10l-5 5-5-5 1.41-1.41L11 12.17V4h1Z" />
        </svg>
    );
}

type Step = {
    title: string;
    text: string;
    /** color token group; controls chip bg/text */
    color?: string;
    Icon?: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
};

type HowItWorksProps = {
    title?: string;
    description?: string;
    steps?: Step[];
    id?: string;
    className?: string;
}

const DEFAULT_STEPS: Step[] = [
    { title: '1. Upload', text: 'Arraste um .zip com seus XML (55/65) ou clique para selecionar.', color: 'red', Icon: UploadIcon },
    { title: '2. Processamos', text: 'Validações, tipagem fiscal e deduplicação automática por chave.', color: 'indigo', Icon: CreditCardIcon },
    { title: '3. Baixar XLSX', text: 'Planilha pronta com validações, tipagem correta e dados organizados.', color: 'emerald', Icon: DownloadIcon },
];

function colorClasses(c: Step['color']) {
    return `bg-${c}-100 text-${c}-700`
}

/** Reusable "Como funciona" section */
export default function HowItWorks({
    title = 'Como funciona',
    description = 'Conversão fiscal confiável em 3 passos simples. Multiabas tipadas e validações automáticas.',
    steps = DEFAULT_STEPS,
    id = 'hiw',
    className = '',
}: HowItWorksProps) {
    return (
        <section id={id} aria-labelledby={`${id}-heading`} className={className}>
            <h2
              id={`${id}-heading`}
              className="text-3xl font-bold text-center mb-2"
              style={{ color: 'var(--brand-navy)' }}
            >
                {title}
            </h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-8">
                {description}
            </p>

            <div className="grid md:grid-cols-3 gap-5">
                {steps.map(({ title, text, color, Icon = UploadIcon }) => (
                    <div key={title} className="rounded-2xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${colorClasses(color)}`}>
                            <Icon className="w-6 h-6" />
                        </div>
                        <h3 className="font-semibold mb-1">{title}</h3>
                        <p className="text-sm text-muted-foreground">{text}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}