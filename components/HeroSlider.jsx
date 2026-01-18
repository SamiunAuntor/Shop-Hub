'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const slides = [
  {
    id: 1,
    title: 'Electronics & Gadgets',
    subtitle: 'Discover the Latest Technology',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1920&q=80',
    ctaLink: '/products',
  },
  {
    id: 2,
    title: 'Fashion & Clothing',
    subtitle: 'Stay Stylish with Trendy Outfits',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1920&q=80',
    ctaLink: '/products',
  },
  {
    id: 3,
    title: 'Books & Education',
    subtitle: 'Expand Your Knowledge Library',
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=1920&q=80',
    ctaLink: '/products',
  },
  {
    id: 4,
    title: 'Home & Living',
    subtitle: 'Elevate Your Living Space',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920&q=80',
    ctaLink: '/products',
  },
  {
    id: 5,
    title: 'Sports & Fitness',
    subtitle: 'Achieve Your Fitness Goals',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920&q=80',
    ctaLink: '/products',
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <div className="relative w-full h-full">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>
            
            {/* Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="w-full px-8 md:px-10">
                <div className="max-w-2xl">
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8">
                    {slide.subtitle}
                  </p>
                  <Link
                    href={slide.ctaLink}
                    className="inline-block px-8 py-4 bg-[#2563eb] text-white rounded-lg font-semibold text-lg hover:bg-[#1e40af] transition-colors shadow-lg"
                  >
                    Shop Now →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide
                ? 'w-8 bg-white'
                : 'w-2 bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
