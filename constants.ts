import { Product, Category, Order } from './types';

export const CATEGORIES: Category[] = [
  { id: 1, name: 'Fruits & Vegetables', imageUrl: 'https://picsum.photos/seed/fruitsveg/600/400' },
  { id: 2, name: 'Dairy & Bread', imageUrl: 'https://picsum.photos/seed/dairy/600/400' },
  { id: 3, name: 'Staples', imageUrl: 'https://picsum.photos/seed/staples/600/400' },
  { id: 4, name: 'Snacks & Branded Foods', imageUrl: 'https://picsum.photos/seed/indiansnacks/600/400' },
  { id: 5, name: 'Personal Care', imageUrl: 'https://picsum.photos/seed/personalcare/600/400' },
];

export const PRODUCTS: Product[] = [
  // Fruits & Vegetables
  { _id: '1', id: '1', name: 'Fresh Onion - 1kg', category: 'Fruits & Vegetables', price: 40, originalPrice: 55, stock: 150, imageUrl: 'https://picsum.photos/seed/onion/500/500', description: 'Fresh, high-quality onions, a staple in every Indian kitchen.', rating: 4.5, reviews: 320 },
  { _id: '2', id: '2', name: 'Fresh Tomato - 1kg', category: 'Fruits & Vegetables', price: 35, stock: 200, imageUrl: 'https://picsum.photos/seed/tomato/500/500', description: 'Juicy and ripe tomatoes, perfect for curries and salads.', rating: 4.6, reviews: 280 },
  { _id: '3', id: '3', name: 'Fresh Potato - 1kg', category: 'Fruits & Vegetables', price: 30, originalPrice: 40, stock: 300, imageUrl: 'https://picsum.photos/seed/potato/500/500', description: 'Versatile and essential, perfect for a variety of Indian dishes.', rating: 4.7, reviews: 450 },
  
  // Dairy & Bread
  { _id: '4', id: '4', name: 'Amul Butter - 500g', category: 'Dairy & Bread', price: 275, stock: 100, imageUrl: 'https://picsum.photos/seed/butter/500/500', description: 'The taste of India - creamy and delicious Amul butter.', rating: 4.9, reviews: 1100 },
  { _id: '5', id: '5', name: 'Britannia Brown Bread', category: 'Dairy & Bread', price: 45, stock: 120, imageUrl: 'https://picsum.photos/seed/brownbread/500/500', description: 'Healthy and wholesome brown bread for your daily needs.', rating: 4.7, reviews: 400 },
  { _id: '6', id: '6', name: 'Amul Gold Milk - 1L', category: 'Dairy & Bread', price: 68, originalPrice: 72, stock: 250, imageUrl: 'https://picsum.photos/seed/milk/500/500', description: 'Full cream milk for a rich and creamy taste.', rating: 4.8, reviews: 950 },

  // Staples
  { _id: '7', id: '7', name: 'Aashirvaad Shudh Chakki Atta - 5kg', category: 'Staples', price: 280, stock: 80, imageUrl: 'https://picsum.photos/seed/atta/500/500', description: '100% whole wheat atta for soft and fluffy rotis.', rating: 4.9, reviews: 2500 },
  { _id: '8', id: '8', name: 'Tata Salt - 1kg', category: 'Staples', price: 28, stock: 500, imageUrl: 'https://picsum.photos/seed/salt/500/500', description: 'Desh ka Namak, iodized for your family\'s health.', rating: 4.8, reviews: 3000 },
  { _id: '9', id: '9', name: 'Fortune Sun Lite Refined Sunflower Oil - 1L', category: 'Staples', price: 135, originalPrice: 150, stock: 150, imageUrl: 'https://picsum.photos/seed/oil/500/500', description: 'Light and healthy cooking oil for everyday use.', rating: 4.7, reviews: 1800 },

  // Snacks & Branded Foods
  { _id: '10', id: '10', name: 'Parle-G Biscuits - 70g', category: 'Snacks & Branded Foods', price: 10, stock: 1000, imageUrl: 'https://picsum.photos/seed/parleg/500/500', description: 'The original gluco-biscuit, loved by generations.', rating: 5.0, reviews: 10000 },
  { _id: '11', id: '11', name: 'Maggi 2-Minute Noodles - 4 pack', category: 'Snacks & Branded Foods', price: 56, stock: 300, imageUrl: 'https://picsum.photos/seed/maggi/500/500', description: 'Everyone\'s favorite instant noodles, ready in just 2 minutes.', rating: 4.8, reviews: 5000 },
  { _id: '12', id: '12', name: 'Lays India\'s Magic Masala Chips', category: 'Snacks & Branded Foods', price: 20, originalPrice: 25, stock: 400, imageUrl: 'https://picsum.photos/seed/lays/500/500', description: 'A burst of Indian spices in every crunchy bite.', rating: 4.7, reviews: 4500 },

  // Personal Care
  { _id: '13', id: '13', name: 'Colgate MaxFresh Toothpaste - 150g', category: 'Personal Care', price: 95, stock: 200, imageUrl: 'https://picsum.photos/seed/colgate/500/500', description: 'For a refreshing and confident smile.', rating: 4.8, reviews: 2200 },
  { _id: '14', id: '14', name: 'Dove Cream Beauty Bathing Bar - 125g', category: 'Personal Care', price: 68, originalPrice: 75, stock: 180, imageUrl: 'https://picsum.photos/seed/dove/500/500', description: 'Moisturizing soap for soft and smooth skin.', rating: 4.9, reviews: 3500 },
];

