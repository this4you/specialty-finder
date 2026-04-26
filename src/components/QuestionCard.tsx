import { useEffect, useRef } from 'react';
import type { Question } from '../types';
import { ProgressIndicator } from './ProgressIndicator';
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

  return (
    <section className="bento q" key={question.id}>
      <article className="cell cell--c4 q__hero">
        <p className="eyebrow q__eyebrow">
          <span className="q__num">{String(index + 1).padStart(2, '0')}</span>
          <span className="q__sep" aria-hidden="true">/</span>
          <span className="q__total">{String(total).padStart(2, '0')}</span>
          {question.helper && (
            <>
              <span className="q__dot" aria-hidden="true">·</span>
              <span className="q__helper">{question.helper}</span>
            </>
          )}
        </p>

        <h2
          className="q__prompt"
          ref={headingRef}
          tabIndex={-1}
        >
          {question.prompt}
        </h2>
      </article>

      <article className="cell cell--c2 q__progress">
        <ProgressIndicator current={index + 1} total={total} />
        <p className="q__progress-hint">
          <span className="italic">Спочатку</span> — інстинкт.{' '}
          <span className="italic">Потім</span> — логіка.
        </p>
      </article>

      <ul className="q__options" role="radiogroup" aria-label={question.prompt}>
        {question.options.map((opt, i) => {
          const isSelected = selectedOptionId === opt.id;
          return (
            <li key={opt.id} className="q__option-wrap">
              <button
                type="button"
                className={`option ${isSelected ? 'is-selected' : ''}`}
                role="radio"
                aria-checked={isSelected}
                onClick={() => onSelect(opt.id)}
                style={{ animationDelay: `${i * 80 + 100}ms` }}
              >
                <span className="option__key" aria-hidden="true">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="option__label">{opt.label}</span>
                <span className="option__chev" aria-hidden="true">→</span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="q__nav cell cell--c6 cell--soft">
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
