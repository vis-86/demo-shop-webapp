'use client';

import axios, { AxiosError, AxiosResponse, CancelToken } from 'axios';
import createError from '@/components/error/create-error';
import Error from '@/components/error/interface';
import * as process from 'process';

export interface PostResponse<T> {
  data?: T | null;
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

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function clientPost<T>(url: string, params: any = {}, options: Options = {}): Promise<PostResponse<T>> {
  const reqUrl = `${BASE_PATH}${url}`;

  return axios
    .post<T>(reqUrl, params, options)
    .then((response: AxiosResponse<T>) => createResponse<T>(response))
    .catch((error: AxiosError<Error>) => {
      if (error.response?.data?.type === 'ERR_CANCELED' || error.code === 'ERR_CANCELED') {
        return { error: null };
      }
      return { error: createError(error), data: null };
    });
}

export function clientUrlFormedPost(url: string, params: any = {}): Promise<any> {
  const reqUrl = `${BASE_PATH}${url}`;

  return axios
    .post(
      reqUrl,
      new URLSearchParams(params).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        }
      }
    );
}


export function handleApi<T>(props: {
  url: string;
  params?: any;
}): Promise<PostResponse<T>> {
  const cancelToken = axios.CancelToken;
  const source = cancelToken.source();
  return clientPost<T>(props.url, props.params, { cancelToken: source.token })
}