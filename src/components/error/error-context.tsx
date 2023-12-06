'use client';

import { Dispatch, SetStateAction, useState, createContext, useContext } from 'react';
import ErrorWidget from './error-widget';
import Error from './interface';
import { CartContext } from '@/contexts/cart';
import PreLoader from '../loader/PreLoader';

interface ErrorContextResponse {
  errors: Error[];
  setErrors: Dispatch<SetStateAction<Error[]>>;
}

export const ErrorContext = createContext<ErrorContextResponse>({
  errors: [],
  setErrors: () => null,
});

export function ErrorProvider(props: { children: any, errors?: Error[] }) {
  const [errors, setErrors] = useState<Error[]>(props.errors || []);

  const closeError = (errorId?: string): void => {
    setErrors((prevState) => prevState.filter((err) => err.errorId !== errorId));
  };

  const cart = useContext(CartContext)

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ErrorContext.Provider value={{ errors, setErrors }}>
      {errors?.map((error, index) => (
        <ErrorWidget
          key={`${error?.errorId}-${index}`}
          error={error}
          onClose={() => closeError(error?.errorId)}
          index={index}
        />
      ))}

      {cart.sessionInit ? props.children : <PreLoader />}
    </ErrorContext.Provider>
  );
}
