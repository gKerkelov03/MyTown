import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Fragment, useState, useEffect } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { 
  UserCircleIcon, 
  Bars3Icon, 
  XMarkIcon,
  ClipboardDocumentListIcon,
  ChatBubbleLeftRightIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
  UserPlusIcon
} from '@heroicons/react/24/outline';

const Navigation = () => {
  const { isAuthenticated, logout } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  // Define navigation links based on authentication status
  const navLinks = isAuthenticated 
    ? [
        { name: 'Activities', path: '/municipality/1', icon: ClipboardDocumentListIcon },
        { name: 'Forum', path: '/forum', icon: ChatBubbleLeftRightIcon },
      ]
    : [];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-white/80 backdrop-blur-sm'
    }`}>
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex items-center">
              <span className="text-xl font-display font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                MyTown
              </span>
            </div>
            <div className="hidden md:ml-8 md:flex md:space-x-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(link.path)
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-primary-600'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-1.5" />
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <Menu as="div" className="relative ml-3">
                <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-transform hover:scale-105">
                  <UserCircleIcon className="h-8 w-8 text-primary-600" />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/profile"
                          className={`${
                            active ? 'bg-primary-50 text-primary-700' : 'text-gray-700'
                          } flex items-center px-4 py-2 text-sm`}
                        >
                          <UserIcon className="h-4 w-4 mr-2" />
                          Profile
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={logout}
                          className={`${
                            active ? 'bg-primary-50 text-primary-700' : 'text-gray-700'
                          } flex w-full items-center px-4 py-2 text-left text-sm`}
                        >
                          <ArrowRightOnRectangleIcon className="h-4 w-4 mr-2" />
                          Sign out
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <>
                <Link
                  to="/login"
                  className="group inline-flex items-center px-4 py-2 text-sm font-medium rounded-md bg-white border-2 border-primary-500 text-primary-600 hover:bg-primary-50 hover:border-primary-600 transition-all duration-200 ease-in-out"
                >
                  <ArrowLeftOnRectangleIcon className="h-4 w-4 mr-2 transition-transform group-hover:translate-x-[-2px]" />
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="group inline-flex items-center px-4 py-2 text-sm font-medium rounded-md bg-gradient-to-r from-primary-600 to-secondary-600 text-white hover:from-primary-700 hover:to-secondary-700 transition-all duration-200 ease-in-out transform hover:scale-[1.02] hover:shadow-md"
                >
                  <UserPlusIcon className="h-5 w-5 mr-2 transition-transform group-hover:scale-110 text-white" />
                  <span className="relative z-10 text-white">Register</span>
                </Link>
              </>
            )}
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 transition-colors"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" />
              ) : (
                <Bars3Icon className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <Transition
        show={isMobileMenuOpen}
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 -translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-1"
      >
        <div className="md:hidden border-t border-gray-200 bg-white shadow-lg">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                    isActive(link.path)
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-primary-600'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      </Transition>
    </nav>
  );
};

export default Navigation; 