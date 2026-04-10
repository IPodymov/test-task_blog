'use client';

import Link from 'next/link';
import { IconSearch, IconSun, IconMoon } from '@tabler/icons-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import styles from './Header.module.css';

export function Header() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Отложенный вызов во избежание ошибки React Compiler на синхронный setState внутри effect
    const timeout = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timeout);
  }, []);

  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">
            <span className={styles.logomark}>M</span>
            <span className={styles.logotext}>Meta<strong>Blog</strong></span>
          </Link>
        </div>
        
        <nav className={styles.nav}>
          <Link href="/">Home</Link>
          <Link href="/posts/random" prefetch={false}>Single Post</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        <div className={styles.actions}>
          <div className={styles.search}>
            <input type="text" placeholder="Search" />
            <IconSearch size={20} className={styles.searchIcon} />
          </div>
          <button 
            className={styles.themeToggle} 
            aria-label="Toggle Theme"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
          >
            <span className={`${styles.toggleTrack} ${isDark ? styles.darkTrack : ''}`}>
              {isDark ? (
                <IconMoon size={14} className={styles.moon} />
              ) : (
                <IconSun size={14} className={styles.sun} />
              )}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
