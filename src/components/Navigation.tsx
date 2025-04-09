import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import {
  HomeIcon,
  ChatBubbleLeftRightIcon,
  CalendarIcon,
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
  UserPlusIcon
} from '@heroicons/react/24/outline';

interface NavLink {
  name: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const Navigation = () => {
  const { isAuthenticated, logout } = useStore();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Define navigation links based on authentication status
  const navLinks: NavLink[] = isAuthenticated 
    ? [
        { name: 'Activities', href: '/activities', icon: CalendarIcon },
        { name: 'Forum', href: '/forum', icon: ChatBubbleLeftRightIcon },
      ]
    : [
        { name: 'Home', href: '/', icon: HomeIcon },
        { name: 'Login', href: '/login', icon: ArrowRightOnRectangleIcon },
        { name: 'Register', href: '/register', icon: UserPlusIcon },
      ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-display font-bold">
                <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">MyTown</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`${
                    location.pathname === link.href
                      ? 'border-blue-600 text-blue-700'
                      : 'border-transparent text-gray-500 hover:border-blue-300 hover:text-blue-600'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  <link.icon className="h-5 w-5 mr-1" />
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-1" />
                Logout
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 