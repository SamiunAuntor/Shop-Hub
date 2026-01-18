'use client';

import Link from 'next/link';
import Image from 'next/image';
import { formatPrice, getCategoryColor } from '@/lib/utils';

export default function ProductCard({ product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 hover:-translate-y-1"
    >
      <div className="relative h-64 overflow-hidden bg-gray-100">
        <Image
          src={product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80'}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className={`absolute top-4 right-4 px-3 py-1.5 ${getCategoryColor(product.category)} text-white text-xs font-semibold rounded-full backdrop-blur-sm`}>
          {product.category}
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1 group-hover:text-[#2563eb] transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-[#2563eb]">
            {formatPrice(product.price)}
          </span>
        </div>
      </div>
    </Link>
  );
}
