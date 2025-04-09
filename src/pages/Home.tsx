import { Link } from 'react-router-dom';
import { 
  ClipboardDocumentListIcon, 
  ChatBubbleLeftRightIcon, 
  BellAlertIcon,
  ArrowRightIcon,
  UserGroupIcon,
  BuildingLibraryIcon
} from '@heroicons/react/24/outline';
import { useStore } from '../store/useStore';
import { Navigate } from 'react-router-dom';

const Home = () => {
  const { isAuthenticated } = useStore();
  
  // Redirect authenticated users to the activities page
  if (isAuthenticated) {
    return <Navigate to="/municipality/1" replace />;
  }
  
  return (
    <div className="space-y-24 py-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-secondary-50 -z-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-4xl font-display font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              Welcome to <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">MyTown</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-600">
              Track local government activities, participate in discussions, and make your voice heard in your community.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register"
                className="btn-primary px-6 py-3 text-base"
              >
                Get started
                <ArrowRightIcon className="ml-2 h-5 w-5 inline-block" />
              </Link>
              <Link
                to="/municipality/1"
                className="btn-outline px-6 py-3 text-base"
              >
                Explore activities
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-display font-bold text-gray-900">
            How MyTown Helps Your Community
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Our platform connects citizens with local government activities and fosters community engagement.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="card card-hover group">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-primary-600 mb-4 group-hover:bg-primary-600 group-hover:text-white transition-colors">
              <ClipboardDocumentListIcon className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Track Activities</h3>
            <p className="text-gray-600">
              Monitor local government activities, their progress, and outcomes in real-time.
            </p>
          </div>
          
          <div className="card card-hover group">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-secondary-100 text-secondary-600 mb-4 group-hover:bg-secondary-600 group-hover:text-white transition-colors">
              <ChatBubbleLeftRightIcon className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Participate</h3>
            <p className="text-gray-600">
              Join discussions, share your opinions, and engage with your community members.
            </p>
          </div>
          
          <div className="card card-hover group">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-accent-100 text-accent-600 mb-4 group-hover:bg-accent-600 group-hover:text-white transition-colors">
              <BellAlertIcon className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Stay Informed</h3>
            <p className="text-gray-600">
              Get updates about local government decisions and initiatives that affect your community.
            </p>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold text-white mb-4">
                Ready to make a difference in your community?
              </h2>
              <p className="text-primary-100 text-lg mb-6">
                Join thousands of citizens who are actively participating in local government activities and discussions.
              </p>
              <Link
                to="/register"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50"
              >
                Create your account
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center">
                <UserGroupIcon className="h-8 w-8 text-white mr-3" />
                <div>
                  <div className="text-white font-bold text-xl">10,000+</div>
                  <div className="text-primary-100">Active users</div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center">
                <BuildingLibraryIcon className="h-8 w-8 text-white mr-3" />
                <div>
                  <div className="text-white font-bold text-xl">500+</div>
                  <div className="text-primary-100">Municipalities</div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center">
                <ClipboardDocumentListIcon className="h-8 w-8 text-white mr-3" />
                <div>
                  <div className="text-white font-bold text-xl">5,000+</div>
                  <div className="text-primary-100">Activities tracked</div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center">
                <ChatBubbleLeftRightIcon className="h-8 w-8 text-white mr-3" />
                <div>
                  <div className="text-white font-bold text-xl">20,000+</div>
                  <div className="text-primary-100">Forum discussions</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 