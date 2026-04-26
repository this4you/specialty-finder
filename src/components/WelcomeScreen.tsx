import { SPECIALTIES, SPECIALTY_ORDER } from '../data/specialties';
import { QUESTIONS } from '../data/questions';
import './WelcomeScreen.css';

interface Props {
  onStart: () => void;
  completedCount: number;
  onOpenHistory: () => void;
}

export function WelcomeScreen({
  onStart,
  completedCount,
  onOpenHistory,
}: Props) {
  return (
    <section className="welcome">
      <header className="welcome__hero">
        <p className="eyebrow welcome__eyebrow">
          <span className="welcome__dot" aria-hidden="true" />
          Коротке опитування · {QUESTIONS.length} питань · ~2 хв
        </p>

        <h1 className="welcome__title">
          Знайди свою <span className="italic">IT-спеціальність</span>
          <span className="welcome__period">.</span>
        </h1>
      </header>

      <div className="welcome__body">
        <div className="welcome__copy">
          <p className="welcome__lede">
            Ми поставимо кілька запитань про твої інтереси й уподобання — і
            підкажемо, який напрям <em>може</em> підійти найкраще. Це не іспит:
            чесні відповіді важливіші за «правильні».
          </p>

          <div className="welcome__cta">
            <button
              className="btn btn--primary"
              onClick={onStart}
              type="button"
            >
              <span>
                {completedCount > 0 ? 'Пройти ще раз' : 'Почати опитування'}
              </span>
              <span className="btn__arrow" aria-hidden="true">
                →
              </span>
            </button>
            {completedCount > 0 ? (
              <button
                type="button"
                className="welcome__history-link"
                onClick={onOpenHistory}
              >
                <span className="welcome__history-count">
                  {String(completedCount).padStart(2, '0')}
                </span>
                <span className="welcome__history-text">
                  {completedCount === 1
                    ? 'попереднє проходження'
                    : 'попередні проходження'}
                </span>
                <span className="welcome__history-arrow" aria-hidden="true">
                  →
                </span>
              </button>
            ) : (
              <span className="welcome__hint eyebrow">
                без реєстрації · анонімно
              </span>
            )}
          </div>
        </div>

        <aside className="welcome__pane" aria-label="Спеціальності">
          <p className="eyebrow welcome__pane-title">
            На вибір <span className="welcome__index">03</span>
          </p>
          <ul className="welcome__list">
            {SPECIALTY_ORDER.map((id, i) => {
              const s = SPECIALTIES[id];
              return (
                <li
                  key={id}
                  className="welcome__item"
                  style={{
                    ['--accent' as string]: `var(${s.accentVar})`,
                    ['--accent-soft' as string]: `var(${s.accentSoftVar})`,
                  }}
                >
                  <span className="welcome__num">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="welcome__name">{s.name}</span>
                  <span className="welcome__en">{s.englishName}</span>
                </li>
              );
            })}
          </ul>
        </aside>
      </div>
    </section>
  );
}
