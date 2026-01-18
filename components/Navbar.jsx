'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { logout } from '@/lib/auth';
import { useRouter, usePathname } from 'next/navigation';
import Swal from 'sweetalert2';

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

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
    
    // Also check when window gains focus (in case of tab switches)
    const handleFocus = () => checkAuth();
    window.addEventListener('focus', handleFocus);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const handleLogout = () => {
    // Logout first, then redirect and show toast on homepage
    logout();
    setIsAuthenticated(false);
    router.push('/?loggedOut=true');
    window.scrollTo(0, 0);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="w-full px-8 md:px-10">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <span className="text-2xl font-bold text-gray-900">
              ShopHub
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`font-medium transition-colors relative ${
                pathname === '/'
                  ? 'text-[#2563eb] font-semibold'
                  : 'text-gray-700 hover:text-[#2563eb]'
              }`}
            >
              Home
              {pathname === '/' && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#2563eb]"></span>
              )}
            </Link>
            <Link
              href="/products"
              className={`font-medium transition-colors relative ${
                pathname?.startsWith('/products') && pathname !== '/products/add'
                  ? 'text-[#2563eb] font-semibold'
                  : 'text-gray-700 hover:text-[#2563eb]'
              }`}
            >
              Browse Products
              {pathname?.startsWith('/products') && pathname !== '/products/add' && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#2563eb]"></span>
              )}
            </Link>
            {isAuthenticated && (
              <Link
                href="/products/add"
                className={`font-medium transition-colors relative ${
                  pathname === '/products/add'
                    ? 'text-[#2563eb] font-semibold'
                    : 'text-gray-700 hover:text-[#2563eb]'
                }`}
              >
                Add Product
                {pathname === '/products/add' && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#2563eb]"></span>
                )}
              </Link>
            )}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="px-6 py-2.5 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors text-sm"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="px-6 py-2.5 bg-[#2563eb] text-white rounded-lg font-semibold hover:bg-[#1e40af] transition-colors text-sm"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 bg-[#2563eb] text-white rounded-lg text-sm font-semibold hover:bg-[#1e40af] transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
