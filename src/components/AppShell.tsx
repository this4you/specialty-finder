import type { ReactNode } from 'react';
import './AppShell.css';

interface Props {
  children: ReactNode;
}

export function AppShell({ children }: Props) {
  return (
    <div className="shell">
      <header className="shell__header">
        <div className="shell__brand">
          <span className="shell__mark" aria-hidden="true">
            ✻
          </span>
          <span className="shell__brand-text">
            <span className="shell__brand-line">КНЕУ · Коледж інформаційних систем</span>
            <span className="shell__brand-sub">Помічник у виборі IT-спеціальності</span>
          </span>
        </div>
        <div className="shell__meta eyebrow" aria-hidden="true">
          вступ · 2026
        </div>
      </header>
      <main className="shell__main">{children}</main>
      <footer className="shell__footer eyebrow">
        <span>не оцінка — підказка</span>
        <span className="shell__sep" aria-hidden="true">
          —
        </span>
        <span>результат орієнтовний</span>
      </footer>
    </div>
  );
}
