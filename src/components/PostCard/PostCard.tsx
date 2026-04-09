import Link from "next/link";
import { Post } from "@/types/post";
import styles from "./PostCard.module.css";
import Image from "next/image";

interface PostCardProps {
  post: Post;
  page?: number;
}

export function PostCard({ post, page }: PostCardProps) {
  // Generate random IDs for visual realism since DummyJSON isn't strictly giving user image dates in standard API
  const randomImageId = (post.id % 20) + 1;
  const authorName = "Jason Francisco"; 
  const authorAvatar = `https://i.pravatar.cc/150?u=${post.userId || post.id}`;
  const dateStr = "August 20, 2022";

  return (
    <article className={styles.card}>
      <Link href={`/posts/${post.id}${page ? `?page=${page}` : ""}`} className={styles.imageLink}>
        {/* Placeholder image from Unsplash */}
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
