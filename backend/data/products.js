const products = [
  // Fruits & Vegetables
  { name: 'Fresh Onion - 1kg', category: 'Fruits & Vegetables', price: 40, originalPrice: 55, stock: 150, imageUrl: 'https://picsum.photos/seed/onion/500/500', description: 'Fresh, high-quality onions, a staple in every Indian kitchen.', rating: 4.5, reviews: 320 },
  { name: 'Fresh Tomato - 1kg', category: 'Fruits & Vegetables', price: 35, stock: 200, imageUrl: 'https://picsum.photos/seed/tomato/500/500', description: 'Juicy and ripe tomatoes, perfect for curries and salads.', rating: 4.6, reviews: 280 },
  { name: 'Fresh Potato - 1kg', category: 'Fruits & Vegetables', price: 30, originalPrice: 40, stock: 300, imageUrl: 'https://picsum.photos/seed/potato/500/500', description: 'Versatile and essential, perfect for a variety of Indian dishes.', rating: 4.7, reviews: 450 },
  
  // Dairy & Bread
  { name: 'Amul Butter - 500g', category: 'Dairy & Bread', price: 275, stock: 100, imageUrl: 'https://picsum.photos/seed/butter/500/500', description: 'The taste of India - creamy and delicious Amul butter.', rating: 4.9, reviews: 1100 },
  { name: 'Britannia Brown Bread', category: 'Dairy & Bread', price: 45, stock: 120, imageUrl: 'https://picsum.photos/seed/brownbread/500/500', description: 'Healthy and wholesome brown bread for your daily needs.', rating: 4.7, reviews: 400 },
  { name: 'Amul Gold Milk - 1L', category: 'Dairy & Bread', price: 68, originalPrice: 72, stock: 250, imageUrl: 'https://picsum.photos/seed/milk/500/500', description: 'Full cream milk for a rich and creamy taste.', rating: 4.8, reviews: 950 },

  // Staples
  { name: 'Aashirvaad Shudh Chakki Atta - 5kg', category: 'Staples', price: 280, stock: 80, imageUrl: 'https://picsum.photos/seed/atta/500/500', description: '100% whole wheat atta for soft and fluffy rotis.', rating: 4.9, reviews: 2500 },
  { name: 'Tata Salt - 1kg', category: 'Staples', price: 28, stock: 500, imageUrl: 'https://picsum.photos/seed/salt/500/500', description: 'Desh ka Namak, iodized for your family\'s health.', rating: 4.8, reviews: 3000 },
  { name: 'Fortune Sun Lite Refined Sunflower Oil - 1L', category: 'Staples', price: 135, originalPrice: 150, stock: 150, imageUrl: 'https://picsum.photos/seed/oil/500/500', description: 'Light and healthy cooking oil for everyday use.', rating: 4.7, reviews: 1800 },

  // Snacks & Branded Foods
  { name: 'Parle-G Biscuits - 70g', category: 'Snacks & Branded Foods', price: 10, stock: 1000, imageUrl: 'https://picsum.photos/seed/parleg/500/500', description: 'The original gluco-biscuit, loved by generations.', rating: 5.0, reviews: 10000 },
  { name: 'Maggi 2-Minute Noodles - 4 pack', category: 'Snacks & Branded Foods', price: 56, stock: 300, imageUrl: 'https://picsum.photos/seed/maggi/500/500', description: 'Everyone\'s favorite instant noodles, ready in just 2 minutes.', rating: 4.8, reviews: 5000 },
  { name: 'Lays India\'s Magic Masala Chips', category: 'Snacks & Branded Foods', price: 20, originalPrice: 25, stock: 400, imageUrl: 'https://picsum.photos/seed/lays/500/500', description: 'A burst of Indian spices in every crunchy bite.', rating: 4.7, reviews: 4500 },

  // Personal Care
  { name: 'Colgate MaxFresh Toothpaste - 150g', category: 'Personal Care', price: 95, stock: 200, imageUrl: 'https://picsum.photos/seed/colgate/500/500', description: 'For a refreshing and confident smile.', rating: 4.8, reviews: 2200 },
  { name: 'Dove Cream Beauty Bathing Bar - 125g', category: 'Personal Care', price: 68, originalPrice: 75, stock: 180, imageUrl: 'https://picsum.photos/seed/dove/500/500', description: 'Moisturizing soap for soft and smooth skin.', rating: 4.9, reviews: 3500 },
];

export default products;
