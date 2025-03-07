import Parts from '../../parts/parts';
import Loading from '../../loading/loading';
import { api } from '@english/api';
import { useQuery } from '@tanstack/react-query';
import Header from '../../header/header';

export default function IndexBlock({ uid }) {
  const { data: words, isLoading } = useQuery({
    queryFn: () => api.words.get(uid),
    queryKey: ['words'],
    select: (data) => data.sort((a, b) => a.words.createdAt - b.words.createdAt),
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60,
  });

  if (isLoading) return <Loading />;

  return (
    <>
      <Header uid={uid} />
      <Parts data={words} />
    </>
  );
}
