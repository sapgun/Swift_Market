
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white mt-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 border-t">
            <div className="flex justify-between items-center text-sm text-text-secondary">
                <p>&copy; 2024 Swift Market. All Rights Reserved.</p>
                <div className="flex space-x-6">
                    <Link to="/terms" className="hover:text-primary">Terms of Service</Link>
                    <Link to="/privacy" className="hover:text-primary">Privacy Policy</Link>
                    <Link to="/contact" className="hover:text-primary">Contact Us</Link>
                </div>
            </div>
        </div>
    </footer>
  );
};

export default Footer;
