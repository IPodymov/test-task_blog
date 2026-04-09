import { getPosts } from '@/lib/api';
import { PostCard } from '@/components/PostCard/PostCard';
import { Pagination } from '@/components/Pagination/Pagination';
import styles from './page.module.css';
import Image from 'next/image';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const pageStr = resolvedParams.page;
  const page = typeof pageStr === 'string' ? parseInt(pageStr, 10) : 1;
  const ITEMS_PER_PAGE = 9;
  
  const { data: posts, totalCount } = await getPosts(page, ITEMS_PER_PAGE);

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.heroImageWrapper}>
            <Image
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
                alt="Technology hero"
                layout="fill"
                objectFit="cover"
                className={styles.heroImage}
                priority
            />
        </div>
        <div className={styles.heroCard}>
            <span className={styles.category}>Technology</span>
            <h2 className={styles.heroTitle}>The Impact of Technology on the Workplace: How Technology is Changing</h2>
            <div className={styles.authorGroup}>
                <div className={styles.author}>
                    <Image src="https://i.pravatar.cc/150?u=hero" alt="Jason Francisco" width={36} height={36} className={styles.avatar} />
                    <span className={styles.authorName}>Jason Francisco</span>
                </div>
                <span className={styles.date}>August 20, 2022</span>
            </div>
        </div>
      </section>

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
