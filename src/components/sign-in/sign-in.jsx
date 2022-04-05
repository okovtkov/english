import classNames from 'classnames';
import { useCallback, useState } from 'react';
import { authorisation } from '../../api/auth';
import Button from '../button/button';
import Input from '../input/input';
import './sign-in.scss';

function SignIn(props) {
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const onSubmit = useCallback(() => {
    authorisation.signIn(email, password)
      .then((resp) => {
        props.onChangeUser(resp);
        props.onChangeAuthorised(true);
        const user = { email, password };
        localStorage.setItem('user', JSON.stringify(user));
      })
      .catch((err) => {
        console.log(err.code)
        setError(err.code);
      });
  }, [email, password, props]);

  const checkError = useCallback(() => {
    switch (error) {
      case 'auth/network-request-failed': return 'Проблемы соединения';
      case 'auth/user-not-found': return 'Неверная почта';
      case 'auth/wrong-password': return 'Неверный пароль';
      default: return 'Проблемы соединения';
    }
  }, [error]);

  return (
    <form className="sign-in" onSubmit={onSubmit}>
      <h1 className="sign-in__heading">Вход</h1>
      <label className="sign-in__label">
        Почта
        <Input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          className={classNames("sign-in__input", {
            "sign-in__input--error":
              error === 'auth/user-not-found',
          })}
        />
      </label>
      <label className="sign-in__label">
        Пароль
        <Input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className={classNames("sign-in__input", {
            "sign-in__input--error":
              error === 'auth/wrong-password',
          })}
        />
      </label>
      <p className={classNames("sign-in__error", {
        "sign-in__error--active": error,
      })}>{checkError()}</p>
      <Button
        type="submit"
        className="sign-in__button sign-in__button--sign-in"
      >Войти</Button>
      <Button
        className="sign-in__button sign-in__button--sign-up"
        onClick={() => props.onChangeType('sign-up')}
      >Зарегистрироваться</Button>
    </form>
  );
}

export default SignIn;
