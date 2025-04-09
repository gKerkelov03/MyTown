import { Navigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: string[];
}

const RedirectToLandingPageIfNotLoggedIn: React.FC<ProtectedRouteProps> = ({ children, roles } : { children: React.ReactNode, roles?: string[] }) => {
  const { isAuthenticated, userRole } = useStore();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (roles && userRole && !roles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default RedirectToLandingPageIfNotLoggedIn; 