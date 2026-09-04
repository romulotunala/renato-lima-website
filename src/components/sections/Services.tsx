import {
  servicesContent,
  type HomeServiceItem,
} from '@/content/home';
import styles from './Services.module.scss';

interface ServicesProps {
  readonly services?: readonly HomeServiceItem[];
}

export function Services({
  services = servicesContent.items,
}: ServicesProps) {
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
        {services.map((service) => (
          <li key={service.title} className={styles.card}>
            <span className={styles.icon} aria-hidden='true'>
              <img src={service.icon} alt={service.title} width={40} height={40} />
            </span>
            <h3 className={styles.cardTitle}>{service.title}</h3>
            <p className={styles.cardDescription}>{service.description}</p>
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
