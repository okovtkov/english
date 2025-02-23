'use client';
/* eslint-disable react-hooks/exhaustive-deps */
import { Form } from '@english/components';
import { api } from '@english/api';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useMiddlewareEffect } from '../../../hooks/use-middleware-effect';
import { useParams, useRouter } from 'next/navigation';

function EditPart() {
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

  useMiddlewareEffect();

  const onSubmit = useCallback(
    (words) => {
      updatePart(words);
    },
    [id]
  );

  if (isLoading) return null;

  return <Form onSubmit={onSubmit} wordsData={defaultWords} buttonText="Сохранить" />;
}

export default EditPart;
