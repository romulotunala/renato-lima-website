import { sendGAEvent } from '@next/third-parties/google';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { trackEvent, trackPreDiagnosisResult, trackWhatsAppClicks } from './analytics';
import { whatsAppOriginProps } from './whatsapp';

vi.mock('@next/third-parties/google', () => ({ sendGAEvent: vi.fn() }));

describe('analytics', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.mocked(sendGAEvent).mockClear();
    document.body.innerHTML = '';
  });

  describe('trackEvent', () => {
    it('does nothing when NEXT_PUBLIC_GA_ID is not set', () => {
      vi.stubEnv('NEXT_PUBLIC_GA_ID', '');

      trackEvent('generate_lead', { origem: 'hero' });

      expect(sendGAEvent).not.toHaveBeenCalled();
    });

    it('sends the event to GA when NEXT_PUBLIC_GA_ID is set', () => {
      vi.stubEnv('NEXT_PUBLIC_GA_ID', 'G-TEST');

      trackEvent('generate_lead', { origem: 'hero' });

      expect(sendGAEvent).toHaveBeenCalledWith('event', 'generate_lead', { origem: 'hero' });
    });
  });

  it('sends the recommended plan when the pre-diagnosis result is reached', () => {
    vi.stubEnv('NEXT_PUBLIC_GA_ID', 'G-TEST');

    trackPreDiagnosisResult('storm');

    expect(sendGAEvent).toHaveBeenCalledWith(
      'event',
      'pre_diagnostico_resultado',
      { plano: 'storm' },
    );
  });

  describe('trackWhatsAppClicks', () => {
    let stopTracking: () => void;

    beforeEach(() => {
      vi.stubEnv('NEXT_PUBLIC_GA_ID', 'G-TEST');
      stopTracking = trackWhatsAppClicks(document);
    });

    afterEach(() => {
      stopTracking();
    });

    function addLink(attributes: Record<string, string> = {}) {
      const link = document.createElement('a');
      link.href = '#';
      link.innerHTML = '<span>Falar no WhatsApp</span>';
      Object.entries(attributes).forEach(([name, value]) => link.setAttribute(name, value));
      document.body.append(link);
      return link;
    }

    it('sends generate_lead with the link origin', () => {
      addLink(whatsAppOriginProps('plano:Storm Evolution')).click();

      expect(sendGAEvent).toHaveBeenCalledWith(
        'event',
        'generate_lead',
        { origem: 'plano:Storm Evolution' },
      );
    });

    it('tracks clicks on elements inside the link', () => {
      addLink(whatsAppOriginProps('hero')).querySelector('span')?.click();

      expect(sendGAEvent).toHaveBeenCalledWith('event', 'generate_lead', { origem: 'hero' });
    });

    it('ignores links without an origin', () => {
      addLink().click();

      expect(sendGAEvent).not.toHaveBeenCalled();
    });

    it('stops tracking after cleanup', () => {
      stopTracking();
      addLink(whatsAppOriginProps('cta')).click();

      expect(sendGAEvent).not.toHaveBeenCalled();
    });
  });
});
