import type { CompletedTest } from '../types';

const KEY = 'specialty-finder/completed';

export function loadCompleted(): CompletedTest[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.sessionStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as CompletedTest[]) : [];
  } catch {
    return [];
  }
}

function persist(list: CompletedTest[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    /* quota / private mode — ігноруємо */
  }
}

export function appendCompleted(
  test: Omit<CompletedTest, 'id' | 'completedAt'>,
): { test: CompletedTest; list: CompletedTest[] } {
  const record: CompletedTest = {
    ...test,
    id: makeId(),
    completedAt: new Date().toISOString(),
  };
  const list = [record, ...loadCompleted()];
  persist(list);
  return { test: record, list };
}

export function clearCompleted(): CompletedTest[] {
  if (typeof window !== 'undefined') {
    try {
      window.sessionStorage.removeItem(KEY);
    } catch {
      /* ignore */
    }
  }
  return [];
}

function makeId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `t_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}
