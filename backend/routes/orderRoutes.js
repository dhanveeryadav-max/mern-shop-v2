const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { protect, admin } = require('../middleware/authMiddleware');

// @POST /api/orders - Create order
router.post('/', protect, async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice } = req.body;
    if (!orderItems || orderItems.length === 0) return res.status(400).json({ message: 'No order items' });

    const order = await Order.create({
      user: req.user._id, orderItems, shippingAddress,
      paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice
    });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @GET /api/orders/myorders - User's orders
router.get('/myorders', protect, async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort('-createdAt');
  res.json(orders);
});

// @GET /api/orders/:id - Single order
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @PUT /api/orders/:id/pay - Mark as paid (after payment gateway)
router.put('/:id/pay', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    order.isPaid = true;
    order.paidAt = Date.now();
    order.status = 'Processing';
    const updated = await order.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @GET /api/orders - All orders (Admin)
router.get('/', protect, admin, async (req, res) => {
  const orders = await Order.find({}).populate('user', 'name email').sort('-createdAt');
  res.json(orders);
});

// @PUT /api/orders/:id/status - Update status (Admin)
router.put('/:id/status', protect, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    order.status = req.body.status;
    if (req.body.status === 'Delivered') {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
    }
    const updated = await order.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
