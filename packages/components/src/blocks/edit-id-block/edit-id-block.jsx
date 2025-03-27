import Header from '../../header/header';
import Form from '../../form/form';
import { api } from '@english/api';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function EditIdBlock({ uid }) {
  const { id } = useParams();
  const router = useRouter();

  const { data: defaultWords, isLoading } = useQuery({
    queryFn: () => api.words.getById(id),
    queryKey: ['words', id],
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60,
  });
  const client = useQueryClient();
  const { mutate: updatePart } = useMutation({
    mutationFn: (words) => api.words.update(words.words, id),
    onSuccess: () => {
      client.invalidateQueries(['words', id]);
      client.invalidateQueries(['words']);
      router.push('/edit/');
    },
  });

  const onSubmit = useCallback(
    (words) => {
      updatePart(words);
    },
    [updatePart]
  );

  if (isLoading) return null;

  return (
    <>
      <Header uid={uid} />
      <Form onSubmit={onSubmit} wordsData={defaultWords} buttonText="Сохранить" />
    </>
  );
}
