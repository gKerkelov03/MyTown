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
import RedirectToLandingPageIfNotLoggedIn from './RedirectToLandingPageIfNotLoggedIn';
import RedirectToForumIfLoggedIn from './RedirectToForumIfLoggedIn';
import { useStore } from '../store/useStore';
import Activities from '../pages/Activities';

// Component to redirect authenticated users away from the Home page
const HomeRedirect = () => {
  const { isAuthenticated } = useStore();
  
  if (isAuthenticated) {
    return <Navigate to="/forum" replace />;
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
        element: (
          <RedirectToForumIfLoggedIn>
            <Login />
          </RedirectToForumIfLoggedIn>
        ),
      },
      {
        path: 'register',
        element: (
          <RedirectToForumIfLoggedIn>
            <Register />
          </RedirectToForumIfLoggedIn>
        ),
      },
      {
        path: 'municipality/:id',
        element: (
          <RedirectToLandingPageIfNotLoggedIn>
            <MunicipalityActivities />
          </RedirectToLandingPageIfNotLoggedIn>
        ),
      },
      {
        path: 'activity/:id',
        element: (
          <RedirectToLandingPageIfNotLoggedIn>
            <ActivityDetails />
          </RedirectToLandingPageIfNotLoggedIn>
        ),
      },
      {
        path: 'forum',
        element: (
          <RedirectToLandingPageIfNotLoggedIn>
            <Forum />
          </RedirectToLandingPageIfNotLoggedIn>
        ),
      },
      {
        path: 'profile',
        element: (
          <RedirectToLandingPageIfNotLoggedIn>
            <Profile />
          </RedirectToLandingPageIfNotLoggedIn>
        ),
      },
      {
        path: 'admin',
        element: (
          <RedirectToLandingPageIfNotLoggedIn roles={['admin']}>
            <AdminDashboard />
          </RedirectToLandingPageIfNotLoggedIn>
        ),
      },
      {
        path: 'activities',
        element: <Activities />,
      },
    ],
  },
]); 