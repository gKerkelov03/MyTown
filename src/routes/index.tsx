import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import MunicipalityActivities from '../pages/MunicipalityActivities';
import ActivityDetails from '../pages/ActivityDetails';
import Forum from '../pages/Forum';
import Profile from '../pages/Profile';
import AdminDashboard from '../pages/AdminDashboard';
import ProtectedRoute from './ProtectedRoute';
import { useStore } from '../store/useStore';

// Component to redirect authenticated users away from the Home page
const HomeRedirect = () => {
  const { isAuthenticated } = useStore();
  
  if (isAuthenticated) {
    return <Navigate to="/municipality/1" replace />;
  }
  
  return <Home />;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomeRedirect />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'municipality/:id',
        element: (
          <ProtectedRoute>
            <MunicipalityActivities />
          </ProtectedRoute>
        ),
      },
      {
        path: 'activity/:id',
        element: (
          <ProtectedRoute>
            <ActivityDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: 'forum',
        element: (
          <ProtectedRoute>
            <Forum />
          </ProtectedRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin',
        element: (
          <ProtectedRoute roles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
]); 