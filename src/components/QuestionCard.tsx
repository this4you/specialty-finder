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
    <section className="question" key={question.id}>
      <ProgressIndicator current={index + 1} total={total} />

      <div className="question__body">
        <p className="eyebrow question__eyebrow">
          <span className="question__num">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="question__divider" aria-hidden="true">
            ·
          </span>
          <span>з {String(total).padStart(2, '0')}</span>
        </p>

        <h2
          className="question__prompt"
          ref={headingRef}
          tabIndex={-1}
        >
          {question.prompt}
        </h2>

        {question.helper && (
          <p className="question__helper">{question.helper}</p>
        )}

        <ul className="question__options" role="radiogroup" aria-label={question.prompt}>
          {question.options.map((opt, i) => {
            const isSelected = selectedOptionId === opt.id;
            return (
              <li key={opt.id}>
                <button
                  type="button"
                  className={`option ${isSelected ? 'is-selected' : ''}`}
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => onSelect(opt.id)}
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <span className="option__key" aria-hidden="true">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="option__label">{opt.label}</span>
                  <span className="option__chev" aria-hidden="true">
                    →
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="question__nav">
        <button
          type="button"
          className="link-back"
          onClick={onBack}
          disabled={!onBack}
        >
          <span aria-hidden="true">←</span>
          <span>Назад</span>
        </button>
        <span className="eyebrow question__hint">оберіть одну відповідь</span>
      </div>
    </section>
  );
}
