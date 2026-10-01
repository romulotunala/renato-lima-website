import Image from 'next/image';
import { assetPath } from '@/lib/assets';
import { CREF, INSTAGRAM, NAV_LINKS, PHONE } from '@/lib/site';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import styles from './Footer.module.scss';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <Image
            src={assetPath('/images/logo_renato_white.png')}
            alt="Renato Lima"
            width={220}
            height={56}
            className={styles.logo}
          />
          <p>Personal Trainer & Consultoria Premium</p>
          <p className={styles.cref}>{CREF}</p>
        </div>

        <div className={styles.links}>
          <h2>Navegação</h2>
          <nav>
            {NAV_LINKS.map(({ href, longLabel }) => (
              <a key={href} href={href}>{longLabel}</a>
            ))}
          </nav>
        </div>

        <div className={styles.contact}>
          <h2>Atendimento</h2>
          <p>
            <Image src={assetPath('/pin_drop_orange.svg')} alt="" width={20} height={20} />
            Campo Grande e Recreio - RJ
          </p>
          <p>
            <Image
              src={assetPath('/whatsapp.svg')}
              alt=""
              width={16}
              height={16}
            />
            <a href={buildWhatsAppLink()} target="_blank" rel="noreferrer">{PHONE.display}</a>
          </p>
          <p>
            <Image
              src={assetPath('/instagram.svg')}
              alt=""
              width={16}
              height={16}
            />
            <a href={INSTAGRAM.url} target="_blank" rel="noreferrer">
              {INSTAGRAM.handle}
            </a>
          </p>
        </div>
      </div>

      <div className={styles.legal}>
        <p className={styles.legalNotice}>
          Aviso Legal: Serviço de acompanhamento em Educação Física. Não substitui tratamentos{' '}
          médicos. Resultados dependem da dedicação individual.
        </p>
        <div className={styles.credits}>
          <p>&copy; 2026 Renato Lima. Todos os direitos reservados.</p>
          <p>Desenvolvido por <strong>Rômulo Tunala</strong></p>
        </div>
      </div>
    </footer>
  );
}
