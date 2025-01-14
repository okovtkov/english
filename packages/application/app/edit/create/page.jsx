'use client';
import { Form } from '@english/components';
import { useCallback } from 'react';
import { api } from '@english/api';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useMiddlewareEffect } from '../../../hooks/use-middleware-effect';
import { useUserContext } from '../../layout';

function Create() {
  useMiddlewareEffect();

  const { user } = useUserContext();
  const dateNow = Date.now();
  const router = useRouter();
  const startWords = {
    id: '',
    words: {
      name: '',
      words: [
        {
          english: '',
          russian: '',
          id: dateNow,
        },
        {
          english: '',
          russian: '',
          id: dateNow + 100,
        },
        {
          english: '',
          russian: '',
          id: dateNow + 101,
        },
        {
          english: '',
          russian: '',
          id: dateNow + 102,
        },
        {
          english: '',
          russian: '',
          id: dateNow + 103,
        },
      ],
    },
  };

  const client = useQueryClient();
  const { mutate: createPart } = useMutation({
    mutationFn: (words) => api.words.add(words),
    onSuccess: () => {
      client.invalidateQueries(['words']);
      router.push('/edit/');
    },
  });

  const onSubmit = useCallback(
    (words) => {
      const clone = { ...words };
      clone.words.createdAt = Date.now();
      clone.words.owner = user.uid;
      createPart(clone.words);
    },
    [createPart, user.uid]
  );

  if (!user) return null;

  return <Form wordsData={startWords} buttonText="Создать" onSubmit={onSubmit} />;
}

export default Create;
