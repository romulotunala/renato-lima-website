"use client";

import { useEffect } from 'react';
import styles from './SocialFeed.module.scss';

export function SocialFeed() {
  useEffect(() => {
    const id = 'elfsight-script';
    if (document.getElementById(id)) return;
    const s = document.createElement('script');
    s.src = 'https://elfsightcdn.com/platform.js';
    s.id = id;
    s.async = true;
    document.body.appendChild(s);
  }, []);

  return (
    <section className={styles.feed} aria-label="Conteúdo do Instagram">
      <div className={styles.container}>
        <div className="elfsight-app-eaaab370-ef76-4894-a63b-f100fe8fb5da" data-elfsight-app-lazy />
      </div>
    </section>
  );
}
