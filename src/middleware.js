import { NextResponse } from 'next/server';

export function middleware(request) {
  // Clone the request headers so we can modify them
  const requestHeaders = new Headers(request.headers);

  // Check if the Range header exists and remove it
  if (requestHeaders.has('range')) {
    requestHeaders.delete('range');
  }

  // Create a new response with the modified headers
  const response = NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders,
    },
  });

  return response;
}

export const config = {
  // Match all request paths
  matcher: '/:path*',
}; 