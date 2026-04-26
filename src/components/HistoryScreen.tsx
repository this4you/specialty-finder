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
    <section className="history">
      <header className="history__header">
        <p className="eyebrow history__eyebrow">
          <button
            type="button"
            className="link-back history__back"
            onClick={onBack}
          >
            <span aria-hidden="true">←</span>
            <span>На головну</span>
          </button>
          <span className="history__sep" aria-hidden="true">
            ·
          </span>
          <span>Сесія цього вікна</span>
        </p>

        <div className="history__title-row">
          <h1 className="history__title">
            Пройдені <span className="italic">тести</span>
            <span className="history__period">.</span>
          </h1>
          <span className="history__count" aria-live="polite">
            {String(tests.length).padStart(2, '0')}
          </span>
        </div>

        <p className="history__lede">
          Список твоїх проходжень у цьому вікні браузера. Можеш відкрити
          будь-який результат знову або запустити нове опитування.
        </p>
      </header>

      {isEmpty ? (
        <div className="history__empty">
          <p className="history__empty-title">
            Ще <span className="italic">жодного</span> проходження.
          </p>
          <p className="history__empty-text">
            Заверши опитування — і воно з’явиться тут.
          </p>
          <button
            type="button"
            className="btn btn--primary"
            onClick={onStartNew}
          >
            <span>Почати опитування</span>
            <span className="btn__arrow" aria-hidden="true">
              →
            </span>
          </button>
        </div>
      ) : (
        <ul className="history__list">
          {tests.map((test, i) => {
            const primary = SPECIALTIES[test.primary];
            const isTie = test.ties.length > 1;
            return (
              <li
                key={test.id}
                className="history__item"
                style={{
                  ['--accent' as string]: `var(${primary.accentVar})`,
                }}
              >
                <button
                  type="button"
                  className="history__btn"
                  onClick={() => onView(test)}
                >
                  <span className="history__num">
                    {String(tests.length - i).padStart(2, '0')}
                  </span>
                  <span className="history__body">
                    <span className="history__when">
                      {formatCompletedAt(test.completedAt)}
                    </span>
                    <span className="history__name">
                      {isTie ? (
                        <>
                          <span className="italic">збіг кількох напрямів</span>
                          <span className="history__tie-list">
                            {' · '}
                            {test.ties
                              .map((id) => SPECIALTIES[id].englishName)
                              .join(' / ')}
                          </span>
                        </>
                      ) : (
                        <span className="italic">{primary.name}</span>
                      )}
                    </span>
                  </span>
                  <span className="history__arrow" aria-hidden="true">
                    →
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <footer className="history__footer">
        <button
          type="button"
          className="btn btn--primary"
          onClick={onStartNew}
        >
          <span>Нове опитування</span>
          <span className="btn__arrow" aria-hidden="true">
            →
          </span>
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
      </footer>
    </section>
  );
}