export const CATEGORY_GROUPS = [
    {
        name: 'Snacks & Branded Foods',
        subCategories: [
            { name: 'Biscuits & Cookies', imageUrl: 'https://picsum.photos/seed/cookies/300/300' },
            { name: 'Breakfast Cereals', imageUrl: 'https://picsum.photos/seed/cereal/300/300' },
            { name: 'Pasta & Noodles', imageUrl: 'https://picsum.photos/seed/pasta/300/300' },
            { name: 'Sweets & Chocolates', imageUrl: 'https://picsum.photos/seed/chocolates/300/300' },
            { name: 'Chips & Namkeens', imageUrl: 'https://picsum.photos/seed/namkeens/300/300' },
            { name: 'Drinks & Juices', imageUrl: 'https://picsum.photos/seed/juices/300/300' },
        ]
    },
    {
        name: 'Beauty & Personal Care',
        subCategories: [
            { name: 'Oral Care', imageUrl: 'https://picsum.photos/seed/oralcare/300/300' },
            { name: 'Hair Care', imageUrl: 'https://picsum.photos/seed/haircare/300/300' },
            { name: 'Bath & Body', imageUrl: 'https://picsum.photos/seed/bathbody/300/300' },
            { name: 'Skin Care', imageUrl: 'https://picsum.photos/seed/skincare/300/300' },
            { name: 'Beauty & Cosmetics', imageUrl: 'https://picsum.photos/seed/cosmetics/300/300' },
            { name: 'Health & Pharma', imageUrl: 'https://picsum.photos/seed/pharma/300/300' },
        ]
    }
]

// FIX: Added missing 'shippingInfo' property to mock orders to satisfy the Order interface.
export const MOCK_ORDERS: Order[] = [
    { _id: 'ORD-123', user: 'user-1', orderItems: [ { ...PRODUCTS[0], quantity: 2 }, { ...PRODUCTS[6], quantity: 1 } ], shippingInfo: { address: '123 Main St, Anytown, India', email: 'user1@example.com' }, totalPrice: 360, status: 'Delivered', createdAt: '2023-10-26'},
    { _id: 'ORD-124', user: 'user-2', orderItems: [ { ...PRODUCTS[10], quantity: 5 } ], shippingInfo: { address: '456 Oak Ave, Anytown, India', email: 'user2@example.com' }, totalPrice: 280, status: 'Shipped', createdAt: '2023-10-28'},
    { _id: 'ORD-125', user: 'user-1', orderItems: [ { ...PRODUCTS[3], quantity: 2 }, { ...PRODUCTS[4], quantity: 3 } ], shippingInfo: { address: '123 Main St, Anytown, India', email: 'user1@example.com' }, totalPrice: 685, status: 'Pending', createdAt: '2023-10-30'},
];