import { Settings } from '@english/components';
import { useUserContext } from '../layout';
import { useQuery } from '@tanstack/react-query';
import { api } from '@english/api';

function Edit() {
  const { user } = useUserContext();
  const { data: words = [], isLoading } = useQuery({
    queryFn: () => api.words.get(user.uid),
    queryKey: ['words'],
    select: (data) => data.sort((a, b) => a.words.createdAt - b.words.createdAt),
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60,
  });

  if (isLoading) return null;

  return <Settings data={words} />;
}

export default Edit;
