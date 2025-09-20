
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';

const Home: React.FC = () => {
  const { products, loading } = useProducts();
  const [visibleProducts, setVisibleProducts] = useState(8);

  const loadMore = () => {
    setVisibleProducts(prev => prev + 8);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-text-primary mb-4 md:mb-0">Explore Products</h1>
          <div className="flex space-x-4">
            <select className="border rounded-md px-4 py-2 text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary">
              <option>Category</option>
            </select>
            <select className="border rounded-md px-4 py-2 text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary">
              <option>Price Range</option>
            </select>
            <select className="border rounded-md px-4 py-2 text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary">
              <option>Condition</option>
            </select>
          </div>
        </div>

        <div className="flex items-center space-x-4 mb-8">
            <div className="flex items-center text-sm text-text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944a11.955 11.955 0 0018 0 12.02 12.02 0 00-2.382-8.984z" />
                </svg>
                XRPL Escrow Protected
            </div>
            <div className="flex items-center text-sm text-text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Instant Settlement
            </div>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.slice(0, visibleProducts).map(product => (
            <Link to={`/product/${product.id}`} key={product.id} className="bg-white rounded-lg shadow-card hover:shadow-card-hover transition-shadow duration-300 group">
              <div className="relative">
                <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover rounded-t-lg" />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold text-text-primary truncate group-hover:text-primary">{product.name}</h2>
                <div className="flex justify-between items-center mt-2">
                    <p className="text-xl font-bold text-text-primary">{product.price} XRP</p>
                    {product.verifiedSeller && (
                    <div className="flex items-center text-sm text-accent">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Verified Seller
                    </div>
                    )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {visibleProducts < products.length && (
          <div className="text-center mt-12">
            <button
              onClick={loadMore}
              className="bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-primary-hover transition-colors duration-300"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
