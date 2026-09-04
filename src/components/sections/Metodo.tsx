import Image from 'next/image';
import { assetPath } from '@/lib/assets';
import styles from './Metodo.module.scss';

export function Metodo() {
  return (
    <section className={styles.metodo} id="metodo" aria-label="O Método">
      {/* <div className={styles.container}> */}
      <div className={styles.content}>
        <h2 className={styles.title}>
          Você não recebe um treino. <br/>
          Você recebe <span className={styles.highlightTitle}>um método completo.</span>
        </h2>
        <p className={styles.subtitle}>
          Seu corpo não responde ao piloto automático. Ele responde ao que é bem planejado,{' '}
          acompanhado e ajustado no tempo certo. Conheça os pilares do meu acompanhamento:
        </p>
        <ul className={styles.list}>
          <li>
            <span className={styles.bullet} aria-hidden="true">
              ✓
            </span>
            <span>Avaliação Individual & Biomecânica</span>
            <span className={styles.listItemText}>
              Análise física, postural e funcional para identificar limitações, corrigir{' '}
              falhas e evitar lesões antes mesmo de pegar o primeiro peso.
            </span>
          </li>
          <li>
            <span className={styles.bullet} aria-hidden="true">
              ✓
            </span>
            <span>Periodização Científica</span>
            <span className={styles.listItemText}>
              Treinos estruturados em blocos progressivos (mesociclos) com controle rigoroso{' '}
              de carga, volume e descanso de forma inteligente.
            </span>
          </li>
          <li>
            <span className={styles.bullet} aria-hidden="true">
              ✓
            </span>
            <span>Ajustes em Tempo Real</span>
            <span className={styles.listItemText}>
              Acompanhamento dinâmico que evolui junto com a sua resposta aos treinos. O{' '}
              planejamento não é estático.
            </span>
          </li>
          <li>
            <span className={styles.bullet} aria-hidden="true">
              ✓
            </span>
            <span>Tecnologia App MFIT</span>
            <span className={styles.listItemText}>
              Acesso fácil aos treinos, vídeos explicativos de cada movimento, registro de{' '}
              cargas e histórico de evolução na palma da mão.
            </span>
          </li>
        </ul>
      </div>

      <div className={styles.imageWrap}>
        <div className={styles.imageGlow} aria-hidden="true" />
        <Image
          src={assetPath('/images/img_renato_aula.jpeg')}
          alt="Pessoa treinando com estratégia"
          width={720}
          height={500}
          className={styles.image}
        />
      </div>
      {/* </div> */}
    </section>
  );
}
