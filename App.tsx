
import React from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { useAppContext } from './hooks/useAppContext';
import { Layout } from './components/Layout';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AuthPage from './pages/AuthPage';
import AdminPage from './pages/AdminPage';
import MyOrdersPage from './pages/MyOrdersPage';
import NotFoundPage from './pages/NotFoundPage';

interface ProtectedRouteProps {
    children: React.ReactElement;
    adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false }) => {
    const { user } = useAppContext();
    const location = useLocation();

    if (!user) {
        return <Navigate to={`/auth?redirect=${location.pathname}`} replace />;
    }
    
    if (adminOnly && user.role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    return children;
};


const AppRoutes: React.FC = () => (
    <Layout>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/checkout" element={
                <ProtectedRoute>
                    <CheckoutPage />
                </ProtectedRoute>
            } />
            <Route path="/my-orders" element={
                <ProtectedRoute>
                    <MyOrdersPage />
                </ProtectedRoute>
            } />
            <Route path="/admin" element={
                <ProtectedRoute adminOnly={true}>
                    <AdminPage />
                </ProtectedRoute>
            } />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    </Layout>
);

const App: React.FC = () => {
  return (
    <AppProvider>
        <HashRouter>
            <AppRoutes />
        </HashRouter>
    </AppProvider>
  );
};

export default App;
