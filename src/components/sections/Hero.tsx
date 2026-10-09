import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { assetPath } from '@/lib/assets';
import { buildWhatsAppLink, whatsAppOriginProps } from '@/lib/whatsapp';
import styles from './Hero.module.scss';

const CTA_MESSAGE = 'Olá, Renato! Vim pelo site e gostaria de iniciar minha transformação.';

export function Hero() {
  return (
    <section className={styles.hero} aria-label='Apresentação principal'>
      <div className={styles.bg} aria-hidden>
        <Image
          src={assetPath('/images/photo-1534438327276-14e5300c3a48.avif')}
          alt=''
          fill
          priority
          sizes='100vw'
        />
        <div className={styles.overlayVertical} />
        <div className={styles.overlayHorizontal} />
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.badge}>
            <div className={styles.badgeIcon}>
              <Image src={assetPath('/images/logo-lightning.png')} alt='' fill />
            </div>
            Consultoria & Personal Premium
          </div>
          <h1 className={styles.title}>
            <span>Resultado não vem do acaso.</span>
            <br />
            <span className={styles.highlightTitle}>Vem da estratégia.</span>
          </h1>
          <p className={styles.subtitle}>
            Treino personalizado, biomecânica e periodização científica para você transformar{' '}
            seu corpo com segurança, constância e sem perder tempo.
          </p>
          <div className={styles.actions}>
            <Button
              href={buildWhatsAppLink(CTA_MESSAGE)}
              variant='highlight'
              size='lg'
              target='_blank'
              rel='noreferrer'
              {...whatsAppOriginProps('hero')}
            >
              Iniciar Transformação
            </Button>
            <Button href='#planos' variant='secondary' size='lg' className={styles.secondaryAction}>
              Conhecer os planos
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
