import { SPECIALTIES, SPECIALTY_ORDER } from '../data/specialties';
import type { ScoringResult } from '../logic/calculateResult';
import './ResultCard.css';

interface Props {
  result: ScoringResult;
  onRestart: () => void;
  completedCount: number;
  origin: 'fresh' | 'history';
  onOpenHistory: () => void;
}

export function ResultCard({
  result,
  onRestart,
  completedCount,
  origin,
  onOpenHistory,
}: Props) {
  const primary = SPECIALTIES[result.primary];
  const isTie = result.ties.length > 1;
  const tieSpecialties = result.ties.map((id) => SPECIALTIES[id]);
  const total = result.total || 1;

  return (
    <section
      className={`bento r r--${primary.id}`}
      style={{
        ['--accent' as string]: `var(${primary.accentVar})`,
        ['--accent-soft' as string]: `var(${primary.accentSoftVar})`,
        ['--accent-deep' as string]: `var(--${primary.id}-deep)`,
        ['--accent-from' as string]: `var(--${primary.id}-from)`,
        ['--accent-to' as string]: `var(--${primary.id}-to)`,
      }}
    >
      {/* === Hero (4x2) === */}
      <article
        className="cell cell--c4 cell--r2 r__hero"
        style={{ animationDelay: '0ms' }}
      >
        <div className="r__hero-bg" aria-hidden="true">
          <span className="r__orb r__orb--1" />
          <span className="r__orb r__orb--2" />
        </div>

        <p className="eyebrow r__kicker">
          <span className="r__pulse" aria-hidden="true" />
          {isTie ? 'Кілька напрямів збіглися' : 'Тобі може підійти'}
          <span className="r__kicker-sep" aria-hidden="true">·</span>
          <span className="r__kicker-tag">
            {origin === 'history' ? 'з історії' : 'збережено в сесії'}
          </span>
        </p>

        <h1 className="r__title">
          {isTie ? (
            <>
              Зацікавлення вказують
              <br />
              <span className="italic">на кілька напрямів</span>
              <span className="r__period">.</span>
            </>
          ) : (
            <>
              <span className="italic">{primary.name.split(' ')[0]}</span>
              <br />
              {primary.name.split(' ').slice(1).join(' ')}
              <span className="r__period">.</span>
            </>
          )}
        </h1>

        <p className="r__tagline">{primary.tagline}</p>
      </article>

      {/* === Scores card (2x1) === */}
      <article
        className="cell cell--c2 r__scores"
        style={{ animationDelay: '80ms' }}
      >
        <p className="eyebrow">Розподіл балів</p>
        <ul className="scores">
          {SPECIALTY_ORDER.map((id) => {
            const s = SPECIALTIES[id];
            const value = result.scores[id];
            const pct = Math.round((value / total) * 100);
            const isWinner = result.ties.includes(id);
            return (
              <li
                key={id}
                className={`score ${isWinner ? 'is-winner' : ''}`}
                style={{
                  ['--row-deep' as string]: `var(--${id}-deep)`,
                  ['--row-from' as string]: `var(--${id}-from)`,
                  ['--row-to' as string]: `var(--${id}-to)`,
                }}
              >
                <div className="score__top">
                  <span className="score__name">{s.englishName}</span>
                  <span className="score__pct">{pct}%</span>
                </div>
                <div className="score__bar">
                  <div
                    className="score__fill"
                    style={{ transform: `scaleX(${value / total})` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </article>

      {/* === Department link (2x1) === */}
      <a
        className="cell cell--c2 cell--ink r__link"
        href={primary.departmentUrl}
        target="_blank"
        rel="noreferrer noopener"
        style={{ animationDelay: '160ms' }}
      >
        <p className="eyebrow r__link-kicker">Сторінка кафедри</p>
        <p className="r__link-name italic">{primary.departmentName}</p>
        <span className="r__link-foot">
          <span>kisit.kneu.edu.ua</span>
          <span className="r__link-arrow" aria-hidden="true">↗</span>
        </span>
      </a>

      {/* === Description (3x1) === */}
      <article
        className="cell cell--c3 r__desc"
        style={{ animationDelay: '220ms' }}
      >
        <p className="eyebrow">Чому це може підійти</p>
        <p className="r__desc-text">{primary.description}</p>
      </article>

      {/* === Topics (3x1) === */}
      <article
        className="cell cell--c3 r__topics"
        style={{ animationDelay: '280ms' }}
      >
        <p className="eyebrow">Що ти будеш вивчати</p>
        <ul className="topics">
          {primary.studyTopics.map((topic, i) => (
            <li
              key={topic}
              className="topic"
              style={{ animationDelay: `${i * 50 + 320}ms` }}
            >
              <span className="topic__num">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span>{topic}</span>
            </li>
          ))}
        </ul>
      </article>

      {/* === Careers section header (full) === */}
      <header
        className="cell cell--c6 r__careers-head"
        style={{ animationDelay: '340ms' }}
      >
        <p className="eyebrow">Куди далі</p>
        <h2 className="r__careers-title">
          Ким ти зможеш <span className="italic">працювати</span>
          <span className="r__careers-period">.</span>
        </h2>
        <p className="r__careers-lede">
          Приклади ролей, у яких найчастіше починають кар’єру випускники цього
          напряму. Це орієнтир, а не вичерпний список.
        </p>
      </header>

      {/* === Career cards (3x1 each, 2 per row) === */}
      {primary.careerPaths.map((path, i) => (
        <article
          key={path.title}
          className="cell cell--c3 career"
          style={{ animationDelay: `${380 + i * 60}ms` }}
        >
          <div className="career__bg" aria-hidden="true" />
          <span className="career__num">
            {String(i + 1).padStart(2, '0')}
          </span>
          <h3 className="career__title italic">{path.title}</h3>
          <p className="career__desc">{path.description}</p>
        </article>
      ))}

      {/* === Tie info (full, when applicable) === */}
      {isTie && (
        <article
          className="cell cell--c6 r__tie"
          style={{ animationDelay: '420ms' }}
        >
          <p className="eyebrow">Близькі напрями</p>
          <p className="r__tie-text">
            Тебе можуть зацікавити одразу:{' '}
            {tieSpecialties.map((s, i) => (
              <span key={s.id}>
                <span className="italic">{s.name}</span>
                {i < tieSpecialties.length - 1 ? ', ' : ''}
              </span>
            ))}
            . Глянь на обидві кафедри та обирай те, що ближче.
          </p>
          <ul className="r__tie-links">
            {tieSpecialties.map((s) => (
              <li key={s.id}>
                <a
                  href={s.departmentUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="r__tie-link"
                  style={{
                    ['--row-deep' as string]: `var(--${s.id}-deep)`,
                  }}
                >
                  <span>{s.englishName}</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </article>
      )}

      {/* === Footer cell (full) === */}
      <footer
        className="cell cell--c6 cell--soft r__footer"
        style={{ animationDelay: '460ms' }}
      >
        <div className="r__actions">
          <button type="button" className="btn btn--ghost" onClick={onRestart}>
            <span aria-hidden="true">↺</span>
            <span>Пройти ще раз</span>
          </button>
          {completedCount > 0 && (
            <button
              type="button"
              className="r__history-link"
              onClick={onOpenHistory}
            >
              <span className="r__history-count">
                {String(completedCount).padStart(2, '0')}
              </span>
              <span className="r__history-text italic">
                {completedCount === 1
                  ? 'проходження в історії'
                  : 'проходжень в історії'}
              </span>
              <span aria-hidden="true">→</span>
            </button>
          )}
        </div>
        <p className="r__disclaimer">
          результат — рекомендація, а не вирок
        </p>
      </footer>
    </section>
  );
}
