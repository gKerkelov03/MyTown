import { createBrowserRouter } from 'react-router-dom';
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

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
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
        element: <MunicipalityActivities />,
      },
      {
        path: 'activity/:id',
        element: <ActivityDetails />,
      },
      {
        path: 'forum',
        element: <Forum />,
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