export const WHATSAPP_PHONE_NUMBER = '5521991425161';
export const WHATSAPP_BASE_URL = 'https://wa.me';
export const DEFAULT_WHATSAPP_MESSAGE = 'Olá, Renato! Vim pelo site e gostaria de falar com você.';

export function buildWhatsAppLink(message = DEFAULT_WHATSAPP_MESSAGE): string {
  const sanitizedMessage = message.trim();
  const url = new URL(`${WHATSAPP_BASE_URL}/${WHATSAPP_PHONE_NUMBER}`);

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
