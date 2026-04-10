import { getPosts, getUserById } from '@/lib/api';
import { PostCard } from '@/components/PostCard/PostCard';
import { Pagination } from '@/components/Pagination/Pagination';
import styles from './page.module.css';
import Image from 'next/image';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
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
  let heroAuthor = 'Jason Francisco';
  let heroFakeUserId = 1;

  // Формируем данные для главного (Hero) поста на основе первого элемента списка
  if (posts.length > 0) {
    heroPost = posts[0];
    heroFakeUserId = (heroPost.id % 10) + 1;
    try {
      const user = await getUserById(heroFakeUserId);
      heroAuthor = user.name;
    } catch {
      // Игнорируем ошибку и используем дефолтное имя автора
    }
  }

  return (
    <div className={styles.container}>
      {heroPost && (
        <section className={styles.hero}>
          <div className={styles.heroImageWrapper}>
              <Image
                  src={`https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop`}
                  alt={heroPost.title}
                  layout="fill"
                  objectFit="cover"
                  className={styles.heroImage}
                  priority
              />
          </div>
          <div className={styles.heroCard}>
              <span className={styles.category}>Technology</span>
              <h2 className={styles.heroTitle}>{heroPost.title}</h2>
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

      <div className={styles.adBanner}>
        <div className={styles.adContent}>
            <span className={styles.adLabel}>Advertisement</span>
            <span className={styles.adTitle}>You can place ads</span>
            <span className={styles.adSize}>750x100</span>
        </div>
      </div>

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

      <div className={styles.adBanner}>
        <div className={styles.adContent}>
            <span className={styles.adLabel}>Advertisement</span>
            <span className={styles.adTitle}>You can place ads</span>
            <span className={styles.adSize}>750x100</span>
        </div>
      </div>
    </div>
  );
}
