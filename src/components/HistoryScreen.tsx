import { SPECIALTIES } from '../data/specialties';
import { formatCompletedAt } from '../lib/formatDateTime';
import type { CompletedTest } from '../types';
import './HistoryScreen.css';

interface Props {
  tests: CompletedTest[];
  onView: (test: CompletedTest) => void;
  onBack: () => void;
  onStartNew: () => void;
  onClear: () => void;
}

export function HistoryScreen({
  tests,
  onView,
  onBack,
  onStartNew,
  onClear,
}: Props) {
  const isEmpty = tests.length === 0;

  return (
    <section className="bento h">
      <article
        className="cell cell--c4 cell--r2 h__hero"
        style={{ animationDelay: '0ms' }}
      >
        <div className="h__hero-bg" aria-hidden="true">
          <span className="h__orb h__orb--1" />
          <span className="h__orb h__orb--2" />
        </div>

        <p className="eyebrow h__eyebrow">
          <button
            type="button"
            className="link-back h__back"
            onClick={onBack}
          >
            <span aria-hidden="true">←</span>
            <span>На головну</span>
          </button>
          <span className="h__sep" aria-hidden="true">·</span>
          <span>Сесія цього вікна</span>
        </p>

        <h1 className="h__title">
          Пройдені <span className="italic">тести</span>
          <span className="h__period">.</span>
        </h1>

        <p className="h__lede">
          Список твоїх проходжень у цьому вікні браузера. Можеш відкрити
          будь-який результат знову або запустити нове опитування.
        </p>

        <div className="h__hero-actions">
          <button type="button" className="btn" onClick={onStartNew}>
            <span>Нове опитування</span>
            <span className="btn__arrow" aria-hidden="true">→</span>
          </button>
          {!isEmpty && (
            <button
              type="button"
              className="link-danger"
              onClick={onClear}
            >
              Очистити історію
            </button>
          )}
        </div>
      </article>

      <article
        className="cell cell--c2 h__count"
        style={{ animationDelay: '60ms' }}
      >
        <p className="eyebrow">Усього</p>
        <p className="h__count-num">{String(tests.length).padStart(2, '0')}</p>
        <p className="h__count-label italic">
          {tests.length === 0
            ? 'жодного проходження'
            : tests.length === 1
              ? 'проходження в сесії'
              : 'проходжень у сесії'}
        </p>
      </article>

      <article
        className="cell cell--c2 h__legend"
        style={{ animationDelay: '120ms' }}
      >
        <p className="eyebrow">Кольори</p>
        <ul className="legend">
          <li className="legend__item">
            <span className="legend__sw" style={{ background: 'linear-gradient(135deg, var(--se-from), var(--se-to))' }} />
            <span>SE</span>
          </li>
          <li className="legend__item">
            <span className="legend__sw" style={{ background: 'linear-gradient(135deg, var(--cs-from), var(--cs-to))' }} />
            <span>CS</span>
          </li>
          <li className="legend__item">
            <span className="legend__sw" style={{ background: 'linear-gradient(135deg, var(--ce-from), var(--ce-to))' }} />
            <span>CE</span>
          </li>
        </ul>
      </article>

      {isEmpty ? (
        <article
          className="cell cell--c6 h__empty"
          style={{ animationDelay: '200ms' }}
        >
          <p className="h__empty-title">
            Ще <span className="italic">жодного</span> проходження.
          </p>
          <p className="h__empty-text">
            Заверши опитування — і воно з’явиться тут.
          </p>
        </article>
      ) : (
        tests.map((test, i) => {
          const primary = SPECIALTIES[test.primary];
          const isTie = test.ties.length > 1;
          return (
            <article
              key={test.id}
              className={`cell cell--c2 h__test h__test--${primary.id}`}
              style={{
                animationDelay: `${200 + i * 70}ms`,
                ['--accent-deep' as string]: `var(--${primary.id}-deep)`,
                ['--accent-from' as string]: `var(--${primary.id}-from)`,
                ['--accent-to' as string]: `var(--${primary.id}-to)`,
              }}
            >
              <div className="h__test-bg" aria-hidden="true" />
              <button
                type="button"
                className="h__test-btn"
                onClick={() => onView(test)}
              >
                <span className="h__test-num">
                  {String(tests.length - i).padStart(2, '0')}
                </span>
                <span className="h__test-when">
                  {formatCompletedAt(test.completedAt)}
                </span>
                <span className="h__test-name">
                  {isTie ? (
                    <span className="italic">збіг кількох напрямів</span>
                  ) : (
                    <span className="italic">{primary.name}</span>
                  )}
                </span>
                {isTie && (
                  <span className="h__test-ties">
                    {test.ties
                      .map((id) => SPECIALTIES[id].englishName)
                      .join(' / ')}
                  </span>
                )}
                <span className="h__test-foot">
                  <span>відкрити</span>
                  <span className="h__test-arrow" aria-hidden="true">→</span>
                </span>
              </button>
            </article>
          );
        })
      )}
    </section>
  );
}
