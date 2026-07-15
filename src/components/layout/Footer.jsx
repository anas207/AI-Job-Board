import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start mb-6 md:mb-0">
            <Link to="/" className="text-xl font-serif font-bold text-gray-900 tracking-tight">
              AI JOB BOARD
            </Link>
          </div>
          <div className="flex justify-center space-x-6 md:order-2">
            <Link to="#" className="text-gray-500 hover:text-gray-900">
              Privacy Policy
            </Link>
            <Link to="#" className="text-gray-500 hover:text-gray-900">
              Terms of Service
            </Link>
            <Link to="#" className="text-gray-500 hover:text-gray-900">
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
