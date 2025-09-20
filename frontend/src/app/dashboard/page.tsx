import Link from 'next/link';

export default function Dashboard() {
  // Mock user data
  const userStats = {
    totalSales: '2,450 XRP',
    activeListing: 8,
    completedOrders: 23,
    rating: 4.8,
  };

  const recentOrders = [
    {
      id: 'ORD-001',
      product: 'Digital Art Collection',
      buyer: 'rBuyer123...',
      amount: '250 XRP',
      status: 'Completed',
      date: '2024-01-15',
    },
    {
      id: 'ORD-002',
      product: 'Handcrafted Watch',
      buyer: 'rBuyer456...',
      amount: '1,200 XRP',
      status: 'Pending',
      date: '2024-01-14',
    },
    {
      id: 'ORD-003',
      product: 'Vintage Vinyl Record',
      buyer: 'rBuyer789...',
      amount: '45 XRP',
      status: 'Shipped',
      date: '2024-01-13',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Swift Market</h1>
              <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                XRPL
              </span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link
                href="/"
                className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Products
              </Link>
              <Link
                href="/dashboard"
                className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Seller Dashboard
          </h2>
          <p className="text-gray-600">
            Manage your products and track your XRPL transactions
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">$</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Sales</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {userStats.totalSales}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">📦</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Active Listings
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {userStats.activeListing}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Completed Orders
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {userStats.completedOrders}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">⭐</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Rating</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {userStats.rating}/5
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Buyer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.product}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.buyer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                      {order.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          order.status === 'Completed'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'Pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
            Create New Listing
          </button>
          <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300 transition-colors">
            View Analytics
          </button>
        </div>
      </main>
    </div>
  );
}
