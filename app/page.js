import Link from 'next/link';
import Image from 'next/image';
import HeroSlider from '@/components/HeroSlider';
import ProductCard from '@/components/ProductCard';

export default async function Home() {
  // Fetch products for popular section
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/products`, { cache: 'no-store' });
  const data = await res.json();
  const products = data?.products || [];
  const popularProducts = products.slice(0, 8);

  const features = [
    {
      icon: '⚡',
      title: 'Fast Delivery',
      description: 'Same-day delivery available in Dhaka city. Nationwide shipping in 2-3 business days.',
      stat: '24/7',
    },
    {
      icon: '🔒',
      title: 'Secure Payment',
      description: '100% secure transactions with SSL encryption. Multiple payment options available.',
      stat: '100%',
    },
    {
      icon: '✨',
      title: 'Quality Assured',
      description: 'Premium products from verified sellers with quality guarantee and warranty.',
      stat: '10K+',
    },
    {
      icon: '🚀',
      title: 'Best Prices',
      description: 'Competitive pricing with exclusive deals and seasonal discounts throughout the year.',
      stat: 'BDT',
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
    <div className="min-h-screen bg-white">
      {/* Hero Section - Edge to Edge */}
      <section className="mb-16">
        <HeroSlider />
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="w-full px-8 md:px-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose ShopHub?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your trusted online marketplace in Bangladesh
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 text-center"
              >
                <div className="w-16 h-16 bg-[#2563eb] rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                  {feature.icon}
                </div>
                <div className="text-3xl font-bold text-[#2563eb] mb-2">{feature.stat}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-16 bg-white">
        <div className="w-full px-8 md:px-10">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                Trending Products
              </h2>
              <p className="text-lg text-gray-600">
                Best sellers this week
              </p>
            </div>
            <Link
              href="/products"
              className="hidden md:block px-6 py-3 bg-[#2563eb] text-white rounded-lg font-semibold hover:bg-[#1e40af] transition-colors"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
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

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="w-full px-8 md:px-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Shop by Category
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

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="w-full px-8 md:px-10 max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ready to Start Shopping?
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Join thousands of satisfied customers in Bangladesh!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="px-8 py-4 bg-[#2563eb] text-white rounded-lg font-semibold text-lg hover:bg-[#1e40af] transition-colors shadow-md"
            >
              Browse All Products →
            </Link>
            <Link
              href="/login"
              className="px-8 py-4 bg-white border-2 border-[#2563eb] text-[#2563eb] rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
