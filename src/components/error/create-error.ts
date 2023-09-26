import { AxiosError } from 'axios';
import Error from './interface';
import { v4 } from 'uuid';

/**
 * @param {AxiosError} error request error
 * @return {Error} error with rfc standard
 */
export default function createError(error: Error | AxiosError<Error>): Error {
  if ((error as Error).title) {
    return {
      errorId: v4(),
      ...error,
    };
  }

  const result: Error = {
    errorId: (error as AxiosError<Error>).response?.data?.errorId || v4(),
    title: (error as AxiosError<Error>).response?.data?.title || (error as AxiosError<Error>).message || null,
    type: (error as AxiosError<Error>).response?.data?.type || (error as AxiosError<Error>).code || null,
    status: (error as AxiosError<Error>).response?.data?.status || error.status || null,
    detail: (error as AxiosError<Error>).response?.data?.detail || null,
  };

  return result;
}
