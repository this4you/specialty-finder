import './ProgressIndicator.css';

interface Props {
  current: number;
  total: number;
}

export function ProgressIndicator({ current, total }: Props) {
  const ratio = Math.min(1, current / total);
  return (
    <div className="progress" aria-label={`Питання ${current} з ${total}`}>
      <div className="progress__meta">
        <span className="progress__label eyebrow">Питання</span>
        <span className="progress__counter">
          <span className="progress__current">
            {String(current).padStart(2, '0')}
          </span>
          <span className="progress__divider">/</span>
          <span className="progress__total">
            {String(total).padStart(2, '0')}
          </span>
        </span>
      </div>
      <div className="progress__track" role="presentation">
        <div
          className="progress__fill"
          style={{ transform: `scaleX(${ratio})` }}
        />
        <div className="progress__ticks" aria-hidden="true">
          {Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              className={`progress__tick ${i < current ? 'is-active' : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
