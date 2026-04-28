import { useMemo, useState } from 'react';
import './QrScreen.css';

interface Props {
  onBack: () => void;
}

export function QrScreen({ onBack }: Props) {
  const homeUrl = useMemo(
    () => window.location.origin + window.location.pathname,
    [],
  );

  const qrSrc = useMemo(
    () =>
      `https://api.qrserver.com/v1/create-qr-code/?size=600x600&margin=16&data=${encodeURIComponent(
        homeUrl,
      )}`,
    [homeUrl],
  );

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(homeUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="bento qr">
      {/* === Hero === */}
      <article
        className="cell cell--c4 cell--strong qr__hero"
        style={{ animationDelay: '0ms' }}
      >
        <div className="qr__hero-bg" aria-hidden="true" />

        <div className="qr__hero-top">
          <button
            type="button"
            className="qr__back"
            onClick={onBack}
          >
            <span aria-hidden="true">←</span>
            <span>На головну</span>
          </button>
          <span className="eyebrow qr__tag">
            <span className="qr__tag-dot" /> поділись із другом
          </span>
        </div>

        <h1 className="qr__title">
          Скануй —{' '}
          <span className="gradient-text italic">і поділись</span>
        </h1>

        <p className="qr__lede">
          Покажи цей QR-код однокласнику чи другу — він відкриє цю саму
          сторінку у себе на телефоні й зможе пройти опитування.
        </p>

        <div className="qr__url">
          <span className="eyebrow qr__url-label">посилання</span>
          <code className="qr__url-text">{homeUrl}</code>
          <button
            type="button"
            className="qr__copy"
            onClick={handleCopy}
          >
            {copied ? 'скопійовано ✓' : 'скопіювати'}
          </button>
        </div>
      </article>

      {/* === QR card === */}
      <article
        className="cell cell--c2 qr__card"
        style={{ animationDelay: '120ms' }}
      >
        <div className="qr__frame">
          <img
            className="qr__img"
            src={qrSrc}
            alt={`QR-код, що веде на ${homeUrl}`}
            width={600}
            height={600}
          />
        </div>
        <p className="qr__hint italic">
          наведи камеру телефону на код
        </p>
      </article>
    </section>
  );
}
