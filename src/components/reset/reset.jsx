import classNames from "classnames";
import { useCallback, useState } from "react";
import { authorisation } from "../../api/auth";
import Button from "../button/button";
import Input from "../input/input";
import './reset.scss';

function Reset(props) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const checkError = useCallback(() => {
    switch (error) {
      case 'auth/user-not-found': return 'Пользователь не найден';
      case 'auth/invalid-email': return 'Некорректная почта';
      case 'auth/missing-email': return 'Введите почту';
      case 'auth/network-request-failed': return 'Проблемы соединения';
      default: return 'Неизвестная ошибка';
    }
  }, [error]);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    authorisation.reset(email)
      .then(() => props.onChangeType('reset-complete'))
      .catch((err) => setError(err.code));
  }, [email, props]);

  return (
    <form className="reset" onSubmit={onSubmit}>
      <h1 className="reset__heading">Восстановление</h1>
      <p className="reset__text">
        Введите почту, на которую Вы регистрировали Ваш аккаунт.
        На него придет ссылка со сбросом пароля.
      </p>
      <label className="reset__label">
        Почта
        <Input onChange={(e) => setEmail(e.target.value)} className={classNames("reset__input", {
          "reset__input--error": error,
        })} />
      </label>
      <p className={classNames("reset__error", {
          "reset__error--active": error,
        })}>{checkError()}</p>
      <Button className="reset__button" type="submit">Отправить</Button>
      <Button className="reset__button" mode="reverse" onClick={() => props.onChangeType('sign-in')}>
        Назад
      </Button>
    </form>
  );
}

export default Reset;
