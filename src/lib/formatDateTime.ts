const isSameDay = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const timeFormatter = new Intl.DateTimeFormat('uk-UA', {
  hour: '2-digit',
  minute: '2-digit',
});

const dateFormatter = new Intl.DateTimeFormat('uk-UA', {
  day: '2-digit',
  month: 'short',
});

export function formatCompletedAt(iso: string, now: Date = new Date()): string {
  const date = new Date(iso);
  const time = timeFormatter.format(date);
  if (isSameDay(date, now)) return `сьогодні, ${time}`;

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (isSameDay(date, yesterday)) return `вчора, ${time}`;

  return `${dateFormatter.format(date)}, ${time}`;
}
