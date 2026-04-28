import { useMemo, useState } from 'react';
import { AppShell } from './components/AppShell';
import { WelcomeScreen } from './components/WelcomeScreen';
import { QuestionCard } from './components/QuestionCard';
import { ResultCard } from './components/ResultCard';
import { HistoryScreen } from './components/HistoryScreen';
import { QrScreen } from './components/QrScreen';
import { QUESTIONS } from './data/questions';
import { calculateResult } from './logic/calculateResult';
import {
  appendCompleted,
  clearCompleted,
  loadCompleted,
} from './storage/sessionStore';
import type { CompletedTest, Screen } from './types';

function App() {
  const [screen, setScreen] = useState<Screen>({ kind: 'welcome' });
  const [tests, setTests] = useState<CompletedTest[]>(() => loadCompleted());

  const startNew = () =>
    setScreen({ kind: 'questionnaire', index: 0, answers: {} });

  const goWelcome = () => setScreen({ kind: 'welcome' });

  const goHistory = () => setScreen({ kind: 'history' });

  const goQr = () => setScreen({ kind: 'qrcode' });

  const handleSelect = (optionId: string) => {
    if (screen.kind !== 'questionnaire') return;
    const question = QUESTIONS[screen.index];
    const answers = { ...screen.answers, [question.id]: optionId };
    const isLast = screen.index === QUESTIONS.length - 1;

    if (isLast) {
      const result = calculateResult(answers);
      const { test, list } = appendCompleted({
        answers,
        primary: result.primary,
        ties: result.ties,
        scores: result.scores,
      });
      setTests(list);
      setScreen({
        kind: 'result',
        answers,
        testId: test.id,
        origin: 'fresh',
      });
      return;
    }

    setScreen({
      kind: 'questionnaire',
      index: screen.index + 1,
      answers,
    });
  };

  const handleBack = () => {
    if (screen.kind !== 'questionnaire' || screen.index === 0) return;
    setScreen({
      kind: 'questionnaire',
      index: screen.index - 1,
      answers: screen.answers,
    });
  };

  const viewHistorical = (test: CompletedTest) => {
    setScreen({
      kind: 'result',
      answers: test.answers,
      testId: test.id,
      origin: 'history',
    });
  };

  const handleClearHistory = () => {
    setTests(clearCompleted());
  };

  const result = useMemo(() => {
    if (screen.kind !== 'result') return null;
    return calculateResult(screen.answers);
  }, [screen]);

  return (
    <AppShell>
      {screen.kind === 'welcome' && (
        <WelcomeScreen
          onStart={startNew}
          completedCount={tests.length}
          onOpenHistory={goHistory}
          onOpenQr={goQr}
        />
      )}

      {screen.kind === 'questionnaire' && (
        <QuestionCard
          question={QUESTIONS[screen.index]}
          index={screen.index}
          total={QUESTIONS.length}
          selectedOptionId={screen.answers[QUESTIONS[screen.index].id]}
          onSelect={handleSelect}
          onBack={screen.index > 0 ? handleBack : undefined}
        />
      )}

      {screen.kind === 'result' && result && (
        <ResultCard
          result={result}
          onRestart={startNew}
          completedCount={tests.length}
          origin={screen.origin}
          onOpenHistory={goHistory}
        />
      )}

      {screen.kind === 'history' && (
        <HistoryScreen
          tests={tests}
          onView={viewHistorical}
          onBack={goWelcome}
          onStartNew={startNew}
          onClear={handleClearHistory}
        />
      )}

      {screen.kind === 'qrcode' && <QrScreen onBack={goWelcome} />}
    </AppShell>
  );
}

export default App;
