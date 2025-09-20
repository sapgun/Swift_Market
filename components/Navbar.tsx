
'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useSearch } from '../context/SearchContext';
import { auth, googleProvider } from '../lib/firebase';
import { signInWithPopup, signOut } from 'firebase/auth';

const Navbar: React.FC = () => {
  const { user } = useAuth(); // Changed currentUser to user
  const { query, setQuery } = useSearch();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition duration-300 ${
        isScrolled ? 'border-gray-200 bg-white/90 shadow-lg backdrop-blur' : 'border-transparent bg-white/60 backdrop-blur'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center space-x-2 text-2xl font-bold text-primary">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21h18" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 16.5V21m0-18v-1m-3.95-1.05l-.707.707m7.907-.707l.707.707" />
              </svg>
              <span>Swift Market</span>
            </Link>
          <nav className="hidden items-center gap-4 text-sm font-medium text-text-secondary lg:flex">
            <Link href="/" className="transition hover:text-primary">
              Marketplace
            </Link>
            <Link href="/dashboard" className="transition hover:text-primary">
              Dashboard
            </Link>
            <Link href="/about" className="transition hover:text-primary">About</Link>
            <Link href="/contact" className="transition hover:text-primary">Contact</Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end gap-4">
          <div className="relative hidden w-full max-w-md flex-1 items-center lg:flex">
            <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search assets, sellers, or XRPL offers"
              className="w-full rounded-full border border-gray-200 bg-white/70 px-12 py-2.5 text-sm text-gray-700 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/create"
              className="hidden rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 sm:inline-flex"
            >
              Create Product
            </Link>
            {user ? ( // Changed currentUser to user
              <div className="flex items-center gap-3">
                <button
                  onClick={handleLogout}
                  className="rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:border-gray-300 hover:text-gray-900"
                >
                  Sign out
                </button>
                <Link href="/dashboard" className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-inner">
                  {user.photoURL ? ( // Changed currentUser to user
                    <img src={user.photoURL} alt={user.displayName ?? 'Account'} className="h-8 w-8 rounded-full object-cover" />
                  ) : (
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                      {user.email?.[0]?.toUpperCase() ?? 'U'}
                    </span>
                  )}
                  <span className="hidden sm:inline">{user.displayName ?? 'Account'}</span>
                </Link>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="rounded-full border border-gray-200 px-5 py-2 text-sm font-semibold text-gray-700 transition hover:border-primary hover:text-primary"
              >
                Sign in with Google
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="mx-auto block w-full max-w-7xl px-6 pb-4 lg:hidden">
        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search assets, sellers, or XRPL offers"
            className="w-full rounded-full border border-gray-200 bg-white/80 px-12 py-2.5 text-sm text-gray-700 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
