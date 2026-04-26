const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/authMiddleware');

// Multer setup for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `product_${Date.now()}${path.extname(file.originalname)}`)
});
const upload = multer({ storage });

// @GET /api/products?keyword=&category=&page=
router.get('/', async (req, res) => {
  const pageSize = 8;
  const page = Number(req.query.page) || 1;
  const keyword = req.query.keyword ? { name: { $regex: req.query.keyword, $options: 'i' } } : {};
  const category = req.query.category ? { category: req.query.category } : {};

  const count = await Product.countDocuments({ ...keyword, ...category });
  const products = await Product.find({ ...keyword, ...category })
    .limit(pageSize).skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize), total: count });
});

// @GET /api/products/categories
router.get('/categories', async (req, res) => {
  const categories = await Product.distinct('category');
  res.json(categories);
});

// @GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @POST /api/products (Admin)
router.post('/', protect, admin, upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, category, brand, countInStock } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : '/uploads/sample.jpg';
    const product = await Product.create({ name, description, price, image, category, brand, countInStock });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @PUT /api/products/:id (Admin)
router.put('/:id', protect, admin, upload.single('image'), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const { name, description, price, category, brand, countInStock } = req.body;
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.brand = brand || product.brand;
    product.countInStock = countInStock ?? product.countInStock;
    if (req.file) product.image = `/uploads/${req.file.filename}`;

    const updated = await product.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @DELETE /api/products/:id (Admin)
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @POST /api/products/:id/reviews (User)
router.post('/:id/reviews', protect, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString());
    if (alreadyReviewed) return res.status(400).json({ message: 'Product already reviewed' });

    const review = { user: req.user._id, name: req.user.name, rating: Number(req.body.rating), comment: req.body.comment };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating = product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length;
    await product.save();
    res.status(201).json({ message: 'Review added' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
