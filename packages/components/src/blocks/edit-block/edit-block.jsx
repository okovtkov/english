import Settings from '../../settings/settings';
import Header from '../../header/header';
import { useQuery } from '@tanstack/react-query';
import { api } from '@english/api';

export default function EditBlock({ uid }) {
  const { data: words = [], isLoading } = useQuery({
    queryFn: () => api.words.get(uid),
    queryKey: ['words'],
    select: (data) => data.sort((a, b) => a.words.createdAt - b.words.createdAt),
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60,
  });

  if (isLoading) return null;

  return (
    <>
      <Header uid={uid} />
      <Settings data={words} />
    </>
  );
}
