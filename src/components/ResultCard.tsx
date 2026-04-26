import { SPECIALTIES, SPECIALTY_ORDER } from '../data/specialties';
import type { ScoringResult } from '../logic/calculateResult';
import { Compass } from './Compass';
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
        ['--accent-from' as string]: `var(--${primary.id}-from)`,
        ['--accent-mid' as string]: `var(--${primary.id}-mid)`,
        ['--accent-to' as string]: `var(--${primary.id}-to)`,
        ['--accent-glow' as string]: `var(--${primary.id}-glow)`,
      }}
    >
      {/* === Hero (4x2) — title + tagline + compass === */}
      <article
        className="cell cell--c4 cell--r2 cell--strong r__hero"
        style={{ animationDelay: '0ms' }}
      >
        <div className="r__hero-bg" aria-hidden="true" />

        <div className="r__hero-content">
          <p className="eyebrow r__kicker">
            <span className="r__kicker-dot" aria-hidden="true" />
            {isTie ? 'Кілька напрямів збіглися' : 'Тобі може підійти'}
            <span className="r__kicker-sep" aria-hidden="true">·</span>
            <span className="r__kicker-tag">
              {origin === 'history' ? 'з історії' : 'збережено'}
            </span>
          </p>

          <h1 className="r__title">
            {isTie ? (
              <>
                Зацікавлення вказують
                <br />
                <span className="r__title-italic">на кілька напрямів</span>
              </>
            ) : (
              <>
                <span className="r__title-italic">
                  {primary.name.split(' ')[0]}
                </span>
                <br />
                {primary.name.split(' ').slice(1).join(' ')}
              </>
            )}
          </h1>

          <p className="r__tagline">{primary.tagline}</p>
        </div>

        <div className="r__compass">
          <Compass
            size={220}
            pointTo={primary.id}
            locked
            showLabels={false}
          />
        </div>
      </article>

      {/* === Scores card === */}
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
                className={`score score--${id} ${isWinner ? 'is-winner' : ''}`}
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

      {/* === Department link === */}
      <a
        className="cell cell--c2 r__link"
        href={primary.departmentUrl}
        target="_blank"
        rel="noreferrer noopener"
        style={{ animationDelay: '160ms' }}
      >
        <div className="r__link-bg" aria-hidden="true" />
        <p className="eyebrow r__link-kicker">Сторінка кафедри</p>
        <p className="r__link-name italic">{primary.departmentName}</p>
        <span className="r__link-foot">
          <span>kisit.kneu.edu.ua</span>
          <span className="r__link-arrow" aria-hidden="true">↗</span>
        </span>
      </a>

      {/* === Description === */}
      <article
        className="cell cell--c3 r__desc"
        style={{ animationDelay: '220ms' }}
      >
        <p className="eyebrow">Чому це може підійти</p>
        <p className="r__desc-text">{primary.description}</p>
      </article>

      {/* === Topics === */}
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

      {/* === Careers section === */}
      <header
        className="cell cell--c6 cell--bare r__careers-head"
        style={{ animationDelay: '340ms' }}
      >
        <p className="eyebrow">Куди далі</p>
        <h2 className="r__careers-title">
          Ким ти зможеш{' '}
          <span className="r__careers-italic">працювати</span>
        </h2>
        <p className="r__careers-lede">
          Приклади ролей, у яких найчастіше починають кар’єру випускники цього
          напряму. Це орієнтир, а не вичерпний список.
        </p>
      </header>

      {primary.careerPaths.map((path, i) => (
        <article
          key={path.title}
          className="cell cell--c3 career"
          style={{ animationDelay: `${380 + i * 80}ms` }}
        >
          <div className="career__bg" aria-hidden="true" />
          <span className="career__num">
            {String(i + 1).padStart(2, '0')}
          </span>
          <h3 className="career__title italic">{path.title}</h3>
          <p className="career__desc">{path.description}</p>
        </article>
      ))}

      {/* === Tie card === */}
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
                  className={`r__tie-link r__tie-link--${s.id}`}
                >
                  <span>{s.englishName}</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </article>
      )}

      {/* === Footer === */}
      <footer
        className="cell cell--c6 r__footer"
        style={{ animationDelay: '500ms' }}
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
