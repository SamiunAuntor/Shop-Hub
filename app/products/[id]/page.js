'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import LoadingSpinner from '@/components/LoadingSpinner';
import { formatPrice, getCategoryColor } from '@/lib/utils';
import Swal from 'sweetalert2';

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchProduct(params.id);
    }
  }, [params.id]);

  const fetchProduct = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/products/${id}`);
      if (!response.ok) {
        if (response.status === 404) {
          Swal.fire({
            icon: 'error',
            title: 'Product Not Found',
            text: 'The product you are looking for does not exist.',
            confirmButtonColor: '#2563eb',
          }).then(() => {
            router.push('/products');
          });
          return;
        }
        throw new Error('Failed to fetch product');
      }
      const data = await response.json();
      setProduct(data.product);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load product details. Please try again later.',
        confirmButtonColor: '#2563eb',
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="w-full px-8 md:px-10">
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Product Image */}
            <div className="relative h-96 lg:h-[600px] bg-gray-100">
              <Image
                src={product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'}
                alt={product.name}
                fill
                className="object-cover"
                priority
                unoptimized
              />
            </div>

            {/* Product Details */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="mb-6">
                <span className={`inline-block px-3 py-1.5 text-sm font-semibold ${getCategoryColor(product.category)} text-white rounded-md backdrop-blur-md border border-white/20`}>
                  {product.category}
                </span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                {product.name}
              </h1>
              <div className="mb-8">
                <span className="text-4xl lg:text-5xl font-bold text-[#2563eb]">
                  {formatPrice(product.price)}
                </span>
              </div>
              <div className="mb-10">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Description
                </h2>
                <p className="text-base text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 px-6 py-2.5 bg-[#2563eb] text-white rounded-lg font-semibold text-sm hover:bg-[#1e40af] transition-colors shadow-md">
                    Add to Cart
                  </button>
                  <button className="flex-1 px-6 py-2.5 border-2 border-[#2563eb] text-[#2563eb] rounded-lg font-semibold text-sm hover:bg-gray-50 transition-colors">
                    Save for Later
                  </button>
                </div>
                <p className="text-xs text-gray-500 text-center italic">
                  These features are not implemented yet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
