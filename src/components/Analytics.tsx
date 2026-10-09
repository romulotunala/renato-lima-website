'use client';

import { useEffect } from 'react';
import { trackWhatsAppClicks } from '@/lib/analytics';

/** Registra o rastreamento dos cliques nos links do WhatsApp. */
export function Analytics() {
  useEffect(() => trackWhatsAppClicks(document), []);

  return null;
}
