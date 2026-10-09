import { describe, expect, it } from 'vitest';
import { buildPreDiagnosisLink, buildPreDiagnosisMessage } from './message';
import type { Answers } from './types';

const BASE_ANSWERS: Answers = {
  nome: 'Ana',
  objetivo: 'hipertrofia',
  treina: 'as-vezes',
  dor: 'nao',
  dificuldade: 'constancia',
  inicio: 'o-quanto-antes',
};

describe('buildPreDiagnosisMessage', () => {
  it('builds the duo message with schedule and partner lines', () => {
    const message = buildPreDiagnosisMessage({
      ...BASE_ANSWERS,
      modalidade: 'dupla',
      parceiro: 'sim',
      regiao: ' Recreio ',
      periodo: 'noite',
      dor: 'sim',
      dorLocal: ['ombros', 'joelhos'],
    }, 'dupla');

    expect(message).toBe([
      'Olá, Renato! Vim pelo seu site e respondi ao pré-diagnóstico.',
      '',
      '*Meu nome*: Ana',
      '*Objetivo*: Hipertrofia',
      '*Interesse indicado*: Personal em Dupla',
      '*Treino atualmente*: Às vezes',
      '*Dor ou limitação*: Ombros, Joelhos',
      '*Maior dificuldade*: Falta de constância',
      '*Pretendo começar*: O quanto antes',
      '*Região*: Recreio',
      '*Disponibilidade*: Noite',
      '*Já tenho alguém para treinar comigo*: Sim',
      '',
      'Gostaria de verificar disponibilidade e entender melhor como funciona o Personal em Dupla.',
    ].join('\n'));
  });

  it('omits schedule and partner lines for online plans', () => {
    const message = buildPreDiagnosisMessage(
      { ...BASE_ANSWERS, modalidade: 'online', focoOnline: 'storm' },
      'storm',
    );

    expect(message).toContain('*Interesse indicado*: Storm Evolution');
    expect(message).toContain('*Dor ou limitação*: Não');
    expect(message).not.toContain('*Região*');
    expect(message).not.toContain('*Disponibilidade*');
    expect(message).not.toContain('Já tenho alguém');
    expect(message).toMatch(/verificar os próximos passos\.$/);
  });

  it('skips the partner line when the duo plan came from "Ainda não sei"', () => {
    const message = buildPreDiagnosisMessage(
      { ...BASE_ANSWERS, modalidade: 'indeciso', situacao: 'dupla', regiao: 'Barra' },
      'dupla',
    );

    expect(message).toContain('*Região*: Barra');
    expect(message).not.toContain('Já tenho alguém');
  });
});

describe('buildPreDiagnosisLink', () => {
  it('encodes the message into the WhatsApp link', () => {
    const answers: Answers = { ...BASE_ANSWERS, modalidade: 'presencial' };
    const url = new URL(buildPreDiagnosisLink(answers, 'presencial'));

    expect(url.origin + url.pathname).toBe('https://wa.me/5521991425161');
    expect(url.searchParams.get('text')).toBe(buildPreDiagnosisMessage(answers, 'presencial'));
  });
});
