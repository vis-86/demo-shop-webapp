'use server';

import createError from '@/components/error/create-error';
import { NextResponse } from 'next/server';
import { serverPost } from '@/fetcher/ServerFetcher';
import { URLSearchParams } from 'url';
import { cookies } from 'next/headers'

export async function POST(req: Request, res: NextResponse) {
  const url = (new URL(req.url)).pathname.replace('/api', '');

  if (req.headers.get('Content-Type') === 'application/x-www-form-urlencoded') {
    const params = new URLSearchParams(await req.text()).toString() || "";
    const { data: tgSessionId } = await serverPost<string>({ url, params });

    if (tgSessionId) {
      if (cookies().has('tg_session')) {
        cookies().delete('tg_session')
      }
      cookies().set('tg_session', tgSessionId);
    }

    return NextResponse.json({});
  }

  const error = createError({
    title: 'Unauthorized request',
    type: 'Unauthorized',
    status: 401,
    detail: `Unauthorized request to ${req.url}`,
  });
  NextResponse.json(error, { status: 401 });
}
