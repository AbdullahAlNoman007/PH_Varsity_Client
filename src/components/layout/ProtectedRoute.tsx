import { ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { TUser, logout, useCurrentToken } from '../../redux/features/auth/authSlice';
import { Navigate } from 'react-router-dom';
import { verifyToken } from '../../utils/verifyToken';

type TprotectRoute = {
  children: ReactNode;
  role: string | undefined;
}

const ProtectedRoute = ({ children, role }: TprotectRoute) => {
  const token = useAppSelector(useCurrentToken);
  let user;
  const dispatch = useAppDispatch()

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  if (token) {
    user = verifyToken(token) as TUser
  }

  if (role !== undefined && role !== user?.role) {
    dispatch(logout())
    return <Navigate to="/login" replace={true} />;
  }



  return children;
};

export default ProtectedRoute;
