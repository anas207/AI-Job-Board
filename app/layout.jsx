import React from 'react';
import '../src/index.css';
import { AuthProvider } from '../src/context/AuthContext';
import Navbar from '../src/components/layout/Navbar';
import Footer from '../src/components/layout/Footer';

export const metadata = {
  title: 'AI Job Board',
  description: 'Find the Best AI Remote Jobs in Artificial Intelligence, Machine Learning, and Data Science.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="min-h-screen flex flex-col font-sans">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
