import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store';
import { Preloader } from '@ui';
import { FC, ReactNode } from 'react';

interface ProtectedRouteProps {
  children?: ReactNode;
  requireAuth?: boolean;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true
}) => {
  const location = useLocation();
  const { isLoading, isAuthChecked, user } = useSelector(
    (state: RootState) => state.auth
  );

  if (isLoading || !isAuthChecked) {
    return <Preloader />;
  }

  if (requireAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  if (!requireAuth && user) {
    const from = location.state?.from?.pathname || '/';
    return <Navigate to={from} state={{ from: location }} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};
