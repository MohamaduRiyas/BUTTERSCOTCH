import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import { createOrder } from '../services/api';

const CheckoutPage: React.FC = () => {
    const { cart, cartTotal, clearCart, user } = useAppContext();
    const navigate = useNavigate();
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formState, setFormState] = useState({
        firstName: '',
        lastName: '',
        email: user?.email || '',
        address: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const orderData = {
            orderItems: cart.map(({_id, name, quantity, imageUrl, price}) => ({_id, name, quantity, imageUrl, price})),
            shippingInfo: {
                address: formState.address,
                email: formState.email
            },
            totalPrice: cartTotal
        };

        try {
            await createOrder(orderData);
            clearCart();
            setOrderPlaced(true);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to place order.');
        } finally {
            setLoading(false);
        }
    };

    if (orderPlaced) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-3xl font-bold text-green-600 mb-4">Thank You!</h1>
                <p className="text-gray-700 mb-8">Your order has been placed successfully.</p>
                <button onClick={() => navigate('/')} className="bg-butterscotch-brown text-white px-8 py-3 rounded-md font-semibold hover:bg-opacity-90 transition">
                    Continue Shopping
                </button>
            </div>
        )
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>
                <div className="grid lg:grid-cols-3 gap-8">
                    <form onSubmit={handleSubmit} className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4 border-b pb-3">Shipping Information</h2>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <input type="text" name="firstName" placeholder="First Name" value={formState.firstName} onChange={handleChange} className="p-2 border rounded" required />
                            <input type="text" name="lastName" placeholder="Last Name" value={formState.lastName} onChange={handleChange} className="p-2 border rounded" required />
                            <input type="email" name="email" placeholder="Email" value={formState.email} onChange={handleChange} className="p-2 border rounded col-span-2" required />
                            <input type="text" name="address" placeholder="Address" value={formState.address} onChange={handleChange} className="p-2 border rounded col-span-2" required />
                        </div>

                        <h2 className="text-xl font-semibold mb-4 border-b pb-3">Payment Details (Mock)</h2>
                        <div className="space-y-4">
                            <input type="text" placeholder="Card Number" className="p-2 border rounded w-full" defaultValue="4242 4242 4242 4242" required />
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" placeholder="MM/YY" className="p-2 border rounded" defaultValue="12/25" required />
                                <input type="text" placeholder="CVC" className="p-2 border rounded" defaultValue="123" required />
                            </div>
                        </div>

                        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

                        <button type="submit" disabled={loading || cart.length === 0} className="w-full mt-8 bg-butterscotch-brown text-white py-3 rounded-md font-semibold hover:bg-opacity-90 transition disabled:bg-gray-400">
                           {loading ? 'Placing Order...' : 'Place Order'}
                        </button>
                    </form>
                    <div className="bg-white p-6 rounded-lg shadow h-fit">
                        <h2 className="text-xl font-semibold mb-4 border-b pb-3">Your Order</h2>
                        <ul className="space-y-3 mb-4">
                            {cart.map(item => (
                                <li key={item._id} className="flex justify-between text-sm">
                                    <span>{item.name} x {item.quantity}</span>
                                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="border-t pt-4">
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>₹{cartTotal.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;