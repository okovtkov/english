import classNames from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import Input from '../input/input';
import SmallCard from '../small-card/small-card';
import './search.scss';

function Search(props) {
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);

  const founded = useMemo(() => {
    if (value.length < 2) return;
    const data = [].concat(...props.data.map((item) => [...item.words.words]));
    const arr = data.map((item) => {
      for (let prop in item) {
        const result = item[prop].match(value);
        if (Array.isArray(result)) return item;
      }
      return null;
    }).filter((item) => item !== null);
    return arr;
  }, [props.data, value]);

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
        {Array.isArray(founded) && founded.length > 0 ? founded.map((item, i) => (
          <li className="search__item" key={item.english + i}>
            <SmallCard word={item.english} translate={item.russian} className="search__card" />
          </li>
        )) : <p className="search__empty">
          {Array.isArray(founded) && founded.length === 0 ? 'Ничего не найдено' : 'Введите слово'}
        </p>}
      </ul>
    </div>
  );
}

export default Search;
