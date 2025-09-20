import Link from 'next/link';

export default function Home() {
  // Mock product data
  const products = [
    {
      id: 1,
      name: 'Digital Art Collection',
      price: '250 XRP',
      seller: 'rArtist123...',
      image: '/api/placeholder/300/200',
      description: 'Unique digital artwork on XRPL',
    },
    {
      id: 2,
      name: 'Handcrafted Watch',
      price: '1,200 XRP',
      seller: 'rMaker456...',
      image: '/api/placeholder/300/200',
      description: 'Premium handcrafted timepiece',
    },
    {
      id: 3,
      name: 'Vintage Vinyl Record',
      price: '45 XRP',
      seller: 'rMusic789...',
      image: '/api/placeholder/300/200',
      description: 'Rare vinyl record from the 80s',
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
                className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Products
              </Link>
              <Link
                href="/dashboard"
                className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
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
            Featured Products
          </h2>
          <p className="text-gray-600">
            Discover amazing products with instant XRPL settlement
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-w-16 aspect-h-9">
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Product Image</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {product.description}
                </p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-green-600">
                    {product.price}
                  </span>
                  <span className="text-sm text-gray-500">
                    by {product.seller}
                  </span>
                </div>
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                  Buy with XRPL
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
