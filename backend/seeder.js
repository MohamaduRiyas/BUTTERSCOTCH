import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import connectDB from './config/db.js';
import Product from './models/productModel.js';
import User from './models/userModel.js';
import Order from './models/orderModel.js';
import products from './data/products.js';

dotenv.config();

const importData = async () => {
  try {
    // Connect to DB
    await connectDB();
    
    // Clear previous data
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // Manually hash passwords before inserting
    const salt = await bcrypt.genSalt(10);
    const adminPassword = await bcrypt.hash('adminpassword', salt);
    const userPassword = await bcrypt.hash('password123', salt);

    // Create users
    const createdUsers = await User.insertMany([
      {
        name: 'Admin User',
        email: 'admin@butterscotch.com',
        password: adminPassword,
        role: 'admin',
      },
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: userPassword,
      },
    ]);
    
    // Insert products
    await Product.insertMany(products);

    console.log('Data Imported successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
     // Connect to DB
    await connectDB();
      
    // Clear all data
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error with data destruction: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}