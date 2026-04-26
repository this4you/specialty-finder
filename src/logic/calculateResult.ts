import { QUESTIONS } from '../data/questions';
import { SPECIALTY_ORDER } from '../data/specialties';
import type { Question, Scores, SpecialtyId } from '../types';

export interface ScoringResult {
  scores: Scores;
  primary: SpecialtyId;
  ties: SpecialtyId[];
  ordered: SpecialtyId[];
  total: number;
}

const emptyScores = (): Scores => ({ se: 0, cs: 0, ce: 0 });

export function calculateResult(
  answers: Record<string, string>,
  questions: Question[] = QUESTIONS,
): ScoringResult {
  const scores = emptyScores();

  for (const question of questions) {
    const optionId = answers[question.id];
    if (!optionId) continue;
    const option = question.options.find((o) => o.id === optionId);
    if (!option) continue;
    for (const [key, value] of Object.entries(option.scores)) {
      const id = key as SpecialtyId;
      scores[id] += value ?? 0;
    }
  }

  const ordered = [...SPECIALTY_ORDER].sort((a, b) => scores[b] - scores[a]);
  const primary = ordered[0];
  const top = scores[primary];
  const ties = ordered.filter((id) => scores[id] === top);
  const total = SPECIALTY_ORDER.reduce((sum, id) => sum + scores[id], 0);

  return { scores, primary, ties, ordered, total };
}
