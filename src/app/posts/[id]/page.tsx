import { getPostById } from "@/lib/api";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import styles from "./page.module.css";
import { RandomPostButton } from "./RandomPostButton";

interface PostPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function PostPage({
  params,
  searchParams,
}: PostPageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const idStr = resolvedParams.id;
  const pageStr = resolvedSearchParams.page;

  let post;
  try {
    post = await getPostById(idStr);
  } catch {
    notFound();
  }

  const backLink = pageStr ? `/?page=${pageStr}` : "/";
  const authorName = "Tracey Wilson";
  const dateStr = "August 20, 2022";
  const avatarUrl = `https://i.pravatar.cc/150?u=${post.userId || post.id}`;
  const bannerImage = `https://picsum.photos/seed/${post.id + 200}/1200/600`;
  const inlineImage = `https://picsum.photos/seed/${post.id + 300}/800/400`;

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <span className={styles.category}>Technology</span>
        <h1 className={styles.title}>{post.title}</h1>

        <div className={styles.authorGroup}>
          <div className={styles.author}>
            <Image
              src={avatarUrl}
              alt={authorName}
              width={36}
              height={36}
              className={styles.avatar}
            />
            <span className={styles.authorName}>{authorName}</span>
          </div>
          <span className={styles.date}>{dateStr}</span>
        </div>
      </header>

      <div className={styles.bannerWrapper}>
        <Image
          src={bannerImage}
          alt={post.title}
          layout="fill"
          objectFit="cover"
          className={styles.bannerImage}
          priority
        />
      </div>

      <article className={styles.content}>
        <p className={styles.paragraph}>{post.body}</p>
        <p className={styles.paragraph}>
          Traveling is an enriching experience that opens up new horizons,
          exposes us to different cultures, and creates memories that last a
          lifetime. However, traveling can also be stressful and overwhelming,
          especially if you don&apos;t plan and prepare adequately. In this blog
          article, we&apos;ll explore tips and tricks for a memorable journey
          and how to make the most of your travels.
        </p>

        <h2 className={styles.heading2}>Research Your Destination</h2>
        <p className={styles.paragraph}>
          Before embarking on your journey, take the time to research your
          destination. This includes understanding the local culture, customs,
          and laws, as well as identifying top attractions, restaurants, and
          accommodations. Doing so will help you navigate your destination with
          confidence and avoid any cultural faux pas.
        </p>

        <blockquote className={styles.quote}>
          &quot; Traveling can expose you to new environments and potential
          health risks, so it&apos;s crucial to take precautions to stay safe
          and healthy. &quot;
        </blockquote>

        <div className={styles.inlineImageWrapper}>
          <Image
            src={inlineImage}
            alt="Inline content image"
            layout="fill"
            objectFit="cover"
            className={styles.inlineImage}
          />
        </div>

        <div className={styles.adBanner}>
          <div className={styles.adContent}>
            <span className={styles.adLabel}>Advertisement</span>
            <span className={styles.adTitle}>You can place ads</span>
            <span className={styles.adSize}>750x100</span>
          </div>
        </div>

        <h2 className={styles.heading2}>Pack Lightly and Smartly</h2>
        <p className={styles.paragraph}>
          Packing can be a daunting task, but with some careful planning and
          smart choices, you can pack light and efficiently. Start by making a
          packing list and sticking to it, focusing on versatile and comfortable
          clothing that can be mixed and matched.
        </p>
      </article>

      <div className={styles.navigation}>
        <Link href={backLink} className={styles.backLink}>
          &larr; Назад к списку
        </Link>
        <RandomPostButton />
      </div>
    </main>
  );
}
