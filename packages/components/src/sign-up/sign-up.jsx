import classNames from 'classnames';
import { api } from '@english/api';
import { useCallback, useState } from 'react';
import Button from '../button/button';
import Input from '../input/input';
import './sign-up.scss';

function SignUp(props) {
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [secondPassword, setSecondPassword] = useState('');

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (password === secondPassword) {
        api.auth
          .signUp(email, password)
          .then(() => {
            props.onChangeType('successed');
            setError('');
          })
          .catch((err) => setError(err.code));
      } else {
        setError('auth/passwords-do-not-match');
      }
    },
    [email, password, props, secondPassword]
  );

  const checkError = useCallback(() => {
    switch (error) {
      case 'auth/weak-password':
        return 'Пароль должен быть не менее 6 символов';
      case 'auth/invalid-email':
        return 'Некорректная почта';
      case 'auth/email-already-in-use':
        return 'Данная почта уже используется';
      case 'auth/passwords-do-not-match':
        return 'Пароли не совпадают';
      default:
        return null;
    }
  }, [error]);

  const reset = useCallback(() => {
    props.onChangeType('sign-in');
    setError('');
  }, [props]);

  return (
    <form className="sign-up" onSubmit={onSubmit}>
      <h1 className="sign-up__heading">Регистрация</h1>
      <label className="sign-up__label">
        Введите вашу почту
        <Input
          type="email"
          className={classNames('sign-up__input', {
            'sign-up__input--error':
              error === 'auth/invalid-email' || error === 'auth/email-already-in-use',
          })}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label className="sign-up__label">
        Придумайте пароль
        <Input
          type="password"
          className={classNames('sign-up__input', {
            'sign-up__input--error':
              error === 'auth/weak-password' || error === 'auth/passwords-do-not-match',
          })}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label className="sign-up__label">
        Повторите пароль
        <Input
          type="password"
          className={classNames('sign-up__input', {
            'sign-up__input--error':
              error === 'auth/weak-password' || error === 'auth/passwords-do-not-match',
          })}
          onChange={(e) => setSecondPassword(e.target.value)}
        />
      </label>
      <p
        className={classNames('sign-up__error', {
          'sign-up__error--active': error,
        })}
      >
        {checkError()}
      </p>
      <Button type="submit" className="sign-up__button">
        Зарегистрироваться
      </Button>
      <Button className="sign-up__button sign-up__button--back" onClick={reset} mode="small">
        У меня уже есть аккаунт
      </Button>
    </form>
  );
}

export default SignUp;
