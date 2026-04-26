import { SPECIALTIES, SPECIALTY_ORDER } from '../data/specialties';
import { QUESTIONS } from '../data/questions';
import './WelcomeScreen.css';

interface Props {
  onStart: () => void;
  completedCount: number;
  onOpenHistory: () => void;
}

const STEPS = [
  { num: '01', label: 'Дай чесні відповіді' },
  { num: '02', label: 'Ми порахуємо бали' },
  { num: '03', label: 'Підкажемо напрям' },
];

export function WelcomeScreen({
  onStart,
  completedCount,
  onOpenHistory,
}: Props) {
  return (
    <section className="bento welcome">
      <article
        className="cell cell--c6 hero"
        style={{ animationDelay: '0ms' }}
      >
        <div className="hero__bg" aria-hidden="true">
          <span className="hero__orb hero__orb--1" />
          <span className="hero__orb hero__orb--2" />
        </div>

        <p className="eyebrow hero__eyebrow">
          <span className="hero__dot" aria-hidden="true" />
          {QUESTIONS.length} питань · ≈ 2 хв · без реєстрації
        </p>

        <h1 className="hero__title">
          Знайди свою <span className="italic">IT-спеціальність</span>
          <span className="hero__period">.</span>
        </h1>

        <p className="hero__lede">
          Кілька запитань про твої інтереси — і ми підкажемо, який напрям{' '}
          <em>може</em> підійти найкраще. Це не іспит: чесні відповіді
          важливіші за «правильні».
        </p>

        <div className="hero__cta">
          <button className="btn" onClick={onStart} type="button">
            <span>
              {completedCount > 0 ? 'Пройти ще раз' : 'Почати опитування'}
            </span>
            <span className="btn__arrow" aria-hidden="true">→</span>
          </button>
        </div>
      </article>

      <article
        className="cell cell--c3 process"
        style={{ animationDelay: '60ms' }}
      >
        <p className="eyebrow">Як це працює</p>
        <ol className="process__list">
          {STEPS.map((s) => (
            <li key={s.num} className="process__item">
              <span className="process__num">{s.num}</span>
              <span className="process__label">{s.label}</span>
            </li>
          ))}
        </ol>
      </article>

      <article
        className={`cell cell--c3 history ${completedCount > 0 ? 'history--filled' : 'history--empty'}`}
        style={{ animationDelay: '120ms' }}
      >
        <p className="eyebrow">Твої проходження</p>
        {completedCount > 0 ? (
          <button
            type="button"
            className="history__btn"
            onClick={onOpenHistory}
          >
            <span className="history__count">
              {String(completedCount).padStart(2, '0')}
            </span>
            <span className="history__meta">
              <span className="history__label">
                {completedCount === 1 ? 'результат у сесії' : 'результати в сесії'}
              </span>
              <span className="history__arrow" aria-hidden="true">→</span>
            </span>
          </button>
        ) : (
          <p className="history__empty">
            Тут <span className="italic">з’являться</span> твої результати
            після першого проходження.
          </p>
        )}
      </article>

      {SPECIALTY_ORDER.map((id, i) => {
        const s = SPECIALTIES[id];
        return (
          <article
            key={id}
            className={`cell cell--c2 spec spec--${id}`}
            style={{ animationDelay: `${180 + i * 80}ms` }}
          >
            <div className="spec__bg" aria-hidden="true" />
            <p className="spec__num">
              {String(i + 1).padStart(2, '0')}
              <span className="spec__num-of"> / 03</span>
            </p>
            <h3 className="spec__name">{s.name}</h3>
            <p className="spec__en">{s.englishName}</p>
            <p className="spec__tag">{s.tagline}</p>
          </article>
        );
      })}
    </section>
  );
}
