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
          <span className="shell__mark" aria-hidden="true" />
          <span className="shell__brand-text">
            <span className="shell__brand-line">Career Compass · КНЕУ КІСіТ</span>
            <span className="shell__brand-sub">обери свій IT-шлях</span>
          </span>
        </div>
        <div className="shell__meta" aria-hidden="true">
          <span className="shell__meta-dot" />
          <span>сесія активна</span>
        </div>
      </header>
      <main className="shell__main">{children}</main>
      <footer className="shell__footer">
        <span>не оцінка — підказка</span>
        <span className="shell__sep" aria-hidden="true">·</span>
        <span>результат орієнтовний</span>
        <span className="shell__sep" aria-hidden="true">·</span>
        <span>вступ 2026</span>
      </footer>
    </div>
  );
}
