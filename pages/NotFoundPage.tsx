
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-6xl font-extrabold text-butterscotch-brown mb-4">404</h1>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Page Not Found</h2>
            <p className="text-gray-600 mb-8">Oops! The page you're looking for doesn't exist.</p>
            <Link to="/" className="bg-butterscotch-brown text-white px-8 py-3 rounded-md font-semibold hover:bg-opacity-90 transition">
                Go back to Home
            </Link>
        </div>
    );
};

export default NotFoundPage;
