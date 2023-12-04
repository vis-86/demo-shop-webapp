'use server';

import axios, { AxiosError, AxiosResponse, CancelToken } from 'axios';
import createError from '@/components/error/create-error';
import Error from '@/components/error/interface';
import { cookies } from 'next/headers';

export interface PostResponse<T> {
  data?: T | undefined;
  status?: number;
  error?: Error | null;
}

function createResponse<T>(response: AxiosResponse): { data: T, status: number, error: null } {
  return {
    data: response?.data,
    status: response?.status,
    error: null,
  };
}

interface Options {
  headers?: Record<string, string>;
  cancelToken?: CancelToken;
}

interface PostProps {
  url: string
  baseUrl?: string;
  params?: any;
  options?: Options;
}

export async function serverPost<T>(props: PostProps): Promise<PostResponse<T>> {
  const { url, params } = props
  const baseUrl = process.env.API_BASE_URL

  const sessionCookie = cookies().get('tg_session')?.value
  const optionHeaders = props.options?.headers || {}
  if (sessionCookie) {
    optionHeaders['tg_session'] = sessionCookie
  }

  const options: Options = {
    ...(props.options || {}),
    headers: { ...optionHeaders },
  }

  return axios
    .post<T>(baseUrl + url, params || {}, options)
    .then((response: AxiosResponse<T>) => createResponse<T>(response))
    .catch((error: AxiosError<Error>) => {
      if (error.response?.data?.type === 'ERR_CANCELED' || error.code === 'ERR_CANCELED') {
        return { error: null };
      }
      return { error: createError(error), data: undefined };
    });
}

export async function mediaGet<T>(url: string): Promise<T> {

  const baseUrl = process.env.API_BASE_URL;

  return axios
    .get<T>(baseUrl + url, { responseType: "stream" })
    .then((response: AxiosResponse<T>) => response.data)
}
