'use server';

import { mediaGet } from '@/fetcher/ServerFetcher';

export async function GET(req: Request) {
    const url = (new URL(req.url)).pathname.replace('/api', '');
    const response = await mediaGet<any>(url);
    return new Response(response);
}
