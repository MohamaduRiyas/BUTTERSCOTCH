import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';

const CartPage: React.FC = () => {
  const { cart, cartTotal, cartCount, updateQuantity, removeFromCart, user } = useAppContext();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (user) {
        navigate('/checkout');
    } else {
        navigate('/auth?redirect=/checkout');
    }
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/products" className="bg-butterscotch-brown text-white px-8 py-3 rounded-md font-semibold hover:bg-opacity-90 transition">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Shopping Cart</h1>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
            <ul className="divide-y divide-gray-200">
              {cart.map(item => (
                <li key={item._id} className="flex items-center py-4">
                  <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
                  <div className="ml-4 flex-grow">
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-500">₹{item.price.toFixed(2)}</p>
                    <button onClick={() => removeFromCart(item._id)} className="text-red-500 text-sm hover:underline mt-1">Remove</button>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={e => updateQuantity(item._id, parseInt(e.target.value))}
                      className="w-16 border rounded p-1 text-center"
                      min="1"
                    />
                    <p className="font-semibold w-24 text-right">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow p-6 h-fit">
            <h2 className="text-xl font-semibold border-b pb-4 mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal ({cartCount} items)</span>
              <span className="font-semibold">₹{cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Shipping</span>
              <span className="font-semibold text-green-600">FREE</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-4">
              <span>Total</span>
              <span>₹{cartTotal.toFixed(2)}</span>
            </div>
            <button onClick={handleCheckout} className="w-full mt-6 bg-butterscotch-brown text-white py-3 rounded-md font-semibold hover:bg-opacity-90 transition">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;