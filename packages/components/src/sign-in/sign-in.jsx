'use client';
import classNames from 'classnames';
import { useCallback, useState } from 'react';
import { api } from '@english/api';
import Button from '../button/button';
import Input from '../input/input';
import './sign-in.scss';
import { useRouter } from 'next/navigation';

function SignIn(props) {
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      api.auth
        .signIn(email, password)
        .then((resp) => {
          props.onChangeUser(resp);
          const user = { email, password };
          localStorage.setItem('user', JSON.stringify(user));
          router.push('/');
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error(err.code);
          setError(err.code);
        });
    },
    [email, password, props, router]
  );

  const checkError = useCallback(() => {
    switch (error) {
      case 'auth/network-request-failed':
        return 'Проблемы соединения';
      case 'auth/user-not-found':
        return 'Неверная почта';
      case 'auth/wrong-password':
        return 'Неверный пароль';
      case 'auth/internal-error':
        return 'Некорректный пароль';
      case 'auth/invalid-email':
        return 'Некорректная почта';
      default:
        return 'Проблемы соединения';
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
          className={classNames('sign-in__input', {
            'sign-in__input--error': error === 'auth/user-not-found',
          })}
        />
      </label>
      <label className="sign-in__label">
        Пароль
        <Input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className={classNames('sign-in__input', {
            'sign-in__input--error': error === 'auth/wrong-password',
          })}
        />
      </label>
      <p
        className={classNames('sign-in__error', {
          'sign-in__error--active': error,
        })}
      >
        {checkError()}
      </p>
      <Button type="submit" className="sign-in__button sign-in__button--sign-in">
        Войти
      </Button>
      <Button
        className="sign-in__button sign-in__button--sign-up"
        mode="reverse"
        onClick={() => props.onChangeType('sign-up')}
      >
        Зарегистрироваться
      </Button>
      <Button
        mode="small"
        className="sign-in__forgot-password"
        onClick={() => props.onChangeType('reset')}
      >
        Забыли пароль?
      </Button>
    </form>
  );
}

export default SignIn;
