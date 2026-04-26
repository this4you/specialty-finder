import { SPECIALTIES, SPECIALTY_ORDER } from '../data/specialties';
import { QUESTIONS } from '../data/questions';
import { Compass } from './Compass';
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
    <section className="bento welcome">
      {/* === HERO with embedded compass === */}
      <article
        className="cell cell--c6 hero"
        style={{ animationDelay: '0ms' }}
      >
        <div className="hero__content">
          <p className="eyebrow hero__eyebrow">
            <span className="hero__eyebrow-dot" aria-hidden="true" />
            <span>Career Compass</span>
            <span className="hero__eyebrow-sep">·</span>
            <span>{QUESTIONS.length} питань · 2 хв</span>
          </p>

          <h1 className="hero__title">
            <span className="hero__title-line">Знайди свою</span>
            <span className="hero__title-line">
              <span className="gradient-text italic">IT-спеціальність</span>
            </span>
          </h1>

          <p className="hero__lede">
            Кілька запитань про твої інтереси — і компас покаже, який IT-напрям
            у коледжі <em>може</em> бути твоїм. Без оцінок, без реєстрації,
            без неправильних відповідей.
          </p>

          <div className="hero__cta">
            <button className="btn" onClick={onStart} type="button">
              <span>
                {completedCount > 0 ? 'Пройти ще раз' : 'Почати опитування'}
              </span>
              <span className="btn__arrow" aria-hidden="true">→</span>
            </button>
            {completedCount > 0 && (
              <button
                type="button"
                className="hero__history"
                onClick={onOpenHistory}
              >
                <span className="hero__history-num">
                  {String(completedCount).padStart(2, '0')}
                </span>
                <span>попередні проходження</span>
                <span aria-hidden="true">→</span>
              </button>
            )}
          </div>
        </div>

        <div className="hero__compass">
          <Compass size={380} />
        </div>
      </article>

      {/* === Specialty cards === */}
      {SPECIALTY_ORDER.map((id, i) => {
        const s = SPECIALTIES[id];
        return (
          <article
            key={id}
            className={`cell cell--c2 spec spec--${id}`}
            style={{ animationDelay: `${100 + i * 80}ms` }}
          >
            <div className="spec__bg" aria-hidden="true" />
            <div className="spec__glow" aria-hidden="true" />

            <div className="spec__top">
              <span className="spec__num">
                {String(i + 1).padStart(2, '0')}
                <span className="spec__num-of"> / 03</span>
              </span>
              <span className="spec__chip">
                <span className="spec__chip-dot" />
                {s.englishName}
              </span>
            </div>

            <h3 className="spec__name italic">{s.name}</h3>
            <p className="spec__tag">{s.tagline}</p>
          </article>
        );
      })}
    </section>
  );
}
