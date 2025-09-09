import axios from 'axios';
import { Product, Category, Order, User } from '../types';
import { CATEGORIES, CATEGORY_GROUPS, PRODUCTS } from '../constants';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Use the absolute URL of the backend
});

// Interceptor to add the auth token to every request if it exists
api.interceptors.request.use(config => {
  const userString = localStorage.getItem('butterscotch_user');
  if (userString) {
    const user = JSON.parse(userString);
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
  }
  return config;
});


// --- Product APIs ---
export const getProducts = async (category?: string): Promise<Product[]> => {
  try {
    const { data } = await api.get<Product[]>('/products', {
      params: { category },
    });
    return data;
  } catch (error) {
    console.warn('API call to getProducts failed. Falling back to mock data.', error);
    if (category) {
        return PRODUCTS.filter(p => p.category === category);
    }
    return PRODUCTS;
  }
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
  try {
    const { data } = await api.get<Product>(`/products/${id}`);
    return data;
  } catch (error) {
    console.warn(`API call to getProductById for ID ${id} failed. Falling back to mock data.`, error);
    return PRODUCTS.find(p => p._id === id);
  }
};

// --- Static Data (can remain as is) ---
export const getCategories = (): Promise<Category[]> => Promise.resolve(CATEGORIES);
export const getCategoryGroups = (): Promise<any[]> => Promise.resolve(CATEGORY_GROUPS);
export const getFeaturedProducts = async (): Promise<Product[]> => {
    const allProducts = await getProducts();
    return allProducts.slice(0, 8); // Simulate featured by taking the first 8
};

// --- Auth APIs ---
export const loginUser = async (email:string, password:string):Promise<User> => {
    const { data } = await api.post('/auth/login', { email, password });
    return data;
}

export const registerUser = async (name:string, email:string, password:string): Promise<User> => {
    const { data } = await api.post('/auth/register', { name, email, password });
    return data;
}

// --- Order APIs (Protected) ---
export const createOrder = async (orderData: any): Promise<Order> => {
    const { data } = await api.post('/orders', orderData);
    return data;
};

export const getUserOrders = async (): Promise<Order[]> => {
    const { data } = await api.get('/orders/my-orders');
    return data;
};


// --- Admin APIs (Protected & Admin Only) ---
export const adminGetAllOrders = async (): Promise<Order[]> => {
    const { data } = await api.get('/admin/orders');
    return data;
}

export const adminAddProduct = async (productData: Partial<Product>): Promise<Product> => {
    const { data } = await api.post('/admin/products', productData);
    return data;
}

export const adminUpdateProduct = async (id: string, productData: Partial<Product>): Promise<Product> => {
    const { data } = await api.put(`/admin/products/${id}`, productData);
    return data;
}

export const adminDeleteProduct = async (id: string): Promise<any> => {
    const { data } = await api.delete(`/admin/products/${id}`);
    return data;
}

export const adminUpdateOrderStatus = async (id: string, status: string): Promise<Order> => {
    const { data } = await api.put(`/admin/orders/${id}`, { status });
    return data;
}