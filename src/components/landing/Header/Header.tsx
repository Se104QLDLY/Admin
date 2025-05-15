import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  return (
    <header className={`w-full bg-white py-4 px-6 shadow-sm ${className}`}>
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo và tên hệ thống */}
        <Link to="/" className="flex items-center space-x-2">
          <img 
            src="/logo.png" 
            alt="Logo Hệ thống quản lý đại lý" 
            className="h-12 w-auto"
          />
          <span className="text-xl font-semibold text-gray-800">
            Hệ thống quản lý đại lý
          </span>
        </Link>

        {/* Nút đăng nhập/đăng ký */}
        <div className="flex items-center space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            Đăng nhập
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Đăng ký
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header; 