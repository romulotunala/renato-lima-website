import Image from 'next/image';
import { Bullet } from '@/components/Bullet';
import { assetPath } from '@/lib/assets';
import styles from './Metodo.module.scss';

const PILLARS = [
  {
    title: 'Avaliação Individual & Biomecânica',
    description:
      'Análise física, postural e funcional para identificar limitações, corrigir falhas e '
      + 'evitar lesões antes mesmo de pegar o primeiro peso.',
  },
  {
    title: 'Periodização Científica',
    description:
      'Treinos estruturados em blocos progressivos (mesociclos) com controle rigoroso de carga, '
      + 'volume e descanso de forma inteligente.',
  },
  {
    title: 'Ajustes em Tempo Real',
    description:
      'Acompanhamento dinâmico que evolui junto com a sua resposta aos treinos. O planejamento '
      + 'não é estático.',
  },
  {
    title: 'Tecnologia App MFIT',
    description:
      'Acesso fácil aos treinos, vídeos explicativos de cada movimento, registro de cargas e '
      + 'histórico de evolução na palma da mão.',
  },
] as const;

export function Metodo() {
  return (
    <section className={styles.metodo} id='metodo' aria-label='O Método'>
      <div className={styles.container}>
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
            {PILLARS.map((pillar) => (
              <li key={pillar.title}>
                <Bullet />
                <span>{pillar.title}</span>
                <span className={styles.listItemText}>{pillar.description}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.media}>
          <div className={styles.imageGlow} aria-hidden='true' />
          <Image
            src={assetPath('/images/img_renato_aula.jpeg')}
            alt='Pessoa treinando com estratégia'
            width={720}
            height={500}
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
}
