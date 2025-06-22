import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import {
  loginUser,
  selectAuthError,
  selectAuthLoading
} from '../../services/features/authSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { setCookie } from '../../utils/cookie';
import { Preloader } from '@ui';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const error = useSelector(selectAuthError);
  const isLoading = useSelector(selectAuthLoading);

  const errorMessage =
    error && error.toLowerCase().includes('email or password are incorrect')
      ? 'Неверный email или пароль'
      : error || '';

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(loginUser({ email, password }))
      .unwrap()
      .then((data) => {
        setCookie('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        navigate(from);
      })
      .catch(() => {});
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <LoginUI
      errorText={errorMessage}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
