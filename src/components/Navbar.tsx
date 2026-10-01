'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { assetPath } from '@/lib/assets';
import { NAV_LINKS } from '@/lib/site';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import styles from './Navbar.module.scss';

const SCROLL_THRESHOLD = 20;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      menuButtonRef.current?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (headerRef.current?.contains(event.target as Node)) return;
      setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);

  return (
    <header
      ref={headerRef}
      id="navbar"
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
    >
      <div className={styles.inner}>
        <button type="button" className={styles.brand} onClick={() => window.scrollTo(0, 0)}>
          <Image
            src={assetPath('/images/logo_renato_white.png')}
            alt="Renato Lima"
            width={220}
            height={56}
            className={styles.logoImg}
            priority
          />
        </button>

        <nav className={styles.links} aria-label="Menu principal">
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href}>{label}</Link>
          ))}
          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noreferrer"
            className={styles.cta}
          >
            Falar com o Personal
          </a>
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          className={styles.mobileBtn}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`${styles.mobilePanel} ${open ? styles.open : ''}`}
        aria-hidden={!open}
      >
        <div className={styles.mobileMenuContent}>
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>
          ))}
          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noreferrer"
            className={styles.mobileCta}
            onClick={() => setOpen(false)}
          >
            Falar no WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}
