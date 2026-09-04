import Image from 'next/image';
import { assetPath } from '@/lib/assets';
import styles from './About.module.scss';

export function About() {
  const descriptions = [
    'Sou Profissional de Educação Física (CREF 055596-RJ), pós-graduado em Biomecânica e '
    + 'Periodização do Treinamento e cursando MBA em Gestão Fitness.',
    'Minha trajetória no esporte começou no futebol de base (America FC, CAAC Brasil, '
    + 'Taça das Favelas) e se consolidou na preparação física e musculação de alta performance, '
    + 'passando por grandes redes do Rio de Janeiro.',
    'Atualmente, sou Presidente da Comissão Voluntária de Musculação e Alta Performance Regional '
    + 'Campo Grande do CREF 1 – Zona Oeste e palestrante em cursos de capacitação técnica.',
  ];
  const benefits = [
    {
      icon: assetPath('/nutrition_orange.svg'),
      title: 'Integração Nutricional',
      description: 'Treino e dieta caminham juntos. Alinhamento com seu profissional ou indicação '
      + 'do nutricionista parceiro Henrique Nogueira.',
    },
    {
      icon: assetPath('/sell_orange.svg'),
      title: 'Parceria Probiótica',
      description: 'Alunos do Team Renato Lima possuem cupom exclusivo de 15% de desconto no site '
      + 'da Probiótica para otimizar suplementação.',
    },
    {
      icon: assetPath('/mobile_orange.svg'),
      title: 'App MFIT Personal',
      description: 'Tecnologia ao seu favor. Acompanhe gráficos de evolução, vídeos de exercícios '
      + 'e metas diretamente no celular.',
    },
  ];


  return (
    <section id='sobre' className={styles.about} aria-label='Sobre Renato Lima'>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>
            <span className={styles.highlightTitle}>Muito prazer, sou</span> <br/> Renato Lima
          </h2>
          {descriptions.map((description) => (
            <p key={description} className={styles.description}>{description}</p>
          ))}

          <p className={styles.note}>
            "Minha missão não é apenas entregar uma ficha, mas construir um
            sistema estratégico que ensina você a treinar com inteligência,
            garantindo resultados duradouros e sem lesões."
          </p>
        </div>

        <div className={styles.content}>
          <Image
            src={assetPath('/images/img_renato_lima.png')}
            alt="Renato Lima"
            width={520}
            height={520}
            className={styles.image}
          />
        </div>
      </div>
      <div className={`${styles.container} ${styles.containerBenefits}`}>
        <h3 className={styles.title} style={{ textAlign: 'center' }}>
          Um ecossistema completo
        </h3>
        <ul className={styles.benefitsList}>
          {benefits.map((benefit) => (
            <li key={benefit.title} className={styles.benefitCard}>
              <span className={styles.icon} aria-hidden='true'>
                <img src={benefit.icon} alt={benefit.title} width={40} height={40} />
              </span>
              <h4 className={styles.benefitTitle}>{benefit.title}</h4>
              <p className={styles.benefitDescription}>{benefit.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
