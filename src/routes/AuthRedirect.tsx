import { Navigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

interface AuthRedirectProps {
  children: React.ReactNode;
}

/**
 * Component that redirects authenticated users to the forum page
 * and allows unauthenticated users to access the wrapped component
 */
const AuthRedirect: React.FC<AuthRedirectProps> = ({ children }) => {
  const { isAuthenticated } = useStore();

  if (isAuthenticated) {
    return <Navigate to="/forum" replace />;
  }

  return <>{children}</>;
};

export default AuthRedirect; 