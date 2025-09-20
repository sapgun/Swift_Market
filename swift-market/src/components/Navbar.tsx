
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSearch } from '../context/SearchContext';
import { auth, googleProvider } from '../lib/firebase';
import { signInWithPopup, signOut } from 'firebase/auth';

const Navbar: React.FC = () => {
  const { currentUser } = useAuth();
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
        isScrolled ? 'border-slate-200 bg-white/90 shadow-lg backdrop-blur' : 'border-transparent bg-white/60 backdrop-blur'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 text-lg font-semibold text-slate-900">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-swift-blue/10 text-swift-blue">
              SM
            </span>
            Swift Market
          </Link>
          <nav className="hidden items-center gap-4 text-sm font-medium text-slate-500 lg:flex">
            <Link to="/" className="transition hover:text-slate-900">
              Marketplace
            </Link>
            <Link to="/dashboard" className="transition hover:text-slate-900">
              Dashboard
            </Link>
            <a href="https://xrpl.org" target="_blank" rel="noreferrer" className="transition hover:text-slate-900">
              XRPL
            </a>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end gap-4">
          <div className="relative hidden w-full max-w-md flex-1 items-center lg:flex">
            <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
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
              className="w-full rounded-full border border-slate-200 bg-white/70 px-12 py-2.5 text-sm text-slate-700 shadow-sm outline-none transition focus:border-swift-blue focus:ring-2 focus:ring-swift-blue/20"
            />
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/create"
              className="hidden rounded-full bg-swift-blue px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-swift-blue/40 sm:inline-flex"
            >
              List an Item
            </Link>
            {currentUser ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={handleLogout}
                  className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
                >
                  Sign out
                </button>
                <Link to="/dashboard" className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-inner">
                  {currentUser.photoURL ? (
                    <img src={currentUser.photoURL} alt={currentUser.displayName ?? 'Account'} className="h-8 w-8 rounded-full object-cover" />
                  ) : (
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-swift-blue/10 text-sm font-semibold text-swift-blue">
                      {currentUser.email?.[0]?.toUpperCase() ?? 'U'}
                    </span>
                  )}
                  <span className="hidden sm:inline">{currentUser.displayName ?? 'Account'}</span>
                </Link>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:border-swift-blue hover:text-swift-blue"
              >
                Sign in with Google
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="mx-auto block w-full max-w-7xl px-6 pb-4 lg:hidden">
        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
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
            className="w-full rounded-full border border-slate-200 bg-white/80 px-12 py-2.5 text-sm text-slate-700 shadow-sm outline-none transition focus:border-swift-blue focus:ring-2 focus:ring-swift-blue/20"
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
