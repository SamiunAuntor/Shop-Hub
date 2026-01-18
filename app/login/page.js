'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, EyeOff } from 'lucide-react';
import Swal from 'sweetalert2';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect first with param to show toast on products page
        window.location.href = '/products?fromLogin=true';
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setEmail('admin@shophub.com');
    setPassword('admin123');
    
    // Auto submit after a brief delay
    setTimeout(async () => {
      setLoading(true);
      setError('');
      
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: 'admin@shophub.com', password: 'admin123' }),
        });

        const data = await response.json();

        if (response.ok) {
          // Redirect first with param to show toast on products page
          window.location.href = '/products?fromLogin=true';
        } else {
          setError(data.error || 'Login failed');
        }
      } catch (err) {
        setError('An error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12">
      <div className="w-full px-8 md:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
            {/* Left Side - Image/Branding */}
            <div className="hidden lg:block relative bg-gradient-to-br from-[#2563eb]/60 to-[#1e40af]/60 p-12 flex flex-col justify-center">
              <div className="absolute inset-0">
                <Image
                  src="https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&q=80"
                  alt="Login"
                  fill
                  className="object-cover blur-[3px]"
                  unoptimized
                />
                <div className="absolute inset-0 bg-[#2563eb]/30"></div>
              </div>
              <div className="relative z-10 text-white">
                <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>
                <p className="text-lg text-white/90 mb-8">
                  Sign in to your ShopHub account and start shopping
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-white/90 font-medium">Secure & Fast Login</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-white/90 font-medium">Access All Features</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-white/90 font-medium">Shop with Confidence</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-white/90 font-medium">24/7 Customer Support</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-white/90 font-medium">Exclusive Deals & Offers</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-white/90 font-medium">Fast & Reliable Delivery</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="max-w-md mx-auto w-full">
                {/* Logo/Header */}
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
                  <p className="text-gray-600">
                    Enter your credentials to access your account
                  </p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                  {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded text-sm">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {error}
                      </div>
                    </div>
                  )}

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-[#2563eb] transition-all"
                      placeholder="admin@shophub.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 pr-12 border-2 border-gray-300 rounded-lg text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-[#2563eb] transition-all"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none transition-colors"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 bg-[#2563eb] text-white rounded-lg font-semibold text-base hover:bg-[#1e40af] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2563eb] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md hover:shadow-lg"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing in...
                      </span>
                    ) : (
                      'Sign In'
                    )}
                  </button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-gray-500 font-medium">Or</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleDemoLogin}
                    disabled={loading}
                    className="w-full py-3 px-4 border-2 border-[#2563eb] text-[#2563eb] bg-white rounded-lg font-semibold text-base hover:bg-gray-50 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Demo Login
                  </button>
                </form>

                <div className="mt-8 text-center">
                  <Link
                    href="/"
                    className="text-sm font-medium text-[#2563eb] hover:text-[#1e40af] transition-colors inline-flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
