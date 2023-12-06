'use server';

import createError from '@/components/error/create-error';
import { NextResponse } from 'next/server';
import { serverPost } from '@/fetcher/ServerFetcher';

export async function POST(req: Request) {
  const session = {}; //await getServerSession(auth);

  if (session) {
    const url = (new URL(req.url)).pathname.replace('/api', '');
    const params = (await req.json()) || {};
    const response = await serverPost({ url, params });

    if (response.error) {
      return NextResponse.json(response.error, { status: response.error?.status || 500 });
    }

    return NextResponse.json(response.data, { status: response.status });
  }

  const error = createError({
    title: 'Unauthorized request',
    type: 'Unauthorized',
    status: 401,
    detail: `Unauthorized request to ${req.url}`,
  });
  NextResponse.json(error, { status: 401 });
}
