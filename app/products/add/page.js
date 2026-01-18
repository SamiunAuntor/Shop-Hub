'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Swal from 'sweetalert2';
import LoadingSpinner from '@/components/LoadingSpinner';

const categories = ['electronics', 'clothing', 'books', 'home', 'sports', 'other'];

export default function AddProductPage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if authenticated on client side
    const checkAuth = () => {
      const authToken = document.cookie
        .split(';')
        .find((c) => c.trim().startsWith('auth-token='));
      
      if (!authToken || !authToken.includes('authenticated')) {
        router.push('/login?redirect=/products/add');
      }
    };
    
    checkAuth();
    setLoading(false);
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Validation
    if (!formData.name || !formData.description || !formData.price || !formData.category || !formData.image) {
      await Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill in all fields',
        confirmButtonColor: '#2563eb',
      });
      setSubmitting(false);
      return;
    }

    if (isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
      await Swal.fire({
        icon: 'error',
        title: 'Invalid Price',
        text: 'Please enter a valid price',
        confirmButtonColor: '#2563eb',
      });
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        await Swal.fire({
          icon: 'success',
          title: 'Product Added Successfully!',
          text: 'Your product has been added to the catalog',
          showConfirmButton: true,
          timer: 2000,
          timerProgressBar: true,
        });
        // Reset form
        setFormData({
          name: '',
          description: '',
          price: '',
          category: '',
          image: '',
        });
        // Redirect to products page
        router.push('/products');
      } else {
        await Swal.fire({
          icon: 'error',
          title: 'Failed to Add Product',
          text: data.error || 'Failed to add product',
          confirmButtonColor: '#2563eb',
        });
      }
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred. Please try again.',
        confirmButtonColor: '#2563eb',
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="w-full px-8 md:px-10">
        {/* Header Section */}
        <div className="mb-10">
          <Link
            href="/products"
            className="inline-flex items-center text-[#2563eb] hover:text-[#1e40af] font-medium mb-6 transition-colors group"
          >
            <svg
              className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Products
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Add New Product
          </h1>
          <p className="text-lg text-gray-600">
            Fill in the form below to add a new product to the catalog
          </p>
        </div>

        {/* Form Section - Full Width */}
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6">
            {/* Product Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-[#2563eb] transition-all"
                placeholder="Enter product name"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-[#2563eb] transition-all resize-none"
                placeholder="Enter product description"
              />
            </div>

            {/* Price and Category - Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Price */}
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Price <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-[#2563eb] transition-all"
                  placeholder="0.00"
                />
              </div>

              {/* Category */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-[#2563eb] transition-all appearance-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.75rem center',
                    backgroundSize: '1.25em 1.25em',
                    paddingRight: '2.5rem',
                  }}
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Image */}
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Image Path <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-[#2563eb] transition-all"
                placeholder="https://images.unsplash.com/photo-..."
              />
              <p className="mt-2 text-sm text-gray-500">
                Enter the image URL (e.g., https://images.unsplash.com/photo-... or /assets/product.jpg)
              </p>
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 px-6 py-3 bg-[#2563eb] text-white rounded-lg font-semibold hover:bg-[#1e40af] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
              >
                {submitting ? 'Adding Product...' : 'Add Product'}
              </button>
              <Link
                href="/products"
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-center"
              >
                Cancel
              </Link>
            </div>

            {/* Back to Products Link at Bottom */}
            <div className="pt-6 border-t border-gray-200">
              <Link
                href="/products"
                className="inline-flex items-center text-[#2563eb] hover:text-[#1e40af] font-medium transition-colors group"
              >
                <svg
                  className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to Products
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
