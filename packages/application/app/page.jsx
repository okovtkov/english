'use client';
import { Parts, Loading } from '@english/components';
import { api } from '@english/api';
import { useUserContext } from './layout';
import { useMiddlewareEffect } from '../hooks/use-middleware-effect.js';
import { useQuery, useQueryClient } from '@tanstack/react-query';

function Index() {
  const { user } = useUserContext();
  const { data: words, isLoading } = useQuery({
    queryFn: () => api.words.get(user.uid),
    queryKey: ['words'],
    select: (data) => data.sort((a, b) => a.words.createdAt - b.words.createdAt),
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60,
  });
  const client = useQueryClient();

  useMiddlewareEffect(() => {
    client.invalidateQueries(['words']);
  }, []);

  if (isLoading) return <Loading />;

  return <Parts data={words} />;
}

export default Index;
