import classNames from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import Input from '../input/input';
import SmallCard from '../small-card/small-card';
import './search.scss';

function Search(props) {
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);

  const data = useMemo(() =>
    [].concat(...props.data.map((item) => [...item.words.words])), [props.data]);

  const founded = useMemo(() => {
    if (value.length < 2) return [];
    const arr = data.filter((item) => {
      for (let prop in item) {
        if (prop !== 'english' && prop !=='russian') continue;
        const word = item[prop].toLowerCase();
        const result = word.match(value.toLowerCase());
        if (Array.isArray(result)) return true;
      }
      return false;
    });
    return arr;
  }, [data, value]);

  useEffect(() => {
    document.addEventListener('click', (e) => {
      if (e.target.closest('.search')) setOpen(true);
      else setOpen(false);
    })
  }, []);

  return (
    <div className={classNames("search", {
      [props.className]: props.className,
      "search--open": open})}>
      <Input
        type="search"
        placeholder="Поиск..."
        className="search__input"
        onChange={(e) => setValue(e.target.value)}
      />
      <ul className="search__list">
        {founded.length > 0 ? founded.map((item, i) => (
          <li className="search__item" key={item.english + i}>
            <SmallCard word={item.english} translate={item.russian} className="search__card" />
          </li>
        )) : <p className="search__empty">
          {value.length < 2 ? 'Введите слово' : 'Ничего не найдено'}
        </p>}
      </ul>
    </div>
  );
}

export default Search;
