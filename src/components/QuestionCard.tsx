import { useEffect, useRef } from 'react';
import type { Question } from '../types';
import './QuestionCard.css';

interface Props {
  question: Question;
  index: number;
  total: number;
  selectedOptionId?: string;
  onSelect: (optionId: string) => void;
  onBack?: () => void;
}

export function QuestionCard({
  question,
  index,
  total,
  selectedOptionId,
  onSelect,
  onBack,
}: Props) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, [question.id]);

  const ratio = (index + 1) / total;

  return (
    <section className="bento q" key={question.id}>
      {/* === Progress + meta === */}
      <article className="cell cell--c6 cell--strong q__hero">
        <div className="q__meta">
          <span className="eyebrow q__meta-step">
            Питання · <span className="q__meta-step-num">{String(index + 1).padStart(2, '0')}</span>
            <span className="q__meta-of"> з {String(total).padStart(2, '0')}</span>
          </span>
          {question.helper && (
            <span className="q__helper italic">{question.helper}</span>
          )}
        </div>

        <div className="q__progress" aria-label={`Питання ${index + 1} з ${total}`}>
          <div className="q__progress-track">
            <div
              className="q__progress-fill"
              style={{ transform: `scaleX(${ratio})` }}
            />
          </div>
          <div className="q__progress-dots">
            {Array.from({ length: total }).map((_, i) => (
              <span
                key={i}
                className={`q__dot ${i < index ? 'is-done' : i === index ? 'is-current' : ''}`}
              />
            ))}
          </div>
        </div>

        <h2 className="q__prompt" ref={headingRef} tabIndex={-1}>
          {question.prompt}
        </h2>
      </article>

      {/* === Options === */}
      <ul className="q__options" role="radiogroup" aria-label={question.prompt}>
        {question.options.map((opt, i) => {
          const isSelected = selectedOptionId === opt.id;
          const accent = ['se', 'cs', 'ce'][i] ?? 'se';
          return (
            <li key={opt.id} className="q__option-wrap">
              <button
                type="button"
                className={`option option--${accent} ${isSelected ? 'is-selected' : ''}`}
                role="radio"
                aria-checked={isSelected}
                onClick={() => onSelect(opt.id)}
                style={{ animationDelay: `${i * 90 + 100}ms` }}
              >
                <div className="option__bg" aria-hidden="true" />
                <span className="option__key">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="option__label">{opt.label}</span>
                <span className="option__chev" aria-hidden="true">→</span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* === Nav cell === */}
      <div className="q__nav cell cell--c6">
        <button
          type="button"
          className="link-back"
          onClick={onBack}
          disabled={!onBack}
        >
          <span aria-hidden="true">←</span>
          <span>Назад</span>
        </button>
        <span className="eyebrow q__hint">оберіть одну відповідь</span>
      </div>
    </section>
  );
}
