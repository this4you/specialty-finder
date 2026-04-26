import { SPECIALTIES, SPECIALTY_ORDER } from '../data/specialties';
import { formatCompletedAt } from '../lib/formatDateTime';
import type { CompletedTest, SpecialtyId } from '../types';
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

  // Aggregate stats: how many times each specialty was the primary
  const counts: Record<SpecialtyId, number> = { se: 0, cs: 0, ce: 0 };
  tests.forEach((t) => {
    counts[t.primary] += 1;
  });
  const dominant = (Object.entries(counts) as [SpecialtyId, number][])
    .sort((a, b) => b[1] - a[1])[0];
  const hasDominant = dominant && dominant[1] > 0;

  return (
    <section className="bento h">
      {/* === Hero === */}
      <article
        className="cell cell--c4 cell--strong h__hero"
        style={{ animationDelay: '0ms' }}
      >
        <div className="h__hero-bg" aria-hidden="true" />

        <div className="h__hero-top">
          <button
            type="button"
            className="h__back"
            onClick={onBack}
          >
            <span aria-hidden="true">←</span>
            <span>На головну</span>
          </button>
          <span className="eyebrow h__sessionTag">
            <span className="h__sessionDot" /> сесія цього вікна
          </span>
        </div>

        <h1 className="h__title">
          Пройдені{' '}
          <span className="gradient-text italic">тести</span>
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

      {/* === Big count === */}
      <article
        className="cell cell--c2 h__count"
        style={{ animationDelay: '60ms' }}
      >
        <p className="eyebrow">Усього</p>
        <p className="h__count-num gradient-text">
          {String(tests.length).padStart(2, '0')}
        </p>
        <p className="h__count-label italic">
          {tests.length === 0
            ? 'жодного проходження'
            : tests.length === 1
              ? 'результат у сесії'
              : 'результатів у сесії'}
        </p>
      </article>

      {/* === Distribution === */}
      <article
        className="cell cell--c2 h__dist"
        style={{ animationDelay: '120ms' }}
      >
        <p className="eyebrow">Розподіл напрямів</p>
        {isEmpty ? (
          <p className="h__dist-empty italic">
            Тут зʼявиться розподіл, коли пройдеш хоча б один тест.
          </p>
        ) : (
          <ul className="h__dist-list">
            {SPECIALTY_ORDER.map((id) => {
              const s = SPECIALTIES[id];
              const c = counts[id];
              const pct = tests.length === 0 ? 0 : c / tests.length;
              return (
                <li key={id} className={`h__dist-item h__dist-item--${id}`}>
                  <div className="h__dist-row">
                    <span className="h__dist-name">{s.englishName}</span>
                    <span className="h__dist-count">
                      {String(c).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="h__dist-bar">
                    <div
                      className="h__dist-fill"
                      style={{ transform: `scaleX(${pct})` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        )}
        {hasDominant && dominant[1] > 0 && (
          <p className="h__dist-foot">
            Найчастіше — <span className="italic">{SPECIALTIES[dominant[0]].englishName}</span>.
          </p>
        )}
      </article>

      {/* === Empty state === */}
      {isEmpty && (
        <article
          className="cell cell--c6 h__empty"
          style={{ animationDelay: '200ms' }}
        >
          <p className="h__empty-title">
            Ще <span className="italic">жодного</span> проходження
          </p>
          <p className="h__empty-text">
            Заверши опитування — і результат збережеться тут до кінця сесії.
          </p>
        </article>
      )}

      {/* === Test cards === */}
      {!isEmpty &&
        tests.map((test, i) => {
          const primary = SPECIALTIES[test.primary];
          const isTie = test.ties.length > 1;
          return (
            <article
              key={test.id}
              className={`cell cell--c2 h__test h__test--${primary.id}`}
              style={{ animationDelay: `${200 + i * 70}ms` }}
            >
              <div className="h__test-bg" aria-hidden="true" />
              <div className="h__test-glow" aria-hidden="true" />

              <button
                type="button"
                className="h__test-btn"
                onClick={() => onView(test)}
              >
                <div className="h__test-top">
                  <span className="h__test-num">
                    {String(tests.length - i).padStart(2, '0')}
                  </span>
                  <span className="h__test-chip">
                    <span className="h__test-chip-dot" />
                    {primary.englishName}
                  </span>
                </div>

                <div className="h__test-mid">
                  <span className="h__test-when">
                    {formatCompletedAt(test.completedAt)}
                  </span>
                  <span className="h__test-name italic">
                    {isTie ? 'збіг кількох напрямів' : primary.name}
                  </span>
                  {isTie && (
                    <span className="h__test-ties">
                      {test.ties
                        .map((id) => SPECIALTIES[id].englishName)
                        .join(' / ')}
                    </span>
                  )}
                </div>

                <span className="h__test-foot">
                  <span>відкрити результат</span>
                  <span className="h__test-arrow" aria-hidden="true">→</span>
                </span>
              </button>
            </article>
          );
        })}
    </section>
  );
}
