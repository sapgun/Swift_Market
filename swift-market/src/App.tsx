
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; 
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
          <Router>
            <div className="flex flex-col min-h-screen bg-background">
              <Navbar />
              <ToastViewport />
              <main className="flex-grow pb-16 pt-24">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/product/:id" element={<Product />} />
                  <Route path="/create" element={<CreateProduct />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </SearchProvider>
      </ToastProvider>
    </AuthProvider>
  );
};

export default App;
