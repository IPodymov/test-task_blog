import Link from "next/link";
import { Post } from "@/types/post";
import { getUserById } from "@/lib/api";
import styles from "./PostCard.module.css";
import Image from "next/image";

interface PostCardProps {
  post: Post;
  page?: number;
}

const months = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];

function generateDate(id: number) {
  const day = (id % 28) + 1;
  const month = months[id % 12];
  const year = 2020 + (id % 4);
  return `${month} ${day}, ${year}`;
}

export async function PostCard({ post, page }: PostCardProps) {
  let authorName = "Unknown Author";
  
  // Генерируем ID автора (от 1 до 10) на основе ID поста 
  // для визуального разнообразия карточек
  const fakeUserId = (post.id % 10) + 1;

  try {
    const user = await getUserById(fakeUserId);
    authorName = user.name;
  } catch (e) {
    console.error("User not found");
  }

  const authorAvatar = `https://i.pravatar.cc/150?u=${fakeUserId}`;
  const dateStr = generateDate(post.id);

  return (
    <article className={styles.card}>
      <Link href={`/posts/${post.id}${page ? `?page=${page}` : ""}`} className={styles.imageLink}>
        <div className={styles.imageWrapper}>
          <Image 
            src={`https://picsum.photos/seed/${post.id + 100}/600/400`}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            className={styles.image}
          />
        </div>
      </Link>
      
      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={styles.category}>Technology</span>
        </div>
        
        <h2 className={styles.title}>
          <Link href={`/posts/${post.id}${page ? `?page=${page}` : ""}`}>
            {post.title}
          </Link>
        </h2>
        
        <div className={styles.authorGroup}>
          <div className={styles.author}>
            <Image 
              src={authorAvatar} 
              alt={authorName} 
              width={36} 
              height={36} 
              className={styles.avatar} 
            />
            <span className={styles.authorName}>{authorName}</span>
          </div>
          <span className={styles.date}>{dateStr}</span>
        </div>
      </div>
    </article>
  );
}
