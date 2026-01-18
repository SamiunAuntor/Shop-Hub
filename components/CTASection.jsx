'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CTASection() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      if (typeof document !== 'undefined') {
        const cookies = document.cookie.split(';');
        let isAuth = false;
        
        for (let cookie of cookies) {
          const [name, value] = cookie.trim().split('=');
          if (name === 'auth-token' && value === 'authenticated') {
            isAuth = true;
            break;
          }
        }
        
        setIsAuthenticated(isAuth);
      }
    };
    
    // Initial check
    checkAuth();
    
    // Check every 500ms for auth changes (especially after login)
    const interval = setInterval(checkAuth, 500);
    
    // Also check when window gains focus
    const handleFocus = () => checkAuth();
    window.addEventListener('focus', handleFocus);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="w-full px-8 md:px-10 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          <span className="text-gray-900">Ready to</span> <span className="text-[#2563eb]">Start Shopping</span><span className="text-[#2563eb]">?</span>
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
          {!isAuthenticated && (
            <Link
              href="/login"
              className="px-8 py-4 bg-white border-2 border-[#2563eb] text-[#2563eb] rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

