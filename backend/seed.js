const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// Models
const Product = require('./models/Product');
const User = require('./models/User');

const sampleProducts = [
  { name: 'iPhone 15 Pro', description: 'Apple iPhone 15 Pro with A17 Pro chip, 48MP camera system, and titanium design.', price: 134900, image: 'https://via.placeholder.com/400x400?text=iPhone+15+Pro', category: 'Electronics', brand: 'Apple', countInStock: 25 },
  { name: 'Samsung Galaxy S24', description: 'Samsung Galaxy S24 with Snapdragon 8 Gen 3, AI features, and ProVisual Engine.', price: 79999, image: 'https://via.placeholder.com/400x400?text=Galaxy+S24', category: 'Electronics', brand: 'Samsung', countInStock: 30 },
  { name: 'Sony WH-1000XM5', description: 'Industry-leading noise canceling headphones with 30hr battery and multipoint connect.', price: 29990, image: 'https://via.placeholder.com/400x400?text=Sony+Headphones', category: 'Electronics', brand: 'Sony', countInStock: 50 },
  { name: 'Nike Air Max 270', description: 'Nike Air Max 270 with large Air unit for all-day comfort and modern lifestyle look.', price: 12995, image: 'https://via.placeholder.com/400x400?text=Nike+Air+Max', category: 'Footwear', brand: 'Nike', countInStock: 100 },
  { name: 'Levi\'s 511 Slim Jeans', description: 'Classic slim fit jeans from Levi\'s in premium stretch denim for modern comfort.', price: 3499, image: 'https://via.placeholder.com/400x400?text=Levis+511', category: 'Clothing', brand: 'Levi\'s', countInStock: 75 },
  { name: 'MacBook Air M2', description: 'MacBook Air with M2 chip, 13.6 inch Liquid Retina display, and 18hr battery.', price: 114900, image: 'https://via.placeholder.com/400x400?text=MacBook+Air+M2', category: 'Electronics', brand: 'Apple', countInStock: 15 },
  { name: 'Boat Airdopes 141', description: 'Boat Airdopes 141 TWS earbuds with 42hr total playback and ENx tech.', price: 999, image: 'https://via.placeholder.com/400x400?text=Boat+Airdopes', category: 'Electronics', brand: 'Boat', countInStock: 200 },
  { name: 'Prestige Induction Cooktop', description: 'Prestige PIC 16.0+ induction cooktop with feather touch and 7 preset menus.', price: 2195, image: 'https://via.placeholder.com/400x400?text=Induction+Cooktop', category: 'Home & Kitchen', brand: 'Prestige', countInStock: 40 },
];

async function seedData() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mernshop');
    console.log('Connected to MongoDB...');

    // Clear existing data
    await Product.deleteMany();
    await User.deleteMany();
    console.log('Cleared existing data');

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@shopmern.com',
      password: 'admin123',
      isAdmin: true
    });
    console.log('Admin created: admin@shopmern.com / admin123');

    // Create regular user
    await User.create({
      name: 'Test User',
      email: 'user@shopmern.com',
      password: 'user123',
    });
    console.log('User created: user@shopmern.com / user123');

    // Insert products
    await Product.insertMany(sampleProducts);
    console.log(`✅ ${sampleProducts.length} products seeded`);

    console.log('\n🎉 Seed complete! You can now run the app.');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seedData();
