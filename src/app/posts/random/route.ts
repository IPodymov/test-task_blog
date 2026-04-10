import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  // В JSONPlaceholder ровно 100 постов. Берем случайный номер от 1 до 100
  const randomId = Math.floor(Math.random() * 100) + 1;
  
  const response = NextResponse.redirect(new URL(`/posts/${randomId}`, request.url));
  // Добавляем заголовки, чтобы явно предотвратить кэширование редиректа браузером
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  response.headers.set('Pragma', 'no-cache');
  response.headers.set('Expires', '0');
  
  return response;
}