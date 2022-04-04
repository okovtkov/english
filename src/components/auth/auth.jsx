import { useState } from 'react';
import SignIn from '../sign-in/sign-in';
import SignUp from '../sign-up/sign-up';
import './auth.scss';
import Button from '../button/button';

function Auth(props) {
  const [type, setType] = useState('sign-in');

  return (
    <div className="auth">
      <div className="auth__wrapper">
        {type === 'sign-in' &&
          <SignIn
            onChangeType={setType}
            onChangeAuthorised={props.onChangeAuthorised}
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
      </div>
    </div>
  );
}

export default Auth;
