'use client';

import { useEffect, useRef } from 'react';
import { trackPreDiagnosisResult } from '@/lib/analytics';
import { SECTION_ID } from '@/lib/pre-diagnosis/constants';
import { QuestionStep } from './QuestionStep';
import { ResultStep } from './ResultStep';
import { usePreDiagnosis } from './usePreDiagnosis';
import styles from './PreDiagnosis.module.scss';

export function PreDiagnosis() {
  const quiz = usePreDiagnosis();
  const panelRef = useRef<HTMLDivElement>(null);
  const { currentStep, view } = quiz;
  const previousStep = useRef(currentStep);

  // Ao trocar de tela, leva o foco para o painel (leitores de tela anunciam a nova etapa)
  useEffect(() => {
    if (previousStep.current === currentStep) return;
    previousStep.current = currentStep;
    panelRef.current?.focus();
  }, [currentStep]);

  // Conta cada chegada à tela de resultado, com o plano indicado
  const resultPlan = view.kind === 'result' ? view.plan : null;
  useEffect(() => {
    if (resultPlan) trackPreDiagnosisResult(resultPlan);
  }, [resultPlan]);

  const panelLabel = view.kind === 'result'
    ? 'Resultado do pré-diagnóstico'
    : `Etapa ${view.stepNumber} de ${view.totalSteps}`;

  return (
    <section className={styles.preDiagnosis} id={SECTION_ID} aria-label='Pré-diagnóstico'>
      <h2 className={styles.title}>
        Faça seu <span className={styles.highlightTitle}>pré-diagnóstico</span>
      </h2>
      <p className={styles.subtitle}>
        Responda algumas perguntas rápidas e receba uma indicação inicial do acompanhamento{' '}
        ideal para o seu momento.
      </p>
      <div
        ref={panelRef}
        className={styles.panel}
        role='group'
        aria-label={panelLabel}
        tabIndex={-1}
      >
        {view.kind === 'result' ? (
          <ResultStep
            plan={view.plan}
            answers={quiz.answers}
            onReview={quiz.review}
            onRestart={quiz.restart}
          />
        ) : (
          <QuestionStep
            view={view}
            answers={quiz.answers}
            isSettling={quiz.isSettling}
            onAnswer={quiz.answer}
            onNext={quiz.next}
            onBack={quiz.back}
          />
        )}
      </div>
    </section>
  );
}
