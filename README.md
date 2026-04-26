# 🛒 ShopMERN — Complete MERN Stack Shopping Website

## 📁 Project Structure

```
mern-shop/
├── backend/                 # Node.js + Express + MongoDB
│   ├── models/
│   │   ├── User.js          # User schema (auth + address)
│   │   ├── Product.js       # Product schema (with reviews)
│   │   └── Order.js         # Order schema
│   ├── routes/
│   │   ├── authRoutes.js    # /api/auth (login, register, profile)
│   │   ├── productRoutes.js # /api/products (CRUD + reviews)
│   │   ├── orderRoutes.js   # /api/orders
│   │   └── userRoutes.js    # /api/users (admin)
│   ├── middleware/
│   │   └── authMiddleware.js # JWT protect + admin check
│   ├── uploads/             # Product images (auto-created)
│   ├── server.js            # Main entry point
│   ├── seed.js              # Sample data seeder
│   └── .env.example         # Environment variables
│
└── frontend/                # React.js
    └── src/
        ├── context/
        │   ├── AuthContext.js   # User auth state
        │   └── CartContext.js   # Cart state
        ├── utils/
        │   └── api.js           # Axios with JWT interceptor
        ├── components/
        │   ├── Navbar.js        # Navigation with search + cart
        │   ├── ProductCard.js   # Product grid card
        │   ├── PrivateRoute.js  # Route guard
        │   └── AdminRoute.js    # Admin route guard
        ├── pages/
        │   ├── HomePage.js      # Hero + categories + featured
        │   ├── ProductsPage.js  # Grid with search + filter + pagination
        │   ├── ProductDetailPage.js # Detail + reviews
        │   ├── CartPage.js      # Cart with qty update
        │   ├── CheckoutPage.js  # 3-step checkout
        │   ├── LoginPage.js
        │   ├── RegisterPage.js
        │   ├── ProfilePage.js
        │   ├── OrdersPage.js
        │   ├── OrderDetailPage.js
        │   └── admin/
        │       ├── AdminDashboard.js  # Stats overview
        │       ├── AdminProducts.js   # Product list + delete
        │       ├── AdminProductEdit.js # Add/Edit product with image upload
        │       ├── AdminOrders.js     # All orders + status update
        │       └── AdminUsers.js      # User management
        ├── App.js               # Routes configuration
        └── index.js             # Entry point
```

## 🚀 Setup & Run

### Prerequisites
- Node.js v18+
- MongoDB (local or MongoDB Atlas)

### Step 1: Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env and set your MONGO_URI and JWT_SECRET

# Create uploads folder
mkdir uploads

# (Optional) Seed sample data
node seed.js

# Start server
npm run dev
# Server runs on http://localhost:5000
```

### Step 2: Frontend Setup
```bash
cd frontend
npm install
npm start
# App runs on http://localhost:3000
```

## 🔑 Default Test Accounts (after seeding)
| Role  | Email                  | Password  |
|-------|------------------------|-----------|
| Admin | admin@shopmern.com     | admin123  |
| User  | user@shopmern.com      | user123   |

## 🌐 API Endpoints

### Auth
| Method | URL                    | Access  |
|--------|------------------------|---------|
| POST   | /api/auth/register     | Public  |
| POST   | /api/auth/login        | Public  |
| GET    | /api/auth/profile      | Private |
| PUT    | /api/auth/profile      | Private |

### Products
| Method | URL                         | Access  |
|--------|------------------------------|---------|
| GET    | /api/products                | Public  |
| GET    | /api/products/categories     | Public  |
| GET    | /api/products/:id            | Public  |
| POST   | /api/products                | Admin   |
| PUT    | /api/products/:id            | Admin   |
| DELETE | /api/products/:id            | Admin   |
| POST   | /api/products/:id/reviews    | Private |

### Orders
| Method | URL                         | Access  |
|--------|-----------------------------|---------|
| POST   | /api/orders                  | Private |
| GET    | /api/orders/myorders         | Private |
| GET    | /api/orders/:id              | Private |
| PUT    | /api/orders/:id/pay          | Private |
| GET    | /api/orders                  | Admin   |
| PUT    | /api/orders/:id/status       | Admin   |

### Users
| Method | URL                    | Access |
|--------|------------------------|--------|
| GET    | /api/users             | Admin  |
| DELETE | /api/users/:id         | Admin  |
| PUT    | /api/users/:id/admin   | Admin  |

## ☁️ Deployment

### Backend → Railway / Render / Heroku
1. Push backend to GitHub
2. Connect to Railway.app (free tier available)
3. Set environment variables:
   - `MONGO_URI` = MongoDB Atlas connection string
   - `JWT_SECRET` = any random secret string
   - `PORT` = 5000

### Frontend → Vercel / Netlify
1. Push frontend to GitHub
2. Connect to Vercel.com
3. Set environment variable:
   - `REACT_APP_API_URL` = your backend URL
4. Update `frontend/src/utils/api.js`:
   ```js
   const API = axios.create({ baseURL: process.env.REACT_APP_API_URL + '/api' });
   ```

### MongoDB Atlas (Free Database)
1. Go to mongodb.com/atlas
2. Create free cluster
3. Get connection string → add to backend .env

## 💳 Payment Integration (Razorpay)
```bash
cd backend && npm install razorpay
```
See Razorpay docs to add payment gateway at `/api/orders/:id/pay`

## ✅ Features Included
- User registration, login, JWT authentication
- Product listing with search, category filter, pagination
- Product details with ratings & reviews
- Shopping cart (persistent in localStorage)
- 3-step checkout (address → payment → review)
- Order tracking with status updates
- Admin dashboard with stats
- Admin: Add/Edit/Delete products with image upload
- Admin: Manage all orders, update status
- Admin: Manage users, toggle admin role
