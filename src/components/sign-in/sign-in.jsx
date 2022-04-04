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
        setError(err.code);
      });
  }, [email, password, props]);

  return (
    <form className="sign-in" onSubmit={onSubmit}>
      <h1 className="sign-in__heading">Вход</h1>
      <label className="sign-in__label">
        Почта
        <Input
          type="email"
          className="sign-in__input"
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label className="sign-in__label">
        Пароль
        <Input
          type="password"
          className="sign-in__input"
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <p className={classNames("sign-in__error", {
        "sign-in__error--active": error,
      })}>Неверный логин или пароль</p>
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
