
import React, { useEffect, useState } from 'react';
import { getUserOrders } from '../services/api';
import { Order } from '../types';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';

const MyOrdersPage: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const fetchedOrders = await getUserOrders();
                // Sort orders by most recent first
                fetchedOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                setOrders(fetchedOrders);
            } catch (err) {
                setError('Failed to fetch your orders.');
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) return <Spinner />;
    if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

    if (orders.length === 0) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-3xl font-bold mb-4">You have no orders yet.</h1>
                <p className="text-gray-600 mb-8">All your placed orders will appear here.</p>
                <Link to="/products" className="bg-butterscotch-brown text-white px-8 py-3 rounded-md font-semibold hover:bg-opacity-90 transition">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Orders</h1>
                <div className="space-y-6">
                    {orders.map(order => (
                        <div key={order._id} className="bg-white rounded-lg shadow p-6">
                            <div className="flex flex-col sm:flex-row justify-between items-start border-b pb-4 mb-4 gap-4">
                                <div>
                                    <p className="font-semibold">Order ID: <span className="text-gray-600 font-normal">{order._id}</span></p>
                                    <p className="font-semibold">Date: <span className="text-gray-600 font-normal">{new Date(order.createdAt).toLocaleDateString()}</span></p>
                                </div>
                                <div className="text-left sm:text-right">
                                     <p className="font-bold text-lg">Total: ₹{order.totalPrice.toFixed(2)}</p>
                                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                                        order.status === 'Delivered' ? 'bg-green-200 text-green-800' :
                                        order.status === 'Shipped' ? 'bg-blue-200 text-blue-800' : 'bg-yellow-200 text-yellow-800'
                                    }`}>{order.status}</span>
                                </div>
                            </div>
                            <div>
                               <h3 className="font-semibold mb-3 text-lg">Items</h3>
                               <ul className="space-y-3">
                                   {order.orderItems.map((item, index) => (
                                       <li key={index} className="flex items-center text-sm">
                                           <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                                           <div className="flex-grow">
                                               <p className="font-semibold text-gray-800">{item.name}</p>
                                               <p className="text-gray-500">Quantity: {item.quantity}</p>
                                           </div>
                                           <p className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</p>
                                       </li>
                                   ))}
                               </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyOrdersPage;
