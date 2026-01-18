'use client';

import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';
import LoadingSpinner from '@/components/LoadingSpinner';
import Swal from 'sweetalert2';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchTerm, selectedCategory, products]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data.products || []);
      setFilteredProducts(data.products || []);

      // Extract unique categories
      const uniqueCategories = [
        ...new Set((data.products || []).map((p) => p.category)),
      ];
      setCategories(uniqueCategories);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load products. Please try again later.',
        confirmButtonColor: '#2563eb',
      });
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    setFilteredProducts(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="w-full px-8 md:px-10">
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            All Products
          </h1>
          <p className="text-lg text-gray-600">
            Browse through our collection of quality products
          </p>
        </div>

        {/* Filters - Compact Layout */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-start md:items-center">
          <div className="flex-1 w-full md:w-auto">
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
          </div>
          <div className="w-full md:w-64">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onChange={setSelectedCategory}
            />
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-gray-600 font-medium">
            Showing <span className="font-bold text-[#2563eb]">{filteredProducts.length}</span> of <span className="font-bold">{products.length}</span> products
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-xl text-gray-600 font-medium">
              No products found. Try adjusting your search or filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
