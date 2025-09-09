import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

// Load env vars
dotenv.config();

// FIX: Added a critical check for essential environment variables.
// The server will now fail fast with a clear, helpful error message if the .env file
// is missing or not configured correctly, preventing confusing frontend errors.
if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
    console.error('FATAL ERROR: MONGO_URI and JWT_SECRET must be defined in the .env file.');
    console.error('Please create a .env file in the backend/ directory and add the required variables.');
    console.error('Refer to the README.md file for detailed instructions.');
    process.exit(1);
}

// Connect to Database
connectDB();

const app = express();

// Middlewares
// FIX: Implemented a more robust CORS configuration to explicitly handle pre-flight requests,
// ensuring reliable communication between the frontend and backend servers.
const corsOptions = {
  origin: '*', // Allow all origins for development
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Enable pre-flight for all routes

app.use(express.json());

// API Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});