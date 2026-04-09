import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  // JSONPlaceholder has exactly 100 posts. Pick a random one between 1 and 100
  const randomId = Math.floor(Math.random() * 100) + 1;
  
  const response = NextResponse.redirect(new URL(`/posts/${randomId}`, request.url));
  // Add headers to explicitly prevent browser caching of the redirect
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  response.headers.set('Pragma', 'no-cache');
  response.headers.set('Expires', '0');
  
  return response;
}