
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { auth, googleProvider } from '../lib/firebase';
import { signInWithPopup, signOut } from 'firebase/auth';

const Navbar: React.FC = () => {
  const { currentUser } = useAuth();

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-primary">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21h18" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 16.5V21m0-18v-1m-3.95-1.05l-.707.707m7.907-.707l.707.707" />
              </svg>
              <span>Swift Market</span>
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link to="/" className="text-text-secondary hover:text-primary transition-colors duration-300">Home</Link>
              <Link to="/products" className="text-text-secondary hover:text-primary transition-colors duration-300">Products</Link>
              <Link to="/about" className="text-text-secondary hover:text-primary transition-colors duration-300">About</Link>
              <Link to="/contact" className="text-text-secondary hover:text-primary transition-colors duration-300">Contact</Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <input type="text" placeholder="Search" className="bg-secondary rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary" />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {currentUser ? (
              <div className="flex items-center space-x-4">
                <Link to="/create" className="hidden md:block text-text-secondary hover:text-primary transition-colors duration-300">Create</Link>
                <button onClick={handleLogout} className="hidden md:block bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-hover transition-colors duration-300">Logout</button>
                <img src={currentUser.photoURL || 'https://via.placeholder.com/40'} alt="User" className="h-10 w-10 rounded-full" />
              </div>
            ) : (
              <button onClick={handleLogin} className="bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-hover transition-colors duration-300">Sign In</button>
            )}
            <div className="md:hidden">
                <button className="text-text-secondary hover:text-primary">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
                </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
