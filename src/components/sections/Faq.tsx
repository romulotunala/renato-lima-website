'use client';

import { useState } from 'react';
import styles from './Faq.module.scss';
import { assetPath } from '@/lib/assets';

export function Faq() {
  const [activeFaqItem, setActiveFaqItem] = useState<number | null>(null);
  const faqItems = [
    {
      id: 1,
      question: 'Como funciona o acompanhamento do Personal Renato Lima?',
      answer: [{
        id: '1.1',
        label: '',
        text: 'Cada aluno passa por uma avaliação inicial e recebe um planejamento 100% '
        + 'individualizado conforme seus objetivos, rotina e nível de condicionamento. Nada é '
        + 'genérico ou padronizado.',
      }],
    },
    {
      id: 2,
      question: 'Qual a diferença entre Presencial, Consultoria e Plano Storm?',
      answer: [
        {
          id: '2.1',
          label: 'Presencial:',
          text: ' acompanhamento ao vivo nos treinos.',
        },
        {
          id: '2.2',
          label: 'Consultoria Online:',
          text: ' treino no app + acompanhamento semanal via WhatsApp.',
        },
        {
          id: '2.3',
          label: 'Plano Storm:',
          text: ' treino focado para 4 semanas, estruturado e com ótimo custo-benefício, '
          + 'mas sem suporte semanal.',
        },
      ],
    },
    {
      id: 3,
      question: 'Tenho dor na coluna, joelho ou ombro. Posso treinar?',
      answer: [{
        id: '3.1',
        label: '',
        text: 'Na maioria dos casos, sim. Por ser pós-graduado em Biomecânica, primeiro realizo '
        + 'uma avaliação criteriosa para entender sua condição e adaptar completamente a seleção '
        + 'de exercícios, focando inclusive na reabilitação e alívio das dores.',
      }],
    },
    {
      id: 4,
      question: 'Em quanto tempo recebo meu treino?',
      answer: [{
        id: '4.1',
        label: '',
        text: 'Após o preenchimento e envio de todas as informações da avaliação/anamnese, seu '
        + 'planejamento estratégico é entregue no aplicativo em até 48 horas úteis.',
      }],
    },
  ];

  const toggleFaqItem = (id: number) => {
    setActiveFaqItem((prevId) => (prevId === id ? null : id));
  };
  return (
    <section className={styles.faq} id="faq" aria-label="Perguntas frequentes">
      <h2 className={styles.title}>
        Perguntas <span className={styles.highlightTitle}>Frequentes</span>
      </h2>
      <p className={styles.subtitle}>Tudo o que você precisa saber antes de iniciar.</p>
      <ul className={styles.faqList}>
        {faqItems.map((item) => (
          <li key={item.id} className={styles.faqItem}>
            <button
              type="button"
              className={styles.question}
              aria-expanded={activeFaqItem === item.id}
              aria-controls={`faq-answer-${item.id}`}
              onClick={() => toggleFaqItem(item.id)}
            >
              <span>{item.question}</span>
              <span
                className={`${styles.indicator} ${
                  activeFaqItem === item.id ? styles.indicatorOpen : ''
                }`}
                aria-hidden="true"
              >
                <img src={assetPath('/arrow_down.svg')} alt="" width={24} height={24} />
              </span>
            </button>
            {activeFaqItem === item.id && (
              <div id={`faq-answer-${item.id}`} className={styles.answer}>
                {item.answer.map((answer) => (
                  <p key={answer.id}>
                    {answer.label && <strong>{answer.label} </strong>}
                    {answer.text}
                  </p>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
