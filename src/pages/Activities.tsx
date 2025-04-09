import { useState, useEffect } from 'react';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon, 
  XMarkIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  TagIcon,
  UserIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

// Dummy data for activities
const dummyActivities = [
  {
    id: 1,
    title: 'Summer Music Festival',
    description: 'Annual summer music festival featuring local and international artists.',
    status: 'upcoming',
    date: '2023-07-15',
    price: 25,
    category: 'entertainment',
    mayor: 'John Smith',
    councilor: 'Jane Doe',
    location: 'City Park',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 2,
    title: 'Road Maintenance on Main Street',
    description: 'Scheduled maintenance and repair work on Main Street from 5th to 10th Avenue.',
    status: 'in-progress',
    date: '2023-06-10',
    price: 0,
    category: 'infrastructure',
    mayor: 'John Smith',
    councilor: 'Robert Johnson',
    location: 'Main Street',
    image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 3,
    title: 'Community Garden Opening',
    description: 'Opening ceremony for the new community garden project.',
    status: 'completed',
    date: '2023-05-20',
    price: 0,
    category: 'community',
    mayor: 'John Smith',
    councilor: 'Emily Davis',
    location: 'Community Center',
    image: 'https://images.unsplash.com/photo-1590650046871-92c887180603?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 4,
    title: 'Public Library Renovation',
    description: 'Renovation and expansion of the city public library.',
    status: 'in-progress',
    date: '2023-06-01',
    price: 0,
    category: 'infrastructure',
    mayor: 'John Smith',
    councilor: 'Michael Brown',
    location: 'City Library',
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 5,
    title: 'Winter Holiday Market',
    description: 'Annual winter holiday market with local vendors and artisans.',
    status: 'upcoming',
    date: '2023-12-10',
    price: 5,
    category: 'entertainment',
    mayor: 'John Smith',
    councilor: 'Sarah Wilson',
    location: 'City Square',
    image: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 6,
    title: 'Environmental Cleanup Day',
    description: 'Community-wide environmental cleanup initiative.',
    status: 'upcoming',
    date: '2023-08-05',
    price: 0,
    category: 'community',
    mayor: 'John Smith',
    councilor: 'David Lee',
    location: 'Various Locations',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  },
];

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  });
};

// Helper function to format price
const formatPrice = (price: number) => {
  if (price === 0) return 'Free';
  return `$${price.toFixed(2)}`;
};

// Helper function to get status badge class
const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case 'upcoming':
      return 'bg-blue-100 text-blue-800';
    case 'in-progress':
      return 'bg-yellow-100 text-yellow-800';
    case 'completed':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Helper function to get status text
const getStatusText = (status: string) => {
  switch (status) {
    case 'upcoming':
      return 'Upcoming';
    case 'in-progress':
      return 'In Progress';
    case 'completed':
      return 'Completed';
    default:
      return status;
  }
};

