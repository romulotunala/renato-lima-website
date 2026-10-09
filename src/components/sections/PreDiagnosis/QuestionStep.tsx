import type { SubmitEvent } from 'react';
import { Button } from '@/components/ui/Button';
import type { Answers } from '@/lib/pre-diagnosis/types';
import { QuestionField } from './QuestionField';
import { StepProgress } from './StepProgress';
import type { AnswerHandler, QuestionView } from './usePreDiagnosis';
import styles from './QuestionStep.module.scss';

interface QuestionStepProps {
  readonly view: QuestionView;
  readonly answers: Answers;
  /** Bloqueia as opções logo após a troca de tela, para um toque duplo não responder a próxima. */
  readonly isSettling: boolean;
  readonly onAnswer: AnswerHandler;
  readonly onNext: () => void;
  readonly onBack: () => void;
}

export function QuestionStep({
  view,
  answers,
  isSettling,
  onAnswer,
  onNext,
  onBack,
}: QuestionStepProps) {
  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    onNext();
  };

  return (
    <form className={styles.step} onSubmit={handleSubmit} noValidate>
      <StepProgress current={view.stepNumber} total={view.totalSteps} />
      <fieldset className={styles.fields} disabled={isSettling}>
        {view.questions.map((question) => (
          <QuestionField
            key={question.id}
            question={question}
            value={answers[question.id]}
            onAnswer={onAnswer}
          />
        ))}
      </fieldset>
      <div className={styles.actions}>
        <Button type='button' variant='secondary' onClick={onBack} disabled={!view.canGoBack}>
          Voltar
        </Button>
        {view.showContinue && (
          <Button type='submit' disabled={!view.canContinue}>
            Continuar
          </Button>
        )}
      </div>
    </form>
  );
}
