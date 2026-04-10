import Link from "next/link";
import styles from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
}

export function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) {
    return null;
  }

  // Массив номеров страниц для отображения
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <Link
        href={`/?page=${currentPage - 1}`}
        className={`${styles.button} ${currentPage === 1 ? styles.disabled : ""}`}
        aria-disabled={currentPage === 1}
        tabIndex={currentPage === 1 ? -1 : undefined}
      >
        Назад
      </Link>

      <div className={styles.pages}>
        {pages.map((page) => (
          <Link
            key={page}
            href={`/?page=${page}`}
            className={`${styles.pageLink} ${currentPage === page ? styles.active : ""}`}
            aria-current={currentPage === page ? "page" : undefined}
          >
            {page}
          </Link>
        ))}
      </div>

      <Link
        href={`/?page=${currentPage + 1}`}
        className={`${styles.button} ${currentPage === totalPages ? styles.disabled : ""}`}
        aria-disabled={currentPage === totalPages}
        tabIndex={currentPage === totalPages ? -1 : undefined}
      >
        Вперед
      </Link>
    </nav>
  );
}
