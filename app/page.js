import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';
import fs from 'fs';
import path from 'path';
import HeroSlider from '@/components/HeroSlider';
import ProductCard from '@/components/ProductCard';
import CTASection from '@/components/CTASection';
import LogoutToast from '@/components/LogoutToast';
import FAQ from '@/components/FAQ';
import Testimonials from '@/components/Testimonials';

export default async function Home() {
  // Read products directly from JSON file (server-side)
  let products = [];
  let popularProducts = [];
  
  try {
    const dataFilePath = path.join(process.cwd(), 'data', 'products.json');
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    const data = JSON.parse(fileContents);
    products = data?.products || [];
    popularProducts = products.slice(0, 8);
  } catch (error) {
    console.error('Error reading products:', error);
    // Fallback to empty array if file read fails
    products = [];
    popularProducts = [];
  }

  const features = [
    {
      title: 'Fast Delivery',
      description: 'Same-day delivery available in Dhaka city. Nationwide shipping in 2-3 business days.',
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Secure Payment',
      description: '100% secure transactions with SSL encryption. Multiple payment options available.',
      iconBg: 'bg-green-50',
      iconColor: 'text-green-600',
    },
    {
      title: 'Quality Assured',
      description: 'Premium products from verified sellers with quality guarantee and warranty.',
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-600',
    },
    {
      title: 'Best Prices',
      description: 'Competitive pricing with exclusive deals and seasonal discounts throughout the year.',
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600',
    },
  ];

  const categories = [
    { name: 'Electronics', slug: 'electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&q=80' },
    { name: 'Clothing', slug: 'clothing', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80' },
    { name: 'Books', slug: 'books', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80' },
    { name: 'Home & Living', slug: 'home', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80' },
    { name: 'Sports', slug: 'sports', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={null}>
        <LogoutToast />
      </Suspense>
      {/* Hero Section - Edge to Edge */}
      <section>
        <HeroSlider />
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#2563eb] text-white">
        <div className="w-full px-8 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl md:text-6xl font-bold mb-2">10K+</div>
              <div className="text-lg text-white/90">Happy Customers</div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-bold mb-2">5K+</div>
              <div className="text-lg text-white/90">Products Available</div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-bold mb-2">99%</div>
              <div className="text-lg text-white/90">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-bold mb-2">24/7</div>
              <div className="text-lg text-white/90">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="w-full px-8 md:px-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              <span className="text-gray-900">Why Choose</span> <span className="text-[#2563eb]">Shop</span><span className="text-[#2563eb]">Hub</span><span className="text-[#2563eb]">?</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your trusted online marketplace in Bangladesh
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:border-[#2563eb]/30 hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-14 h-14 ${feature.iconBg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <svg 
                    className={`w-7 h-7 ${feature.iconColor}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    {index === 0 && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    )}
                    {index === 1 && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    )}
                    {index === 2 && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    )}
                    {index === 3 && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    )}
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#2563eb] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-16 bg-gray-50">
        <div className="w-full px-8 md:px-10">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                <span className="text-gray-900">Trending</span> <span className="text-[#2563eb]">Products</span>
              </h2>
              <p className="text-lg text-gray-600">
                Best sellers this week
              </p>
            </div>
            <Link
              href="/products"
              className="hidden md:block px-6 py-3 bg-[#2563eb] text-white rounded-lg font-semibold hover:bg-[#1e40af] transition-colors"
            >
              View All Products →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {popularProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-8 md:hidden">
            <Link
              href="/products"
              className="inline-block px-6 py-3 bg-[#2563eb] text-white rounded-lg font-semibold hover:bg-[#1e40af] transition-colors"
            >
              View All Products →
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="w-full px-8 md:px-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              <span className="text-gray-900">Shop by</span> <span className="text-[#2563eb]">Category</span>
            </h2>
            <p className="text-lg text-gray-600">
              Browse our wide range of categories
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                href={`/products?category=${category.slug}`}
                className="group relative h-48 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <div className="font-bold text-lg">{category.name}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* FAQ Section */}
      <FAQ />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
