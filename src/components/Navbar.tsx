'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { assetPath } from '@/lib/assets';
import styles from './Navbar.module.scss';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onRoute = () => setOpen(false);
    window.addEventListener('hashchange', onRoute);
    return () => window.removeEventListener('hashchange', onRoute);
  }, [open]);

  return (
    <header id="navbar" className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
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
          <Link href="#metodo">O Método</Link>
          <Link href="#planos">Serviços</Link>
          <Link href="#sobre">Sobre</Link>
          <Link href="#faq">FAQ</Link>
          <a
            href="https://wa.me/5521991425161"
            target="_blank"
            rel="noreferrer"
            className={styles.cta}
          >
            Falar com o Personal
          </a>
        </nav>

        <button
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
          <Link href="#metodo" onClick={() => setOpen(false)}>O Método</Link>
          <Link href="#planos" onClick={() => setOpen(false)}>Serviços</Link>
          <Link href="#sobre" onClick={() => setOpen(false)}>Sobre</Link>
          <Link href="#faq" onClick={() => setOpen(false)}>FAQ</Link>
          <a
            href="https://wa.me/5521991425161"
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
