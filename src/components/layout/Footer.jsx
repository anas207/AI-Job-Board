"use client";

import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start mb-6 md:mb-0">
            <Link href="/" className="text-xl font-serif font-bold text-white tracking-tight">
              AI JOB BOARD
            </Link>
          </div>
          <div className="flex justify-center space-x-6 md:order-2">
            <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
              About Us
            </Link>
            <Link href="#" className="text-gray-300 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-300 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-gray-300 hover:text-white transition-colors">
              Contact Us
            </Link>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} AI Job Board. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
