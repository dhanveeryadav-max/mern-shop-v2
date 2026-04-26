const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect, admin } = require('../middleware/authMiddleware');

// @GET /api/users - All users (Admin)
router.get('/', protect, admin, async (req, res) => {
  const users = await User.find({}).select('-password');
  res.json(users);
});

// @DELETE /api/users/:id (Admin)
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @PUT /api/users/:id/admin - Toggle admin (Admin)
router.put('/:id/admin', protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.isAdmin = !user.isAdmin;
    await user.save();
    res.json({ message: `User is now ${user.isAdmin ? 'admin' : 'regular user'}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
