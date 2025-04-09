import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import { Toaster } from 'react-hot-toast';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navigation />
      <main className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
        <div className="animate-fade-in">
          <Outlet />
        </div>
      </main>
      <footer className="mt-auto border-t border-gray-200 bg-white py-6">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} MyTown. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-sm text-gray-500 hover:text-primary-600">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-primary-600">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-primary-600">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
      <Toaster 
        position="top-right" 
        toastOptions={{
          className: 'rounded-lg shadow-lg',
          style: {
            background: '#fff',
            color: '#333',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  );
};

export default Layout; 