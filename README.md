# ShopHub - Product Catalog Application

A modern, full-featured product catalog web application built with Next.js 15/16 (App Router). This application allows users to browse products publicly and authenticated admins to add new products to the catalog.

## 📋 Project Description

ShopHub is a responsive product catalog application that demonstrates modern web development practices using Next.js. The application features a beautiful landing page, product browsing capabilities, search and filtering, and a protected admin area for adding new products.

## 🚀 Features

### Core Features

1. **Landing Page**
   - Hero section with call-to-action buttons
   - Features showcase
   - Popular products display
   - How it works section
   - Statistics and testimonials
   - Product categories grid
   - Final call-to-action section

2. **Authentication**
   - Mock login system with hardcoded credentials
   - Cookie-based session management
   - Protected routes for authenticated users
   - Automatic redirect for unauthenticated users

3. **Product List Page**
   - Publicly accessible product browsing
   - Search functionality (by name or description)
   - Category filtering
   - Responsive grid layout
   - Loading states and error handling

4. **Product Details Page**
   - Full product information display
   - Image placeholder
   - Category badge
   - Price display
   - Navigation back to products list

5. **Add Product Page (Protected)**
   - Form to add new products
   - Form validation
   - Category selection
   - Success notifications using React Hot Toast
   - Redirect to products list after success

### Additional Features

- **Responsive Design**: Mobile-first approach, works on all devices
- **Loading Spinner**: Reusable loading component used throughout
- **Toast Notifications**: Success messages using React Hot Toast
- **Sweet Alerts**: Error handling with React Sweet Alert 2
- **Search & Filter**: Real-time search and category filtering

## 🛠️ Technologies Used

- **Next.js 15/16** (App Router)
- **JavaScript (JSX)**
- **Tailwind CSS** (for styling)
- **React Hot Toast** (for notifications)
- **React Sweet Alert 2** (for alerts)
- **Next.js API Routes** (for backend functionality)
- **JSON File Storage** (for data persistence)

## 📦 Installation & Setup

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Steps

1. **Clone or download the repository**

2. **Navigate to the project directory**
   ```bash
   cd shop-hub
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🔐 Login Credentials

For demo purposes, use these credentials:

- **Email**: `admin@shophub.com`
- **Password**: `admin123`

## 📂 Project Structure

```
shop-hub/
├── app/
│   ├── (public)/
│   │   ├── page.js                 # Landing page
│   │   └── products/
│   │       ├── page.js             # Product list page
│   │       └── [id]/
│   │           └── page.js         # Product details page
│   ├── (protected)/
│   │   └── products/
│   │       └── add/
│   │           └── page.js         # Add product page (protected)
│   ├── login/
│   │   └── page.js                 # Login page
│   ├── api/
│   │   ├── products/
│   │   │   ├── route.js            # GET all, POST new products
│   │   │   └── [id]/
│   │   │       └── route.js        # GET single product
│   │   └── auth/
│   │       └── login/
│   │           └── route.js        # POST login endpoint
│   ├── layout.js                   # Root layout with Navbar/Footer
│   └── globals.css                 # Global styles
│
├── components/
│   ├── Navbar.jsx                  # Navigation bar
│   ├── Footer.jsx                  # Footer component
│   ├── ProductCard.jsx             # Product card component
│   ├── LoadingSpinner.jsx          # Reusable loading spinner
│   ├── SearchBar.jsx               # Search input component
│   └── CategoryFilter.jsx          # Category filter dropdown
│
├── lib/
│   ├── auth.js                     # Authentication utilities
│   └── utils.js                    # Helper functions
│
├── data/
│   └── products.json               # Product data storage
│
├── public/
│   └── assets/                     # Product images folder
│
├── middleware.js                   # Route protection middleware
├── package.json
└── README.md
```

## 🛣️ Route Summary

### Public Routes

- `/` - Landing page (home)
- `/products` - Product list page with search and filters
- `/products/[id]` - Product details page
- `/login` - Login page

### Protected Routes

- `/products/add` - Add new product (requires authentication)

### API Routes

- `GET /api/products` - Get all products
- `GET /api/products/[id]` - Get single product by ID
- `POST /api/products` - Add new product (protected)
- `POST /api/auth/login` - Login with credentials

## ✨ Implemented Features

### ✅ Core Requirements

1. ✅ Landing page with 7 sections + Navbar + Footer
2. ✅ Mock authentication with cookie storage
3. ✅ Public product list page
4. ✅ Public product details page
5. ✅ Protected "Add Product" page
6. ✅ Form validation and success notifications

### ✅ Additional Enhancements

1. ✅ Search functionality on product list
3. ✅ Category filtering
4. ✅ Loading spinner component (reusable)
5. ✅ React Hot Toast notifications
6. ✅ React Sweet Alert for error handling
7. ✅ Responsive design (mobile, tablet, desktop)
8. ✅ Smooth transitions and animations

## 🎨 Design Features

- **Clean and minimal UI**
- **Responsive design** (mobile-first approach)
- **Smooth transitions** and hover effects
- **Consistent color scheme** (blue/purple theme)
- **Loading states** for all async operations
- **Error handling** with user-friendly messages

## 🔧 Configuration

### Product Images

Product images are stored in the `/public/assets/` folder. When adding a new product, specify the image path as `/assets/filename.jpg`.

## 📝 API Endpoints

### GET /api/products

Returns all products from the JSON file.

**Response:**
```json
{
  "products": [
    {
      "id": "1",
      "name": "Product Name",
      "description": "Product description",
      "price": 29.99,
      "category": "electronics",
      "image": "/assets/product1.jpg"
    }
  ]
}
```

### GET /api/products/[id]

Returns a single product by ID.

**Response:**
```json
{
  "product": {
    "id": "1",
    "name": "Product Name",
    ...
  }
}
```

### POST /api/products

Adds a new product (requires authentication).

**Request Body:**
```json
{
  "name": "Product Name",
  "description": "Product description",
  "price": 29.99,
  "category": "electronics",
  "image": "/assets/product.jpg"
}
```

### POST /api/auth/login

Authenticates user and sets auth cookie.

**Request Body:**
```json
{
  "email": "admin@shophub.com",
  "password": "admin123"
}
```

## 🚢 Deployment

The application is ready for deployment on Vercel:

1. Push code to GitHub
2. Import project in Vercel
3. Deploy automatically

Or use other platforms like Netlify, Railway, etc.

## 📄 License

This project is open source and available for educational purposes.

## 👤 Author

Built as a demonstration of Next.js 15/16 capabilities with App Router.

---

**Note**: This is a demo application. For production use, consider implementing:
- Database instead of JSON file storage
- Proper authentication system (NextAuth.js with database)
- Image upload functionality
- User roles and permissions
- Shopping cart and checkout functionality
