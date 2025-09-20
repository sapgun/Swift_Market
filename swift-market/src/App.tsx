import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Product from './pages/Product';
import CreateProduct from './pages/CreateProduct';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './context/AuthContext';
import { SearchProvider } from './context/SearchContext';
import { ToastProvider } from './context/ToastContext';
import ToastViewport from './components/ToastViewport';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ToastProvider>
        <SearchProvider>
          <div className="min-h-screen bg-slate-50">
            <Router>
              <Navbar />
              <ToastViewport />
              <main className="pb-16 pt-24">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/product/:id" element={<Product />} />
                  <Route path="/create" element={<CreateProduct />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
              </main>
            </Router>
          </div>
        </SearchProvider>
      </ToastProvider>
    </AuthProvider>
  );
};

export default App;