const Activities = () => {
  const [filteredActivities, setFilteredActivities] = useState(dummyActivities);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    category: '',
    priceRange: '',
    dateRange: '',
  });

  // Apply filters and search
  useEffect(() => {
    let result = [...dummyActivities];
    
    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(activity => 
        activity.title.toLowerCase().includes(term) ||
        activity.description.toLowerCase().includes(term) ||
        activity.mayor.toLowerCase().includes(term) ||
        activity.councilor.toLowerCase().includes(term) ||
        activity.category.toLowerCase().includes(term)
      );
    }
    
    // Apply status filter
    if (filters.status) {
      result = result.filter(activity => activity.status === filters.status);
    }
    
    // Apply category filter
    if (filters.category) {
      result = result.filter(activity => activity.category === filters.category);
    }
    
    // Apply price range filter
    if (filters.priceRange) {
      switch (filters.priceRange) {
        case 'free':
          result = result.filter(activity => activity.price === 0);
          break;
        case 'paid':
          result = result.filter(activity => activity.price > 0);
          break;
        case 'low':
          result = result.filter(activity => activity.price > 0 && activity.price <= 10);
          break;
        case 'medium':
          result = result.filter(activity => activity.price > 10 && activity.price <= 50);
          break;
        case 'high':
          result = result.filter(activity => activity.price > 50);
          break;
      }
    }
    
    // Apply date range filter
    if (filters.dateRange) {
      const today = new Date();
      const nextWeek = new Date();
      nextWeek.setDate(today.getDate() + 7);
      const nextMonth = new Date();
      nextMonth.setMonth(today.getMonth() + 1);
      
      switch (filters.dateRange) {
        case 'today':
          result = result.filter(activity => {
            const activityDate = new Date(activity.date);
            return activityDate.toDateString() === today.toDateString();
          });
          break;
        case 'this-week':
          result = result.filter(activity => {
            const activityDate = new Date(activity.date);
            return activityDate >= today && activityDate <= nextWeek;
          });
          break;
        case 'this-month':
          result = result.filter(activity => {
            const activityDate = new Date(activity.date);
            return activityDate >= today && activityDate <= nextMonth;
          });
          break;
        case 'past':
          result = result.filter(activity => {
            const activityDate = new Date(activity.date);
            return activityDate < today;
          });
          break;
      }
    }
    
    setFilteredActivities(result);
  }, [searchTerm, filters]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({
      status: '',
      category: '',
      priceRange: '',
      dateRange: '',
    });
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-display font-bold tracking-tight text-gray-900 mb-4 md:mb-0">
          Activities
        </h1>
        <div className="w-full md:w-auto flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <div className="relative flex-grow sm:max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="Search activities, mayor, councilor, or topic..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <button
            onClick={toggleFilters}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            {showFilters ? (
              <>
                <XMarkIcon className="h-5 w-5 mr-2 text-gray-500" />
                Hide Filters
              </>
            ) : (
              <>
                <FunnelIcon className="h-5 w-5 mr-2 text-gray-500" />
                Show Filters
              </>
            )}
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status"
                name="status"
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                value={filters.status}
                onChange={handleFilterChange}
              >
                <option value="">All Statuses</option>
                <option value="upcoming">Upcoming</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category"
                name="category"
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                value={filters.category}
                onChange={handleFilterChange}
              >
                <option value="">All Categories</option>
                <option value="entertainment">Entertainment</option>
                <option value="infrastructure">Infrastructure</option>
                <option value="community">Community</option>
              </select>
            </div>
            <div>
              <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700 mb-1">
                Price Range
              </label>
              <select
                id="priceRange"
                name="priceRange"
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                value={filters.priceRange}
                onChange={handleFilterChange}
              >
                <option value="">All Prices</option>
                <option value="free">Free</option>
                <option value="paid">Paid</option>
                <option value="low">Low ($1-$10)</option>
                <option value="medium">Medium ($11-$50)</option>
                <option value="high">High ($50+)</option>
              </select>
            </div>
            <div>
              <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700 mb-1">
                Date Range
              </label>
              <select
                id="dateRange"
                name="dateRange"
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                value={filters.dateRange}
                onChange={handleFilterChange}
              >
                <option value="">All Dates</option>
                <option value="today">Today</option>
                <option value="this-week">This Week</option>
                <option value="this-month">This Month</option>
                <option value="past">Past Events</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={clearFilters}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <XMarkIcon className="h-4 w-4 mr-1" />
              Clear Filters
            </button>
          </div>
        </div>
      )}

      {filteredActivities.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No activities found</h3>
          <p className="text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((activity) => (
            <Link 
              key={activity.id} 
              to={`/activity/${activity.id}`}
              className="card card-hover flex flex-col h-full"
            >
              <div className="relative h-48 rounded-t-lg overflow-hidden">
                <img 
                  src={activity.image} 
                  alt={activity.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span className={`badge ${getStatusBadgeClass(activity.status)}`}>
                    {getStatusText(activity.status)}
                  </span>
                </div>
              </div>
              <div className="p-4 flex-grow flex flex-col">
                <h2 className="text-xl font-bold text-gray-900 mb-2">{activity.title}</h2>
                <p className="text-gray-600 mb-4 flex-grow">{activity.description}</p>
                <div className="mt-auto space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <CalendarIcon className="h-4 w-4 mr-1.5" />
                    <span>{formatDate(activity.date)}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <CurrencyDollarIcon className="h-4 w-4 mr-1.5" />
                    <span>{formatPrice(activity.price)}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <TagIcon className="h-4 w-4 mr-1.5" />
                    <span className="capitalize">{activity.category}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <BuildingOfficeIcon className="h-4 w-4 mr-1.5" />
                    <span>{activity.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <UserIcon className="h-4 w-4 mr-1.5" />
                    <span>Mayor: {activity.mayor}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Activities; 