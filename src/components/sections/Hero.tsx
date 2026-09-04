import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { assetPath } from '@/lib/assets';
import { heroContent } from '@/content/home';
import styles from './Hero.module.scss';

interface HeroProps {
  readonly title?: string;
  readonly highlightTitle?: string;
  readonly subtitle?: string;
  readonly ctaLabel?: string;
  readonly ctaHref?: string;
  readonly badgeLabel?: string;
  readonly secondaryCtaLabel?: string;
}

export function Hero({
  title = heroContent.title,
  highlightTitle = heroContent.highlightTitle,
  subtitle = heroContent.subtitle,
  ctaLabel = heroContent.primaryCtaLabel,
  ctaHref = heroContent.primaryCtaHref,
  badgeLabel = heroContent.badgeLabel,
  secondaryCtaLabel = heroContent.secondaryCtaLabel,
}: HeroProps) {
  return (
    <section className={styles.hero} aria-label='Apresentação principal'>
      <div className={styles.bg} aria-hidden>
        <Image
          src={assetPath('/images/photo-1534438327276-14e5300c3a48.avif')}
          alt='Fundo Academia'
          fill
          priority
          sizes='100vw'
          style={{ objectFit: 'cover' }}
        />
        <div className={styles.overlayVertical} />
        <div className={styles.overlayHorizontal} />
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.badge}>
            <div style={{ width: '16px', height: '16px', position: 'relative' }}>

              <Image
                src={assetPath('/images/logo-lightning.png')}
                alt='Logo Lightning'
                fill
                style={{ objectFit: 'contain' }}

              />
            </div>
            {badgeLabel}</div>
          <h1 className={styles.title}>
            <span>{title}</span>
            <br />
            <span className={styles.highlightTitle}>{highlightTitle}</span>
          </h1>
          <p className={styles.subtitle}>{subtitle}</p>
          <div className={styles.actions}>
            <Button href={ctaHref} size='lg' className={styles.primaryAction}>
              {ctaLabel}
            </Button>
            <Button href='#planos' variant='secondary' size='lg' className={styles.secondaryAction}>
              {secondaryCtaLabel}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
