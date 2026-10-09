import { sendGAEvent } from '@next/third-parties/google';
import type { PlanId } from '@/lib/pre-diagnosis/types';
import { WHATSAPP_ORIGIN_ATTR } from '@/lib/whatsapp';

type EventParams = Readonly<Record<string, string>>;

/** ID do GA4; sem ele (dev, testes e E2E locais) nada é carregado nem enviado. */
export function getGaId(): string | undefined {
  return process.env.NEXT_PUBLIC_GA_ID || undefined;
}

export function trackEvent(name: string, params: EventParams): void {
  if (!getGaId()) return;
  sendGAEvent('event', name, params);
}

export function trackPreDiagnosisResult(plan: PlanId): void {
  trackEvent('pre_diagnostico_resultado', { plano: plan });
}

/**
 * Dispara `generate_lead` ao clicar em qualquer link com `data-whatsapp-origin`, usando um único
 * listener delegado. Devolve a função que remove o listener.
 */
export function trackWhatsAppClicks(root: Document): () => void {
  const handleClick = (event: MouseEvent) => {
    if (!(event.target instanceof Element)) return;

    const link = event.target.closest(`[${WHATSAPP_ORIGIN_ATTR}]`);
    const origin = link?.getAttribute(WHATSAPP_ORIGIN_ATTR);

    if (origin) trackEvent('generate_lead', { origem: origin });
  };

  root.addEventListener('click', handleClick);
  return () => root.removeEventListener('click', handleClick);
}
