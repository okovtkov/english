import Button from '../button/button';
import Input from '../input/input';
import ModalWindow from '../modal-window/modal-window';

import './speaker-settings.scss';
import { useCallback, useState } from 'react';

function WordsList(props) {
  const [wordsPause, setWordsPause] = useState(1);
  const [translatePause, setTranslateTime] = useState(0);
  const [repeatPause, setRepeatPause] = useState(0);
  const [repeatCount, setRepeatCount] = useState(1);

  const onChangeTranslatePause = useCallback((event) => {
    const time = Number(event.target.value);
    setTranslateTime(time);
  }, []);

  const onChangeWordsPause = useCallback((event) => {
    const time = Number(event.target.value);
    setWordsPause(time);
  }, []);

  const onChangeRepeatCount = useCallback((event) => {
    const count = Number(event.target.value);
    setRepeatCount(count);
  }, []);

  const onChangeRepeatPause = useCallback((event) => {
    const count = Number(event.target.value);
    setRepeatPause(count);
  }, []);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      props.onSubmit({ translatePause, repeatCount, wordsPause, repeatPause });
    },
    [props, translatePause, repeatCount, wordsPause, repeatPause],
  );

  const inputs = [
    {
      text: 'Введите количество повторений одного слова',
      value: repeatCount,
      min: 1,
      onChange: onChangeRepeatCount,
    },
    {
      text: 'Введите задержку между переводом (сек)',
      value: translatePause,
      min: 0,
      onChange: onChangeTranslatePause,
    },
    {
      text: 'Введите задержку между словами (сек)',
      value: wordsPause,
      min: 0,
      onChange: onChangeWordsPause,
    },
    {
      text: 'Введите задержку между повтором слова (сек)',
      value: repeatPause,
      min: 0,
      onChange: onChangeRepeatPause,
    },
  ];

  return (
    <ModalWindow containerClass="speaker-settings" isOpen={props.isOpen} onClose={props.onClose}>
      <form className="speaker-settings__wrapper" onSubmit={onSubmit}>
        {inputs.map((input, i) => (
          <label className="speaker-settings__label" key={i}>
            <span className="speaker-settings__name">{input.text}</span>
            <Input
              className="speaker-settings__input"
              type="number"
              value={input.value}
              min={input.min}
              onChange={input.onChange}
            />
          </label>
        ))}
        <Button className="speaker-settings__submit" type="submit">
          Сохранить
        </Button>
      </form>
    </ModalWindow>
  );
}

export default WordsList;
