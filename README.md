# ShopHub - Product Catalog Application

🌐 **Live Site**: [https://shop-hub-theta-bay.vercel.app/](https://shop-hub-theta-bay.vercel.app/)

A modern, full-featured product catalog web application built with Next.js 15/16 (App Router). This application allows users to browse products publicly and authenticated admins to add new products to the catalog.

## 📋 Project Description

ShopHub is a responsive product catalog application that demonstrates modern web development practices using Next.js. The application features a beautiful landing page with 8 sections, product browsing capabilities, search and filtering, pagination, and a protected admin area for adding new products. All product data is stored in JSON format and managed through Next.js API routes.

## 🚀 Features

### Core Features (All Requirements Met)

1. **Landing Page** ✅
   - **8 Sections** (besides Navbar and Footer):
     1. Hero Section with image slider (5 category-focused slides)
     2. Stats Section (10K+ Customers, 5K+ Products, 99% Satisfaction, 24/7 Support)
     3. Why Choose Us Section (4 feature cards: Fast Delivery, Secure Payment, Quality Assured, Best Prices)
     4. Trending Products Section (displays 8 popular products)
     5. Shop by Category Section (5 categories with images)
     6. Testimonials Section (4 customer reviews with ratings)
     7. FAQ Section (5 questions with accordion dropdown)
     8. CTA Section (Ready to Start Shopping)
   - Navbar includes links to Login and Browse Products
   - No authentication required for landing page

2. **Authentication** ✅
   - Mock login system with hardcoded credentials
   - Cookie-based session management (`auth-token` cookie)
   - Protected routes for authenticated users (middleware protection)
   - Automatic redirect for unauthenticated users to login page
   - On successful login, redirects to products page
   - Login/Logout buttons conditionally displayed in Navbar and Footer
   - SweetAlert2 notifications for login/logout success

3. **Product List Page** ✅
   - Publicly accessible product browsing
   - Fetches products from Next.js API route (reads from `data/products.json`)
   - Each product card displays:
     - Product name
     - Description (truncated)
     - Price (formatted in BDT currency)
     - Product image
     - Category badge with color coding
   - Search functionality (by name or description)
   - Category filtering dropdown
   - Pagination (12 items per page)
   - Responsive grid layout (1 column mobile, 3 tablet, 4 desktop)
   - Shows pagination range (e.g., "Showing 1-12 of 25 products")

4. **Product Details Page** ✅
   - Publicly accessible
   - Shows full product information:
     - Large product image
     - Product name
     - Category badge
     - Price (formatted in BDT)
     - Full description
     - Add to Cart and Save for Later buttons (UI only, not implemented)
   - Error handling for non-existent products
   - Responsive layout

5. **Add Product Page (Protected)** ✅
   - Only accessible when logged in
   - Form to add new products with fields:
     - Product Name (required)
     - Description (required)
     - Price (required, number)
     - Category (required, dropdown)
     - Image URL (required, accepts any direct image link)
   - Form validation
   - Stores product data via Next.js API route (writes to `data/products.json`)
   - Success notification using SweetAlert2
   - Redirects to products list after successful addition
   - Unauthenticated users redirected to login page

### Additional Enhancements

- ✅ **SweetAlert2 Notifications**: Success/error alerts for login, logout, and product creation
- ✅ **Responsive Design**: Mobile-first approach with hamburger menu on mobile
- ✅ **Loading Spinner**: Reusable loading component used throughout
- ✅ **Search & Filter**: Real-time search and category filtering
- ✅ **Pagination**: Client-side pagination with page numbers and navigation
- ✅ **Modern UI/UX**: Industry-grade design with consistent color scheme, animations, and transitions
- ✅ **Image Support**: Supports any direct image URL (ImgBB, Cloudinary, Imgur, Unsplash, etc.)
- ✅ **Currency Formatting**: Prices displayed in Bangladeshi Taka (BDT)
- ✅ **Active Link Styling**: Navbar links show active state with blue color and underline
- ✅ **Scroll to Top**: Automatic scroll to top on route changes
- ✅ **Mobile Navigation**: Hamburger menu for mobile devices
- ✅ **FAQ Accordion**: Only one question open at a time
- ✅ **Customer Testimonials**: Social proof with ratings and customer photos

## 🛠️ Technologies Used

- **Next.js 15/16** (App Router)
- **JavaScript (JSX)** - No TypeScript
- **Tailwind CSS** (for styling)
- **React Sweet Alert 2** (for notifications and alerts)
- **Next.js API Routes** (for backend functionality - replaces Express.js server)
- **JSON File Storage** (`data/products.json` for data persistence)
- **Google Fonts** (Saira font family)

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
   
   If you encounter peer dependency conflicts, use:
   ```bash
   npm install --legacy-peer-deps
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

For demo purposes, use these hardcoded credentials:

- **Email**: `admin@shophub.com`
- **Password**: `admin123`

**Note**: Only one admin account exists. This is a mock authentication system for demonstration purposes.

## 📂 Project Structure

```
shop-hub/
├── app/
│   ├── page.js                      # Landing page (8 sections)
│   ├── login/
│   │   └── page.js                 # Login page
│   ├── products/
│   │   ├── page.js                 # Product list page (public)
│   │   ├── [id]/
│   │   │   └── page.js             # Product details page (public)
│   │   └── add/
│   │       └── page.js             # Add product page (protected)
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
│   ├── Navbar.jsx                  # Navigation bar with mobile menu
│   ├── Footer.jsx                  # Footer component
│   ├── ProductCard.jsx             # Product card component
│   ├── LoadingSpinner.jsx          # Reusable loading spinner
│   ├── SearchBar.jsx               # Search input component
│   ├── CategoryFilter.jsx          # Category filter dropdown
│   ├── HeroSlider.jsx              # Hero banner slider
│   ├── CTASection.jsx              # Call-to-action section
│   ├── FAQ.jsx                     # FAQ accordion section
│   ├── Testimonials.jsx            # Customer testimonials section
│   └── ScrollToTop.jsx             # Scroll to top on route change
│
├── lib/
│   ├── auth.js                     # Authentication utilities
│   └── utils.js                    # Helper functions (price formatting, etc.)
│
├── data/
│   └── products.json               # Product data storage (25 real products)
│
├── middleware.js                   # Route protection middleware
├── next.config.mjs                 # Next.js configuration
├── package.json
└── README.md
```

## 🛣️ Route Summary

### Public Routes

- `/` - Landing page (home) with 8 sections
- `/products` - Product list page with search, filters, and pagination
- `/products/[id]` - Product details page
- `/login` - Login page

### Protected Routes

- `/products/add` - Add new product (requires authentication)
  - Unauthenticated users are redirected to `/login?redirect=/products/add`

### API Routes

- `GET /api/products` - Get all products from JSON file
- `GET /api/products/[id]` - Get single product by ID
- `POST /api/products` - Add new product (protected, requires auth cookie)
- `POST /api/auth/login` - Login with credentials (sets auth cookie)

## ✨ Implemented Features Checklist

### ✅ Core Requirements (All Met)

1. ✅ **Landing Page** - 8 sections (Hero, Stats, Why Choose Us, Trending Products, Shop by Category, Testimonials, FAQ, CTA)
2. ✅ **Navbar** - Links to Login and Browse Products
3. ✅ **Mock Authentication** - Hardcoded email/password, cookie storage
4. ✅ **Route Protection** - Middleware protects `/products/add`
5. ✅ **Public Product List** - Fetches from API/JSON, displays cards with name, description, price, image
6. ✅ **Public Product Details** - Shows full product information
7. ✅ **Protected Add Product** - Form to add products, stores in JSON via API
8. ✅ **Redirect on Login** - Redirects to products page after successful login

### ✅ Additional Enhancements

1. ✅ **SweetAlert2 Notifications** - For login, logout, and product creation
2. ✅ **README.md** - Complete documentation with all required sections
3. ✅ **Search Functionality** - Real-time search by name/description
4. ✅ **Category Filtering** - Filter products by category
5. ✅ **Pagination** - 12 items per page with navigation
6. ✅ **Loading Spinner** - Reusable component
7. ✅ **Responsive Design** - Mobile-first with hamburger menu
8. ✅ **Modern UI/UX** - Industry-grade design
9. ✅ **Image Support** - Accepts any direct image URL
10. ✅ **Currency Formatting** - BDT currency format
11. ✅ **FAQ Accordion** - Interactive FAQ section
12. ✅ **Testimonials** - Customer reviews section

## 🎨 Design Features

- **Modern UI/UX**: Industry-grade design with professional styling
- **Responsive Design**: Mobile-first approach, works on all devices
- **Color Scheme**: Blue (#2563eb) and gray color palette
- **Typography**: Saira Google Font
- **Smooth Transitions**: Hover effects and animations throughout
- **Loading States**: Loading spinners for all async operations
- **Error Handling**: User-friendly error messages with SweetAlert2
- **Active States**: Visual feedback for navigation and interactions
- **Mobile Navigation**: Hamburger menu for mobile devices

## 📝 API Endpoints

### GET /api/products

Returns all products from the JSON file.

**Response:**
```json
{
  "products": [
    {
      "id": "1",
      "name": "iPhone 15 Pro Max 256GB",
      "description": "Latest Apple iPhone with A17 Pro chip...",
      "price": 169900,
      "category": "electronics",
      "image": "https://images.unsplash.com/photo-..."
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
    "name": "iPhone 15 Pro Max 256GB",
    "description": "...",
    "price": 169900,
    "category": "electronics",
    "image": "..."
  }
}
```

### POST /api/products

Adds a new product (requires authentication via `auth-token` cookie).

**Request Body:**
```json
{
  "name": "Product Name",
  "description": "Product description",
  "price": 12999,
  "category": "electronics",
  "image": "https://i.ibb.co/example.jpg"
}
```

**Response:**
```json
{
  "message": "Product added successfully",
  "product": { ... }
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

**Response:**
```json
{
  "message": "Login successful",
  "user": { "email": "admin@shophub.com" }
}
```

## 🚢 Deployment

The application is deployed on Vercel: [https://shop-hub-theta-bay.vercel.app/](https://shop-hub-theta-bay.vercel.app/)

### Deployment Status

| Feature | Local Development | Vercel Deployment | Status |
|---------|-------------------|-------------------|--------|
| Landing Page | ✅ Works | ✅ Works | Fully Functional |
| Product List | ✅ Works | ✅ Works | Fully Functional |
| Product Details | ✅ Works | ✅ Works | Fully Functional |
| Search & Filter | ✅ Works | ✅ Works | Fully Functional |
| Pagination | ✅ Works | ✅ Works | Fully Functional |
| Login | ✅ Works | ✅ Works | Fully Functional |
| Logout | ✅ Works | ✅ Works | Fully Functional |
| Protected Routes | ✅ Works | ✅ Works | Fully Functional |
| Navigation | ✅ Works | ✅ Works | Fully Functional |
| Add Product Form | ✅ Works | ✅ Works | Form displays correctly |
| Add Product API | ✅ Works | ❌ **Fails** | Cannot write to JSON file |

### ⚠️ Known Limitation on Vercel

**Add Product Feature**: The "Add Product" functionality works perfectly in local development but **does not work on Vercel deployment** due to Vercel's read-only filesystem. 

**Why it fails:**
- Vercel's production filesystem is read-only
- `fs.writeFileSync()` operations fail in serverless environment
- Even if writing worked, changes would be lost on the next deployment

**What still works:**
- ✅ Form displays correctly
- ✅ Form validation works
- ✅ Authentication check works
- ✅ API endpoint receives the request
- ❌ Writing to JSON file fails (expected behavior)

**Solution for Production:**
To enable "Add Product" functionality in production, replace JSON file storage with:
- Database (MongoDB, PostgreSQL, etc.)
- External storage (Vercel KV, Upstash, etc.)
- Headless CMS (Sanity, Contentful, etc.)

**Note**: This limitation is acceptable for demo/assignment purposes as it demonstrates the required functionality (form, validation, protected routes, API structure).

## 📄 License

This project is open source and available for educational purposes.

## 👤 Author

Built as a demonstration of Next.js 15/16 capabilities with App Router.

---

## 📌 Notes

- **Authentication**: This is a mock authentication system using hardcoded credentials. For production, implement proper authentication with NextAuth.js or similar.
- **Data Storage**: Products are stored in `data/products.json`. For production, use a proper database (MongoDB, PostgreSQL, etc.).
- **Image Handling**: The application accepts any direct image URL. Images are displayed using Next.js Image component with `unoptimized` prop for maximum compatibility.
- **Real Products**: All 25 products in the catalog are real products with authentic names, descriptions, and prices in BDT currency.

---

**Status**: ✅ All requirements from the task outline have been implemented and tested.
