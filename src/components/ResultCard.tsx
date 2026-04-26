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
      className="result"
      style={{
        ['--accent' as string]: `var(${primary.accentVar})`,
        ['--accent-soft' as string]: `var(${primary.accentSoftVar})`,
      }}
    >
      <header className="result__hero">
        <p className="eyebrow result__kicker">
          <span className="result__pulse" aria-hidden="true" />
          {isTie ? 'Кілька напрямів збіглися' : 'Тобі може підійти'}
          {origin === 'history' && (
            <>
              <span className="result__kicker-sep" aria-hidden="true">
                ·
              </span>
              <span className="result__kicker-tag">з історії</span>
            </>
          )}
          {origin === 'fresh' && (
            <>
              <span className="result__kicker-sep" aria-hidden="true">
                ·
              </span>
              <span className="result__kicker-tag">збережено в сесії</span>
            </>
          )}
        </p>

        <h1 className="result__title">
          {isTie ? (
            <>
              Зацікавлення вказують
              <br />
              <span className="italic">на кілька напрямів</span>
              <span className="result__period">.</span>
            </>
          ) : (
            <>
              <span className="italic">{primary.name.split(' ')[0]}</span>
              <br />
              {primary.name.split(' ').slice(1).join(' ')}
              <span className="result__period">.</span>
            </>
          )}
        </h1>

        <p className="result__tagline">{primary.tagline}</p>
      </header>

      <div className="result__grid">
        <article className="result__main">
          <p className="eyebrow result__section-label">Чому це може підійти</p>
          <p className="result__description">{primary.description}</p>

          <p className="eyebrow result__section-label result__section-label--mt">
            Що ти будеш вивчати
          </p>
          <ul className="result__topics">
            {primary.studyTopics.map((topic, i) => (
              <li
                key={topic}
                className="result__topic"
                style={{ animationDelay: `${i * 60 + 200}ms` }}
              >
                <span className="result__topic-num">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{topic}</span>
              </li>
            ))}
          </ul>

          <a
            className="result__link"
            href={primary.departmentUrl}
            target="_blank"
            rel="noreferrer noopener"
          >
            <span className="result__link-meta">
              <span className="eyebrow">Сторінка кафедри</span>
              <span className="result__link-name">{primary.departmentName}</span>
            </span>
            <span className="result__link-arrow" aria-hidden="true">
              ↗
            </span>
          </a>
        </article>

        <aside className="result__side">
          <p className="eyebrow result__section-label">Розподіл балів</p>
          <ul className="result__scores">
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
                    ['--row-accent' as string]: `var(${s.accentVar})`,
                  }}
                >
                  <div className="score__top">
                    <span className="score__name">{s.name}</span>
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

          {isTie && (
            <div className="result__tie">
              <p className="eyebrow result__section-label">Близькі напрями</p>
              <p className="result__tie-text">
                Тебе можуть зацікавити одразу:
                <br />
                {tieSpecialties.map((s, i) => (
                  <span key={s.id}>
                    <span className="italic">{s.name}</span>
                    {i < tieSpecialties.length - 1 ? ', ' : ''}
                  </span>
                ))}
                . Глянь на обидві кафедри та обирай те, що ближче.
              </p>
              <ul className="result__tie-links">
                {tieSpecialties.map((s) => (
                  <li key={s.id}>
                    <a
                      href={s.departmentUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="result__tie-link"
                      style={{
                        ['--row-accent' as string]: `var(${s.accentVar})`,
                      }}
                    >
                      <span>{s.englishName}</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>

      <section className="result__careers" aria-labelledby="careers-title">
        <header className="result__careers-head">
          <p className="eyebrow result__section-label">Куди далі</p>
          <h2 className="result__careers-title" id="careers-title">
            Ким ти зможеш <span className="italic">працювати</span>
            <span className="result__careers-period">.</span>
          </h2>
          <p className="result__careers-lede">
            Приклади ролей, у яких найчастіше починають кар’єру випускники
            цього напряму. Це орієнтир, а не вичерпний список.
          </p>
        </header>

        <ul className="career-grid">
          {primary.careerPaths.map((path, i) => (
            <li
              key={path.title}
              className="career"
              style={{ animationDelay: `${i * 80 + 200}ms` }}
            >
              <span className="career__num">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="career__title">{path.title}</h3>
              <p className="career__desc">{path.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <footer className="result__footer">
        <div className="result__actions">
          <button type="button" className="btn btn--ghost" onClick={onRestart}>
            <span aria-hidden="true">↺</span>
            <span>Пройти ще раз</span>
          </button>
          {completedCount > 0 && (
            <button
              type="button"
              className="result__history-link"
              onClick={onOpenHistory}
            >
              <span className="result__history-count">
                {String(completedCount).padStart(2, '0')}
              </span>
              <span className="result__history-text">
                {completedCount === 1
                  ? 'проходження в історії'
                  : 'проходжень в історії'}
              </span>
              <span aria-hidden="true">→</span>
            </button>
          )}
        </div>
        <p className="eyebrow result__disclaimer">
          результат — рекомендація, а не вирок · обери те, що відгукується
        </p>
      </footer>
    </section>
  );
}
