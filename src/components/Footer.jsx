import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-sm">&copy; 2023 My Blog. All rights reserved.</p>
        <div className="mt-2">
          <a href="/privacy-policy" className="text-gray-400 hover:text-gray-300 transition duration-200 mx-2">Privacy Policy</a>
          <a href="/terms-of-service" className="text-gray-400 hover:text-gray-300 transition duration-200 mx-2">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;