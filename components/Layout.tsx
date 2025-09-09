
import React, { ReactNode, useState } from 'react';
import { HashRouter, Link, NavLink } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';

const Navbar: React.FC = () => {
  const { cartCount, user, logout } = useAppContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-extrabold text-butterscotch-brown tracking-wider">
              BUTTERSCOTCH
            </Link>
          </div>

          <div className="hidden md:flex flex-grow max-w-xl mx-4">
            <input 
              type="search" 
              placeholder="Search for products..." 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-butterscotch-yellow"
            />
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative text-gray-600 hover:text-butterscotch-brown">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-orange text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{cartCount}</span>
              )}
            </Link>
            <div className="relative">
              {user ? (
                <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-butterscotch-cream text-butterscotch-brown flex items-center justify-center font-bold">{user.name.charAt(0)}</div>
                </button>
              ) : (
                <Link to="/auth" className="hidden md:block bg-butterscotch-brown text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition">Login</Link>
              )}
               {profileOpen && user && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                        <div className="px-4 py-2 text-sm text-gray-700 font-semibold">{user.name}</div>
                        <Link to="/my-orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setProfileOpen(false)}>My Orders</Link>
                        {user.role === 'admin' && <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setProfileOpen(false)}>Admin Panel</Link>}
                        <button onClick={() => { logout(); setProfileOpen(false); }} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
                    </div>
                )}
            </div>
            <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden pb-4">
            <NavLink to="/" className="block py-2 px-4 text-sm hover:bg-gray-100" onClick={() => setMenuOpen(false)}>Home</NavLink>
            <NavLink to="/products" className="block py-2 px-4 text-sm hover:bg-gray-100" onClick={() => setMenuOpen(false)}>Products</NavLink>
            {!user && <Link to="/auth" className="block py-2 px-4 text-sm hover:bg-gray-100" onClick={() => setMenuOpen(false)}>Login</Link>}
          </div>
        )}
      </div>
    </nav>
  );
};

const Footer: React.FC = () => {
    return (
        <footer className="bg-butterscotch-cream text-butterscotch-brown">
            <div className="container mx-auto px-4 py-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">BUTTERSCOTCH</h3>
                        <p className="text-sm">Your one-stop shop for everything you need, delivered with care.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/products" className="hover:underline">Shop</Link></li>
                            <li><Link to="/cart" className="hover:underline">My Cart</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Support</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:underline">FAQs</a></li>
                            <li><a href="#" className="hover:underline">Contact Us</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Follow Us</h4>
                         <div className="flex space-x-4">
                           {/* Add social icons here */}
                         </div>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-butterscotch-brown/20 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} Butterscotch Departmental Store. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};


export const Layout: React.FC<{children: ReactNode}> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};
