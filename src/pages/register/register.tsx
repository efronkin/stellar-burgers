import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import {
  registerUser,
  selectAuthError
} from '../../services/features/authSlice';
import { useNavigate } from 'react-router-dom';
import { setCookie } from '../../utils/cookie';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(selectAuthError);

  const errorMessage = error
    ? error
        .toLowerCase()
        .includes('email, password and name are required fields')
      ? 'Email, пароль и имя — обязательные поля'
      : error.toLowerCase().includes('user already exists')
        ? 'Такой пользователь уже существует'
        : error
    : '';

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(registerUser({ name: userName, email, password }))
      .unwrap()
      .then((data) => {
        setCookie('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        navigate('/login');
      })
      .catch(() => {});
  };

  return (
    <RegisterUI
      errorText={errorMessage}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
