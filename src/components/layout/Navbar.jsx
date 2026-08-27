"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <header className="bg-orange-80 border-b border-gray-300 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 relative">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-serif font-bold text-gray-900 tracking-tight">
              AI JOB BOARD
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-8 absolute left-1/2 -translate-x-1/2">
            <Link href="/" className="text-gray-600 hover:text-orange-500 font-medium transition-colors">
              Browse Jobs
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-orange-500 font-medium transition-colors">
              About Us
            </Link>
          </nav>

          {/* Auth & CTA */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link href="/employer/dashboard" className="text-gray-600 hover:text-gray-900 font-medium">
                  Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="h-5 w-5" />
                </button>
                <Link href="/employer/post-job" className="px-6 py-3  text-white font-medium rounded-lg transition-all bg-orange-500">
                  Post A Job
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-600 hover:text-gray-900 font-medium">
                  Login
                </Link>
                <Link href="/login" className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-all">
                  Post A Job
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
