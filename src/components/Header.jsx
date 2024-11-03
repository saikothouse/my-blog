import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white">
      <nav className="max-w-6xl mx-auto p-4 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link to="/">My Blog</Link>
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-gray-300 transition duration-200">Home</Link>
          </li>
          <li>
            <Link to="/blog" className="hover:text-gray-300 transition duration-200">Blog</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;