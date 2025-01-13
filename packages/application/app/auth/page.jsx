'use client';
import { Auth, Loading } from '@english/components';
import { useUserContext } from '../layout';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

function Login() {
  const { user, setUser } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (user) router.push('/');
  }, [router, user]);

  if (user) return <Loading />;

  return <Auth onChangeUser={setUser} />;
}

export default Login;
