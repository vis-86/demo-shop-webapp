'use client';

import useMutation from '@/hooks/useMutation';

interface InitWebAppContextRequest {
  userId?: number,
  chatId?: number,
  username?: string,
}

export function useStartWebApp() {
  return useMutation<InitWebAppContextRequest, String>({
    url: '/api/webapp/init',
  });
}