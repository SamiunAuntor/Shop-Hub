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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    fetchProducts();
    
    // Check if user just logged in (check URL params or sessionStorage)
    const checkLoginRedirect = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const fromLogin = urlParams.get('fromLogin');
      
      if (fromLogin === 'true') {
        // Show success toast after redirect
        Swal.fire({
          icon: 'success',
          title: 'Successfully Logged In!',
          text: 'Welcome back to ShopHub',
          showConfirmButton: true,
          timer: 2000,
          timerProgressBar: true,
        });
        // Clean up URL
        window.history.replaceState({}, '', '/products');
      }
    };
    
    checkLoginRedirect();
  }, []);

  useEffect(() => {
    filterProducts();
    setCurrentPage(1); // Reset to first page when filters change
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

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Calculate display range for pagination text
  const startItem = filteredProducts.length > 0 ? startIndex + 1 : 0;
  const endItem = Math.min(endIndex, filteredProducts.length);
  const totalItems = filteredProducts.length;

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
            {totalItems > 0 ? (
              <>
                Showing <span className="font-bold text-[#2563eb]">{startItem}</span>
                {startItem !== endItem && (
                  <>
                    -<span className="font-bold text-[#2563eb]">{endItem}</span>
                  </>
                )}
                {' '}of <span className="font-bold">{totalItems}</span> products
              </>
            ) : (
              <>No products found</>
            )}
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
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    // Show first page, last page, current page, and pages around current
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-4 py-2 border rounded-lg font-medium transition-colors ${
                            currentPage === page
                              ? 'bg-[#2563eb] text-white border-[#2563eb]'
                              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    } else if (page === currentPage - 2 || page === currentPage + 2) {
                      return (
                        <span key={page} className="px-2 text-gray-500">
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
