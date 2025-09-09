
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useAppContext } from '../hooks/useAppContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useAppContext();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1 });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000); // Revert after 2 seconds
  };

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="bg-white border rounded-lg shadow-sm overflow-hidden group transition-all duration-300 hover:shadow-xl flex flex-col">
      <Link to={`/products/${product._id}`} className="block overflow-hidden relative">
        <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
        {discountPercent > 0 && (
            <div className="absolute top-2 left-2 bg-brand-orange text-white text-xs font-bold px-2 py-1 rounded-md">
                {discountPercent}% OFF
            </div>
        )}
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-xs text-gray-500 mb-1">{product.category}</p>
        <h3 className="text-md font-semibold text-gray-800 flex-grow mb-2 h-12">
            <Link to={`/products/${product._id}`} className="hover:text-butterscotch-brown">{product.name}</Link>
        </h3>
        <div className="mt-auto">
            <div className="flex items-baseline mb-3">
                <p className="text-xl font-bold text-gray-900">₹{product.price.toFixed(2)}</p>
                {product.originalPrice && (
                    <p className="text-sm text-gray-500 line-through ml-2">₹{product.originalPrice.toFixed(2)}</p>
                )}
            </div>
            <button 
                onClick={handleAddToCart} 
                disabled={added}
                className="w-full bg-butterscotch-yellow text-butterscotch-brown px-4 py-2 rounded-md text-sm font-bold hover:bg-brand-orange hover:text-white transition-colors disabled:bg-green-500 disabled:text-white"
            >
                {added ? 'Added!' : 'Add to Cart'}
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
