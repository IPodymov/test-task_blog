'use client';

import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export function RandomPostButton() {
  const router = useRouter();

  const handleRandomClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // JSONPlaceholder API гарантированно содержит 100 постов. 
    // Ограничение от 1 до 100 позволяет избежать 404 ошибок.
    const randomId = Math.floor(Math.random() * 100) + 1;
    router.push(`/posts/${randomId}`, { scroll: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button onClick={handleRandomClick} className={styles.nextLink} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 'inherit', fontFamily: 'inherit' }}>
      Случайный пост &rarr;
    </button>
  );
}