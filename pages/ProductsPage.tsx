import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { getProducts, getProductById, getCategories } from '../services/api';
import { Product, Category, CartItem } from '../types';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';
import { useAppContext } from '../hooks/useAppContext';

const ProductListPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [fetchedProducts, fetchedCategories] = await Promise.all([
          getProducts(category || undefined),
          getCategories(),
        ]);
        setProducts(fetchedProducts);
        setCategories(fetchedCategories);
      } catch (err) {
          console.error("Failed to fetch products list:", err);
          setError("Could not load products. Please ensure the backend server is running and accessible.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [category]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value;
    if (newCategory) {
      setSearchParams({ category: newCategory });
    } else {
      setSearchParams({});
    }
  };

  if (loading) return <Spinner />;

  if (error) {
    return <div className="container mx-auto text-center py-10 px-4"><p className="text-red-500 font-semibold">{error}</p></div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{category ? category : 'All Products'}</h1>
        <select onChange={handleCategoryChange} value={category || ''} className="border rounded p-2">
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.name}>{cat.name}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useAppContext();

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        setLoading(true);
        setError(null);
        try {
          const fetchedProduct = await getProductById(id);
          if (fetchedProduct) {
            setProduct(fetchedProduct);
          } else {
            setError("Product not found or there was an issue loading it.");
          }
        } catch (err) {
            console.error("Failed to fetch product details:", err);
            setError("An unexpected error occurred while fetching product data.");
        } finally {
            setLoading(false);
        }
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
        const itemToAdd: CartItem = {...product, quantity};
        addToCart(itemToAdd);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    }
  }

  if (loading) return <Spinner />;
  if (error) return <div className="text-center py-10"><p className="text-red-500 font-semibold">{error}</p></div>;
  if (!product) return <div className="text-center py-10">Product not found.</div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <img src={product.imageUrl} alt={product.name} className="w-full rounded-lg shadow-lg" />
        </div>
        <div>
          <nav className="text-sm mb-4">
            <Link to="/products" className="text-butterscotch-brown hover:underline">Products</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-500">{product.category}</span>
          </nav>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">{product.name}</h1>
          <p className="text-3xl font-bold text-butterscotch-brown mb-4">₹{product.price.toFixed(2)}</p>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <div className="flex items-center space-x-4 mb-6">
            <input type="number" value={quantity} onChange={e => setQuantity(Math.max(1, parseInt(e.target.value)))} className="w-20 border rounded p-2 text-center" min="1" />
            <button 
              onClick={handleAddToCart} 
              disabled={added}
              className="flex-1 bg-butterscotch-brown text-white px-8 py-3 rounded-md font-semibold text-lg hover:bg-opacity-90 transition disabled:bg-green-600"
            >
              {added ? 'Added to Cart!' : 'Add to Cart'}
            </button>
          </div>
          <p className="text-sm text-gray-500">{product.stock} in stock</p>
        </div>
      </div>
    </div>
  );
};


const ProductsPage: React.FC = () => {
    const { id } = useParams<{ id?: string }>();
    return id ? <ProductDetailPage /> : <ProductListPage />;
};

export default ProductsPage;