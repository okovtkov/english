import { useState } from 'react';
import SignIn from '../sign-in/sign-in';
import SignUp from '../sign-up/sign-up';
import Reset from '../reset/reset';
import Button from '../button/button';
import './auth.scss';

function Auth(props) {
  const [type, setType] = useState('sign-in');

  return (
    <div className="auth">
      <div className="auth__wrapper">
        {type === 'sign-in' &&
          <SignIn
            onChangeType={setType}
            onChangeAuthorized={props.onChangeAuthorized}
            onChangeUser={props.onChangeUser}
          />
        }
        {type === 'sign-up' && <SignUp onChangeType={setType} />}
        {type === 'successed' && (
          <>
            <h1 className="auth__heading">Добро пожаловать!</h1>
            <p className="auth__text">Теперь войдите, используя свой email и пароль</p>
            <Button className="auth__button" onClick={() => setType('sign-in')}>Войти</Button>
          </>
        )}
        {type === 'reset' && <Reset onChangeType={setType} />}
        {type === 'reset-complete' && (
          <>
            <h1 className="auth__heading">Отправлено!</h1>
            <p className="auth__text">
              На Вашу почту отослано сообщение с дальнейшими инструкциями.
              Проверьте его.
            </p>
            <Button className="auth__button" onClick={() => setType('sign-in')}>Ок</Button>
          </>
        )}
      </div>
    </div>
  );
}

export default Auth;
