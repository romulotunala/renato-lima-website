import { describe, expect, it } from 'vitest';
import {
  buildPlanWhatsAppLink,
  buildWhatsAppLink,
  DEFAULT_WHATSAPP_MESSAGE,
} from './whatsapp';

describe('whatsapp helpers', () => {
  it('uses a default message when no message is provided', () => {
    const url = buildWhatsAppLink();
    const searchParams = new URL(url).searchParams;

    expect(searchParams.get('text')).toBe(DEFAULT_WHATSAPP_MESSAGE);
  });

  it('encodes a custom message into the WhatsApp URL', () => {
    const url = buildWhatsAppLink('Olá, Renato! Quero saber mais.');
    const searchParams = new URL(url).searchParams;

    expect(searchParams.get('text')).toBe('Olá, Renato! Quero saber mais.');
  });

  it('builds a plan-specific message for plan selection', () => {
    const url = buildPlanWhatsAppLink('Personal Premium Presencial');
    const searchParams = new URL(url).searchParams;

    expect(searchParams.get('text')).toBe(
      'Olá, Renato! Vi o plano "Personal Premium Presencial" no site e gostaria de saber mais ' +
      'sobre ele.',
    );
  });
});
