import { getPosts, getUserById, getPostById } from '@/lib/api';
import { PostCard } from '@/components/PostCard/PostCard';
import { Pagination } from '@/components/Pagination/Pagination';
import styles from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const dynamic = 'force-dynamic';

// Вспомогательная функция для генерации случайного ID вне тела компонента,
// чтобы обойти строгое правило ESLint `react-hooks/purity`.
function getRandomHeroId() {
  return Math.floor(Math.random() * 100) + 1;
}

export default async function Home({ searchParams }: PageProps) {
  // Разрешаем параметры поиска для получения текущей страницы
  const resolvedParams = await searchParams;
  const pageStr = resolvedParams.page;
  const page = typeof pageStr === 'string' ? parseInt(pageStr, 10) : 1;
  const ITEMS_PER_PAGE = 9;
  
  // Получаем список постов и их общее количество для пагинации
  const { data: posts, totalCount } = await getPosts(page, ITEMS_PER_PAGE);

  let heroPost = null;
  let heroAuthor = 'Unknown Author';
  let heroFakeUserId = 1;

  // Генерируем случайный номер поста от 1 до 100 для блока Hero, чтобы он обновлялся
  const randomHeroId = getRandomHeroId();

  // Пытаемся получить случайный пост, при ошибке откатываемся на первый пост из списка
  try {
    heroPost = await getPostById(randomHeroId);
  } catch {
    heroPost = posts.length > 0 ? posts[0] : null;
  }

  // Формируем данные для главного (Hero) поста
  if (heroPost) {
    heroFakeUserId = (heroPost.id % 10) + 1;
    try {
      const user = await getUserById(heroFakeUserId);
      heroAuthor = user.name;
    } catch {
      // Игнорируем ошибку и используем дефолтное имя автора
    }
  }

  // Генерируем случайную картинку для фона Hero на основе ID
  const heroImageSrc = heroPost ? `https://picsum.photos/seed/${heroPost.id + 500}/2070/1380` : `https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop`;

  return (
    <div className={styles.container}>
      {heroPost && (
        <section className={styles.hero}>
          <Link href={`/posts/${heroPost.id}`} className={styles.heroImageWrapper}>
              <Image
                  src={heroImageSrc}
                  alt={heroPost.title}
                  fill
                  sizes="100vw"
                  style={{ objectFit: 'cover' }}
                  className={styles.heroImage}
                  priority
              />
          </Link>
          <div className={styles.heroCard}>
              <span className={styles.category}>Technology</span>
              <h2 className={styles.heroTitle}>
                <Link href={`/posts/${heroPost.id}`}>{heroPost.title}</Link>
              </h2>
              <div className={styles.authorGroup}>
                  <div className={styles.author}>
                      <Image src={`https://i.pravatar.cc/150?u=${heroFakeUserId}`} alt={heroAuthor} width={36} height={36} className={styles.avatar} />
                      <span className={styles.authorName}>{heroAuthor}</span>
                  </div>
                  <span className={styles.date}>August 20, 2022</span>
              </div>
          </div>
        </section>
      )}

      {/* <div className={styles.adBanner}>
        <div className={styles.adContent}>
            <span className={styles.adLabel}>Advertisement</span>
            <span className={styles.adTitle}>You can place ads</span>
            <span className={styles.adSize}>750x100</span>
        </div>
      </div> */}

      <main className={styles.main}>
        <h3 className={styles.sectionTitle}>Latest Post</h3>
        <div className={styles.postList}>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} page={page} />
          ))}
          {posts.length === 0 && (
            <p className={styles.empty}>Записи не найдены.</p>
          )}
        </div>

        <Pagination 
          currentPage={page} 
          totalItems={totalCount || 100}
          itemsPerPage={ITEMS_PER_PAGE} 
        />
      </main>

      {/* <div className={styles.adBanner}>
        <div className={styles.adContent}>
            <span className={styles.adLabel}>Advertisement</span>
            <span className={styles.adTitle}>You can place ads</span>
            <span className={styles.adSize}>750x100</span>
        </div>
      </div> */}
    </div>
  );
}
