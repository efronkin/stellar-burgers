import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store';
import { logoutUser } from '../../services/features/authSlice';
import { Preloader } from '@ui';
import { useSelector } from 'react-redux';
import { selectAuthLoading } from '../../services/features/authSlice';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAuthLoading);

  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (isLoading) {
    return <Preloader />;
  }

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
