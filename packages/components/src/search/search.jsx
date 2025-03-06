import classNames from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import Input from '../input/input';
import SmallCard from '../small-card/small-card';
import './search.scss';
import { api } from '@english/api';
import { useQuery } from '@tanstack/react-query';

function Search(props) {
  const [searchValue, setSearchValue] = useState('');
  const [open, setOpen] = useState(false);
  const { data = [] } = useQuery({
    queryFn: () => api.words.get(props.uid),
    queryKey: ['words'],
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60,
  });

  const founded = useMemo(() => {
    if (searchValue.length < 2 || !data.length) return [];

    const allWords = [].concat(...data.map((item) => [...item.words.words]));
    const arr = allWords.filter((word) => {
      for (const prop in word) {
        if (prop !== 'english' && prop !== 'russian') continue;
        const kek = word[prop].toLowerCase();
        const result = kek.match(searchValue.toLowerCase());
        if (Array.isArray(result)) return true;
      }
      return false;
    });
    return arr;
  }, [data, searchValue]);

  useEffect(() => {
    document.addEventListener('click', (e) => {
      if (e.target.closest('.search')) setOpen(true);
      else setOpen(false);
    });
  }, []);

  return (
    <div
      className={classNames('search', {
        [props.className]: props.className,
        'search--open': open,
      })}
    >
      <Input
        type="search"
        placeholder="Поиск..."
        className="search__input"
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <ul className="search__list">
        {founded.length > 0 ? (
          founded.map((item, i) => (
            <li className="search__item" key={item.english + i}>
              <SmallCard wordData={item} className="search__card" />
            </li>
          ))
        ) : (
          <p className="search__empty">
            {searchValue.length < 2 ? 'Введите слово' : 'Ничего не найдено'}
          </p>
        )}
      </ul>
    </div>
  );
}

export default Search;
