import { buildWhatsAppLink } from '@/lib/whatsapp';
import styles from './Cta.module.scss';

export function Cta() {
  const ctaMessage = 'Olá, Renato! Quero conversar sobre meus objetivos e agendar uma avaliação.';

  return (
    <section className={styles.cta} aria-label="Call to action final">
      <div className={styles.backgroundShape} aria-hidden="true" />

      <div className={styles.content}>
        <h2 className={styles.title}>Pronto para treinar com propósito?</h2>
        <p className={styles.lead}>
          Seu próximo passo pode mudar completamente seus resultados. Converse comigo no{' '}
          WhatsApp, tire suas dúvidas e vamos agendar sua avaliação.
        </p>
        <a
          href={buildWhatsAppLink(ctaMessage)}
          className={styles.button}
          target="_blank"
          rel="noreferrer"
        >
          Falar com o Personal Renato
        </a>
      </div>
    </section>
  );
}
