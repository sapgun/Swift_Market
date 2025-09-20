
import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';

const Home: React.FC = () => {
  const { products, loading } = useProducts();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map(product => (
          <Link to={`/product/${product.id}`} key={product.id} className="border p-4">
            <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover" />
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p>${product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
