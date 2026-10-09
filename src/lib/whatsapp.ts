import { PHONE } from '@/lib/site';

const WHATSAPP_BASE_URL = 'https://wa.me';
/** Atributo que identifica a origem do clique no evento `generate_lead` (src/lib/analytics.ts). */
export const WHATSAPP_ORIGIN_ATTR = 'data-whatsapp-origin';

export type WhatsAppOrigin =
  | 'navbar'
  | 'menu-mobile'
  | 'hero'
  | 'cta'
  | 'rodape'
  | 'pre-diagnostico'
  | `plano:${string}`;

export const DEFAULT_WHATSAPP_MESSAGE = 'Olá, Renato! Vim pelo site e gostaria de falar com você.';

export function buildWhatsAppLink(message = DEFAULT_WHATSAPP_MESSAGE): string {
  const sanitizedMessage = message.trim();
  const url = new URL(`${WHATSAPP_BASE_URL}/${PHONE.e164}`);

  if (sanitizedMessage.length > 0) {
    url.searchParams.set('text', sanitizedMessage);
  }

  return url.toString();
}

export function buildPlanWhatsAppLink(planName: string): string {
  const safePlanName = planName.trim();

  if (!safePlanName) {
    return buildWhatsAppLink();
  }

  const message = (
    'Olá, Renato! Vi o plano "'
    + safePlanName
    + '" no site e gostaria de saber mais sobre ele.'
  );

  return buildWhatsAppLink(message);
}

/** Props para espalhar no link do WhatsApp, informando a origem do clique ao rastreamento. */
export function whatsAppOriginProps(origin: WhatsAppOrigin) {
  return { [WHATSAPP_ORIGIN_ATTR]: origin } as { readonly 'data-whatsapp-origin': WhatsAppOrigin };
}
