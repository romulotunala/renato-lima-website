import styles from './StepProgress.module.scss';

interface StepProgressProps {
  readonly current: number;
  readonly total: number;
}

export function StepProgress({ current, total }: StepProgressProps) {
  return (
    <div className={styles.progress}>
      {/* O painel já anuncia a etapa no aria-label; aqui o texto é só visual */}
      <p className={styles.counter} aria-hidden='true'>Etapa {current} de {total}</p>
      <div className={styles.track} aria-hidden='true'>
        <span className={styles.bar} style={{ width: `${(current / total) * 100}%` }} />
      </div>
    </div>
  );
}
