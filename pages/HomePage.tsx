import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFeaturedProducts, getCategoryGroups } from '../services/api';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';

const PromotionalBanner: React.FC = () => (
    <div className="bg-butterscotch-cream">
        <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="relative rounded-lg overflow-hidden">
                <img src="https://picsum.photos/seed/mainbanner/1200/400" alt="Special Offer" className="w-full h-auto md:h-80 object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">Great Indian Grocery Sale</h1>
                        <p className="text-lg md:text-xl text-white mb-6 drop-shadow-md">Up to 40% off on daily essentials!</p>
                        <Link to="/products" className="bg-brand-orange text-white px-8 py-3 rounded-md font-semibold text-lg hover:bg-opacity-90 transition shadow-lg">
                            Shop Now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const FeaturesStrip: React.FC = () => (
    <div className="bg-white">
        <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="flex items-center justify-center p-2">
                    <svg className="w-8 h-8 text-brand-orange mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span className="font-semibold text-gray-700">Best Prices</span>
                </div>
                <div className="flex items-center justify-center p-2">
                    <svg className="w-8 h-8 text-brand-orange mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8a1 1 0 001-1zM3 10h10" /></svg>
                    <span className="font-semibold text-gray-700">Fastest Delivery</span>
                </div>
                 <div className="flex items-center justify-center p-2">
                    <svg className="w-8 h-8 text-brand-orange mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H4a3 3 0 00-3 3v4a3 3 0 003 3z" /></svg>
                    <span className="font-semibold text-gray-700">Easy Returns</span>
                </div>
                <div className="flex items-center justify-center p-2">
                    <svg className="w-8 h-8 text-brand-orange mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8" /></svg>
                    <span className="font-semibold text-gray-700">Wide Assortment</span>
                </div>
            </div>
        </div>
    </div>
);

const FrequentlyOrdered: React.FC<{ products: Product[] }> = ({ products }) => (
    <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Frequently Ordered</h2>
        <div className="border-l-4 border-brand-orange pl-2 mb-6">
            <p className="text-gray-600">Check out what others are buying!</p>
        </div>
        <div className="flex overflow-x-auto space-x-6 pb-4 -mx-4 px-4">
            {products.map(product => (
                <div key={product._id} className="flex-shrink-0 w-64">
                    <ProductCard product={product} />
                </div>
            ))}
        </div>
    </div>
);

const CategorySections: React.FC<{ categoryGroups: any[] }> = ({ categoryGroups }) => (
    <div className="bg-gray-100">
        {categoryGroups.map(group => (
            <div key={group.name} className="container mx-auto px-4 py-12">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">{group.name}</h2>
                    <Link to={`/products?category=${group.name}`} className="text-brand-orange font-semibold hover:underline">See all</Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
                    {group.subCategories.map((subCat: any) => (
                         <Link to={`/products`} key={subCat.name} className="group text-center">
                            <div className="rounded-lg overflow-hidden mb-2 shadow-sm group-hover:shadow-lg transition-shadow">
                                <img src={subCat.imageUrl} alt={subCat.name} className="w-full h-32 object-cover"/>
                            </div>
                            <h3 className="font-semibold text-gray-700 group-hover:text-brand-orange">{subCat.name}</h3>
                        </Link>
                    ))}
                </div>
            </div>
        ))}
    </div>
);

const HomePage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categoryGroups, setCategoryGroups] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const [featuredProducts, fetchedCategoryGroups] = await Promise.all([
                    getFeaturedProducts(),
                    getCategoryGroups(),
                ]);
                setProducts(featuredProducts);
                setCategoryGroups(fetchedCategoryGroups);
            } catch (err) {
                console.error("Failed to fetch homepage data:", err);
                setError("Could not load products. Please ensure the backend server is running and accessible.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return <div className="container mx-auto text-center py-10 px-4"><p className="text-red-500 font-semibold">{error}</p></div>;
    }

    return (
        <div>
            <PromotionalBanner />
            <FeaturesStrip />
            <FrequentlyOrdered products={products} />
            <CategorySections categoryGroups={categoryGroups} />
        </div>
    );
};

export default HomePage;