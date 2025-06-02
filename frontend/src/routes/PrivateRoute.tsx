import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../store/useAuth';

export function PrivateRoute() {
  const isAuthenticated = useAuth((s) => !!s.token);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
