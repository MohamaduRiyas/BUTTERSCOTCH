
import React, { useState, useEffect, FormEvent } from 'react';
import { Product, Order } from '../types';
import { getProducts, adminGetAllOrders, adminAddProduct, adminUpdateProduct, adminDeleteProduct, adminUpdateOrderStatus, getCategories } from '../services/api';
import Spinner from '../components/Spinner';

// Modal Component for Add/Edit Product
const ProductFormModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onSave: (productData: Partial<Product>) => void;
    product: Product | null;
}> = ({ isOpen, onClose, onSave, product }) => {
    const [formData, setFormData] = useState<Partial<Product>>({
        name: '', category: '', price: 0, stock: 0, imageUrl: '', description: '', originalPrice: 0
    });

    useEffect(() => {
        if (product) {
            setFormData(product);
        } else {
            setFormData({ name: '', category: 'Staples', price: 0, stock: 0, imageUrl: '', description: '', originalPrice: 0 });
        }
    }, [product, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'price' || name === 'stock' || name === 'originalPrice' ? Number(value) : value }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-4">{product ? 'Edit Product' : 'Add New Product'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" required />
                    <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded" required>
                        <option value="Fruits & Vegetables">Fruits & Vegetables</option>
                        <option value="Dairy & Bread">Dairy & Bread</option>
                        <option value="Staples">Staples</option>
                        <option value="Snacks & Branded Foods">Snacks & Branded Foods</option>
                        <option value="Personal Care">Personal Care</option>
                    </select>
                    <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded" required />
                    <input type="text" name="imageUrl" placeholder="Image URL" value={formData.imageUrl} onChange={handleChange} className="w-full p-2 border rounded" required />
                    <div className="grid grid-cols-3 gap-4">
                        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="w-full p-2 border rounded" required />
                        <input type="number" name="originalPrice" placeholder="Original Price (Optional)" value={formData.originalPrice || ''} onChange={handleChange} className="w-full p-2 border rounded" />
                        <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} className="w-full p-2 border rounded" required />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-butterscotch-brown text-white rounded">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const ProductManagement: React.FC<{ products: Product[], onEdit: (p: Product) => void, onDelete: (id: string) => void, onAddNew: () => void }> = ({ products, onEdit, onDelete, onAddNew }) => {
    return (
        <div>
            <div className="text-right mb-4">
                <button onClick={onAddNew} className="bg-butterscotch-brown text-white px-4 py-2 rounded-md font-semibold hover:bg-opacity-90 transition">
                    Add New Product
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 text-left">Name</th>
                            <th className="py-2 px-4 text-left">Category</th>
                            <th className="py-2 px-4 text-left">Price</th>
                            <th className="py-2 px-4 text-left">Stock</th>
                            <th className="py-2 px-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(p => (
                            <tr key={p._id} className="border-b">
                                <td className="py-2 px-4">{p.name}</td>
                                <td className="py-2 px-4">{p.category}</td>
                                <td className="py-2 px-4">₹{p.price.toFixed(2)}</td>
                                <td className="py-2 px-4">{p.stock}</td>
                                <td className="py-2 px-4">
                                    <button onClick={() => onEdit(p)} className="text-blue-500 hover:underline text-sm font-semibold">Edit</button>
                                    <button onClick={() => onDelete(p._id)} className="text-red-500 hover:underline ml-4 text-sm font-semibold">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const OrderManagement: React.FC<{ orders: Order[], onStatusChange: (id: string, status: string) => void }> = ({ orders, onStatusChange }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="py-2 px-4 text-left">Order ID</th>
                        <th className="py-2 px-4 text-left">Date</th>
                        <th className="py-2 px-4 text-left">Customer</th>
                        <th className="py-2 px-4 text-left">Total</th>
                        <th className="py-2 px-4 text-left">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(o => (
                        <tr key={o._id} className="border-b">
                            <td className="py-2 px-4 text-sm text-gray-500">{o._id}</td>
                            <td className="py-2 px-4">{new Date(o.createdAt).toLocaleDateString()}</td>
                            <td className="py-2 px-4">{typeof o.user === 'object' ? o.user.name : o.user}</td>
                            <td className="py-2 px-4">₹{o.totalPrice.toFixed(2)}</td>
                            <td className="py-2 px-4">
                               <select value={o.status} onChange={(e) => onStatusChange(o._id, e.target.value)} className="p-1 border rounded">
                                   <option value="Pending">Pending</option>
                                   <option value="Shipped">Shipped</option>
                                   <option value="Delivered">Delivered</option>
                               </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}


const AdminPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('products');
    const [products, setProducts] = useState<Product[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string|null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const [fetchedProducts, fetchedOrders] = await Promise.all([
                getProducts(),
                adminGetAllOrders()
            ]);
            setProducts(fetchedProducts);
            setOrders(fetchedOrders);
        } catch (err) {
            setError("Failed to fetch data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleOpenModal = (product: Product | null) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
    };

    const handleSaveProduct = async (productData: Partial<Product>) => {
        try {
            if (editingProduct) {
                await adminUpdateProduct(editingProduct._id, productData);
            } else {
                await adminAddProduct(productData);
            }
            fetchData();
            handleCloseModal();
        } catch (err) {
            console.error("Failed to save product", err);
            setError("Failed to save product.");
        }
    };

    const handleDeleteProduct = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await adminDeleteProduct(id);
                fetchData();
            } catch (err) {
                console.error("Failed to delete product", err);
                setError("Failed to delete product.");
            }
        }
    };

    const handleOrderStatusChange = async (id: string, status: string) => {
        try {
            await adminUpdateOrderStatus(id, status);
            fetchData(); // Refetch to show updated status
        } catch (err) {
             console.error("Failed to update status", err);
             setError("Failed to update order status.");
        }
    };


    const renderContent = () => {
        if (loading) return <Spinner />;
        if (error) return <p className="text-red-500">{error}</p>
        
        switch (activeTab) {
            case 'products':
                return <ProductManagement products={products} onEdit={(p) => handleOpenModal(p)} onDelete={handleDeleteProduct} onAddNew={() => handleOpenModal(null)} />;
            case 'orders':
                return <OrderManagement orders={orders} onStatusChange={handleOrderStatusChange} />;
            default:
                return null;
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
            <div className="flex border-b mb-6">
                <button onClick={() => setActiveTab('products')} className={`py-2 px-4 ${activeTab === 'products' ? 'border-b-2 border-butterscotch-brown font-semibold' : 'text-gray-500'}`}>
                    Manage Products
                </button>
                <button onClick={() => setActiveTab('orders')} className={`py-2 px-4 ${activeTab === 'orders' ? 'border-b-2 border-butterscotch-brown font-semibold' : 'text-gray-500'}`}>
                    View Orders
                </button>
            </div>
            {renderContent()}
            <ProductFormModal isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleSaveProduct} product={editingProduct} />
        </div>
    );
};

export default AdminPage;
