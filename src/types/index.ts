export type SpecialtyId = 'se' | 'cs' | 'ce';

export type Scores = Record<SpecialtyId, number>;

export interface AnswerOption {
  id: string;
  label: string;
  scores: Partial<Scores>;
}

export interface Question {
  id: string;
  prompt: string;
  helper?: string;
  options: AnswerOption[];
}

export interface CareerPath {
  title: string;
  description: string;
}

export interface Specialty {
  id: SpecialtyId;
  name: string;
  englishName: string;
  tagline: string;
  description: string;
  studyTopics: string[];
  careerPaths: CareerPath[];
  departmentName: string;
  departmentUrl: string;
  accentVar: string;
  accentSoftVar: string;
}

export interface CompletedTest {
  id: string;
  completedAt: string;
  answers: Record<string, string>;
  primary: SpecialtyId;
  ties: SpecialtyId[];
  scores: Scores;
}

export type Screen =
  | { kind: 'welcome' }
  | { kind: 'questionnaire'; index: number; answers: Record<string, string> }
  | {
      kind: 'result';
      answers: Record<string, string>;
      testId: string;
      origin: 'fresh' | 'history';
    }
  | { kind: 'history' }
  | { kind: 'qrcode' };
