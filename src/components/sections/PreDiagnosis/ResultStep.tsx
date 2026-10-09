import { Button } from '@/components/ui/Button';
import { buildPreDiagnosisLink } from '@/lib/pre-diagnosis/message';
import { getResultText, PLAN_RESULTS } from '@/lib/pre-diagnosis/plan-result';
import type { Answers, PlanId } from '@/lib/pre-diagnosis/types';
import styles from './ResultStep.module.scss';

interface ResultStepProps {
  readonly plan: PlanId;
  readonly answers: Answers;
  readonly onReview: () => void;
  readonly onRestart: () => void;
}

export function ResultStep({ plan, answers, onReview, onRestart }: ResultStepProps) {
  const { title, ctaLabel } = PLAN_RESULTS[plan];

  return (
    <div className={styles.result}>
      <article className={styles.card}>
        <span className={styles.badge}>Indicação inicial</span>
        <h3 className={styles.planTitle}>{title}</h3>
        <p className={styles.text}>{getResultText(plan, answers.nome)}</p>
        <p className={styles.notice}>
          Essa é apenas uma indicação inicial. Renato vai entender melhor seu momento antes de{' '}
          confirmar a modalidade.
        </p>
      </article>

      <div className={styles.actions}>
        <Button
          href={buildPreDiagnosisLink(answers, plan)}
          variant='highlight'
          size='lg'
          className={styles.primaryAction}
          target='_blank'
          rel='noreferrer'
        >
          {ctaLabel}
        </Button>
        <div className={styles.secondaryActions}>
          <Button type='button' variant='secondary' onClick={onReview}>
            Revisar respostas
          </Button>
          <Button type='button' variant='secondary' onClick={onRestart}>
            Refazer
          </Button>
        </div>
      </div>
    </div>
  );
}
