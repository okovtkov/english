import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserContext } from '../app/layout';

export function useMiddlewareEffect(callback, deps = []) {
  const router = useRouter();
  const { user } = useUserContext();

  useEffect(() => {
    if (!user) {
      router.push('/auth');
      return;
    }
    if (callback) callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps]);
}
