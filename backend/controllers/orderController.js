import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  const { orderItems, shippingInfo, totalPrice } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    const order = new Order({
      // Ensure the frontend sends cart items that match this structure
      orderItems: orderItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        imageUrl: item.imageUrl,
        price: item.price,
        product: item._id, // The frontend should send the product's _id
      })),
      user: req.user._id,
      shippingInfo,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/my-orders
// @access  Private
const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

export { createOrder, getUserOrders };