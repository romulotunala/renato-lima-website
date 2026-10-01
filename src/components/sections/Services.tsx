import { assetPath } from '@/lib/assets';
import styles from './Services.module.scss';

const PAIN_POINTS = [
  {
    title: 'Falta de Direção',
    description:
      'Você chega na academia sem saber direito por onde começar ou '
      + 'executa exercícios sem ter certeza de que está no caminho certo.',
    icon: assetPath('/pin_drop_orange.svg'),
  },
  {
    title: 'Falta de Constância',
    description:
      'Já tentou começar várias vezes, mas a falta de acompanhamento e '
      + 'de motivação faz você parar na metade e voltar à estaca zero.',
    icon: assetPath('/event_busy_orange.svg'),
  },
  {
    title: 'Dores e Estagnação',
    description:
      'Treina há meses, mas convive com desconfortos articulares, postura '
      + 'incorreta e um corpo que parece não mudar no espelho.',
    icon: assetPath('/trending_down_orange.svg'),
  },
] as const;

export function Services() {
  return (
    <section id='dores' className={styles.services} aria-label='Dores e problemas comuns'>
      <h2 className={styles.title}>
        Cansado de treinar <br />e{' '}
        <span className={styles.highlightTitle}>não ver resultados?</span>
      </h2>
      <p className={styles.subtitle}>
        O problema na maioria das vezes não é a sua falta de esforço. É a falta de estratégia.
      </p>
      <ul className={styles.grid}>
        {PAIN_POINTS.map((painPoint) => (
          <li key={painPoint.title} className={styles.card}>
            <span className={styles.icon} aria-hidden='true'>
              <img src={painPoint.icon} alt='' width={40} height={40} />
            </span>
            <h3 className={styles.cardTitle}>{painPoint.title}</h3>
            <p className={styles.cardDescription}>{painPoint.description}</p>
          </li>
        ))}
      </ul>
      <p className={styles.text}>
        Toda evolução começa com um plano. Quando existe ciência,{' '}
        <br />biomecânica e métricas claras, treinar deixa de ser uma obrigação e{' '}
        <br /><strong className={styles.highlightText}>passa a ser evolução constante.</strong>
      </p>
    </section>
  );
}
