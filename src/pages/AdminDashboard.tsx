const AdminDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Welcome, Admin</h2>
        <p className="text-gray-600 mb-4">
          This is the admin dashboard where you can manage users, activities, and forum posts.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium mb-2">Users</h3>
          <p className="text-gray-600 mb-4">Manage user accounts and permissions</p>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
            Manage Users
          </button>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium mb-2">Activities</h3>
          <p className="text-gray-600 mb-4">Create and manage municipality activities</p>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
            Manage Activities
          </button>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium mb-2">Forum</h3>
          <p className="text-gray-600 mb-4">Moderate forum posts and comments</p>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
            Moderate Forum
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 