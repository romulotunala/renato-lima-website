import Image from 'next/image';
import { assetPath } from '@/lib/assets';
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
          <p className={styles.cref}>CREF 055596-RJ</p>
        </div>

        <div className={styles.links}>
          <h4>Navegação</h4>
          <nav>
            <a href="#metodo">O Método</a>
            <a href="#planos">Serviços e Planos</a>
            <a href="#sobre">Sobre o Renato</a>
            <a href="#faq">Perguntas Frequentes</a>
          </nav>
        </div>

        <div className={styles.contact}>
          <h4>Atendimento</h4>
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
            <a href="https://wa.me/5521991425161">(21) 99142-5161</a>
          </p>
          <p>
            <Image
              src={assetPath('/instagram.svg')}
              alt=""
              width={16}
              height={16}
            />
            <a
              href="https://www.instagram.com/personalrenatolima/"
              target="_blank"
              rel="noreferrer"
            >
              @personalrenatolima
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
