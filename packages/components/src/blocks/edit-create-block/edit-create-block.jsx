import { useCallback } from 'react';
import { api } from '@english/api';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Form from '../../form/form';
import Header from '../../header/header';

export default function EditCreateBlock({ uid }) {
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
      clone.words.owner = uid;
      createPart(clone.words);
    },
    [createPart, uid]
  );

  return (
    <>
      <Header uid={uid} />
      <Form wordsData={startWords} buttonText="Создать" onSubmit={onSubmit} />
    </>
  );
}
