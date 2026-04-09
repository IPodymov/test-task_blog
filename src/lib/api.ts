import { Post, PaginationResult } from '@/types/post';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export async function getPosts(page: number = 1, limit: number = 10): Promise<PaginationResult<Post>> {
  const response = await fetch(`${API_BASE_URL}/posts?_page=${page}&_limit=${limit}`, {
    next: { revalidate: 3600 }, // Optional caching
  });

  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }

  const data: Post[] = await response.json();
  const totalCount = parseInt(response.headers.get('x-total-count') || '0', 10);

  return {
    data,
    totalCount,
  };
}

export async function getPostById(id: number | string): Promise<Post> {
  const response = await fetch(`${API_BASE_URL}/posts/${id}`);
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Post not found');
    }
    throw new Error('Failed to fetch post');
  }

  return response.json();
}
