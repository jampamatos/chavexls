import { Link } from 'react-router-dom';
import { track } from '../lib/analytics';

type FooterLink = {
  label: string;
  href: string;          // '/terms', '/privacy', 'mailto:...'
  external?: boolean;    // forces <a> even if it starts with '/'
};

type Props = {
  /** For GA4: footer_link_click { variant, label, href } */
  variant: 'A' | 'B';
  className?: string;
  links?: FooterLink[];
  brand?: string;        // ex.: "ChaveXLS" (default)
  showDividerTop?: boolean; // subtle top border to separate
};

export default function Footer({
  variant,
  className = '',
  brand = 'ChaveXLS',
  showDividerTop = false,
  links = [
    { label: 'Termos', href: '/terms' },
    { label: 'Privacidade', href: '/privacy' },
    { label: 'Contato', href: 'mailto:contato@chavexls.com', external: true },
  ],
}: Props) {
  const year = new Date().getFullYear();

  function handleClick(l: FooterLink) {
    // Simple and consistent tracking (without sending sensitive data)
    track('footer_link_click', { variant, label: l.label, href: l.href });
  }

  return (
    <footer
      className={[
        showDividerTop ? 'border-t' : '',
        'py-10 text-center text-sm text-muted-foreground',
        className,
      ].join(' ')}
      aria-labelledby="site-footer"
    >
      <div className="max-w-6xl mx-auto px-4">
        <nav className="flex items-center justify-center gap-4 mb-2" aria-label="Rodapé">
          {links.map((l) => {
            const isInternal = !l.external && l.href.startsWith('/');
            const isLegal = l.href === '/terms' || l.href === '/privacy';
            // For legal links, open in new tab if external (to avoid losing context)
            const target = isLegal ? '_blank' as const : undefined;
            const rel = isLegal ? 'noopener' : undefined;
            
            return isInternal ? (
              <Link
                key={l.href}
                to={l.href}
                target ={target}
                rel={rel}
                onClick={() => handleClick(l)}
                className="underline underline-offset-2 hover:opacity-80"
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.href}
                href={l.href}
                target={l.external ? '_blank' : undefined}
                rel={l.external ? 'noopener' : undefined}
                onClick={() => handleClick(l)}
                className="underline underline-offset-2 hover:opacity-80"
              >
                {l.label}
              </a>
            );
          })}
        </nav>
        <p id="site-footer">© {year} {brand}.</p>
      </div>
    </footer>
  );
}
