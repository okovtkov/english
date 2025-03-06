import { useCallback, useMemo, useState } from 'react';
import { api } from '@english/api';
import { useQuery } from '@tanstack/react-query';
import { Test, Switch, WordsList } from '@english/components';
import { useParams } from 'next/navigation';
import { useMiddlewareEffect } from '../../../hooks/use-middleware-effect';
import { useUserContext } from '../../layout';

function TestPage() {
  useMiddlewareEffect();

  const { id } = useParams();
  const { user } = useUserContext();
  const [type, setType] = useState('');
  const [visibleWord, setVisibleWord] = useState('');

  const generalOrFavouriteMode = id === 'general' || id === 'favourite';
  const { data: wordsData, isLoading } = useQuery({
    queryFn: () => (generalOrFavouriteMode ? api.words.get(user.uid) : api.words.getById(id)),
    queryKey: generalOrFavouriteMode ? ['words'] : ['words', id],
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60,
  });

  const wordsList = useMemo(() => {
    if (isLoading) return [];

    if (id === 'favourite') {
      const allWords = [].concat(...wordsData.map((item) => [...item.words.words]));
      const favourite = allWords.filter((item) => item.isFavourite);
      if (!favourite.length) return [];
      return favourite.sort(() => Math.random() - 0.5);
    }

    if (id === 'general') {
      const allWords = [].concat(...wordsData.map((item) => [...item.words.words]));
      if (!allWords.length) return [];
      return allWords.sort(() => Math.random() - 0.5);
    }

    const arr = wordsData.words.words;
    const shuffeled = arr.sort(() => Math.random() - 0.5);
    return shuffeled;
  }, [id, isLoading, wordsData]);

  const selectVariantHandler = useCallback((type) => {
    setType(type);
  }, []);

  const selectLangHandler = useCallback((lang) => {
    setVisibleWord(lang);
    setType('repeating');
  }, []);

  if (!user) return null;

  if (!wordsList.length && generalOrFavouriteMode)
    return (
      <div className="test">
        <p>У Вас пока что нет слов в данном разделе.</p>
      </div>
    );

  return (
    <>
      {!type && (
        <Switch
          firstValue="просмотреть"
          secondValue="повторить"
          onSelectFirstValue={() => selectVariantHandler('reading')}
          onSelectSecondValue={() => selectVariantHandler('translate-selecting')}
        >
          Выберите что вы хотите сделать с разделом
        </Switch>
      )}
      {type === 'translate-selecting' && (
        <Switch
          firstValue="с русского"
          secondValue="с английского"
          onSelectFirstValue={() => selectLangHandler('rus')}
          onSelectSecondValue={() => selectLangHandler('eng')}
        >
          Выберите с какого языка хотите переводить
        </Switch>
      )}
      {type === 'repeating' && (
        <Test
          id={id}
          wordsData={wordsData}
          defaultWordsList={wordsList}
          visibleWord={visibleWord}
        />
      )}
      {type === 'reading' && <WordsList data={wordsList} />}
    </>
  );
}

export default TestPage;
