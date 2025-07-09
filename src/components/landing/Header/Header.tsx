import React from 'react';
import { Link } from 'react-router-dom';
import { navigateToLogin, navigateToRegister } from '../../../utils/navigation';

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  return (
    <header className={`w-full bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 py-4 px-6 shadow-md ${className}`}>
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo và tên hệ thống */}
        <Link to="/" className="flex items-center space-x-3">
          <img 
            src="/logo.png" 
            alt="Logo Hệ thống quản lý đại lý" 
            className="h-14 w-auto drop-shadow-xl"
          />
          <span className="text-2xl font-extrabold text-white tracking-wide drop-shadow-lg">
            Hệ thống quản lý đại lý
          </span>
        </Link>

        {/* Nút đăng nhập/đăng ký */}
        <div className="flex items-center space-x-4">
          <button
            onClick={navigateToLogin}
            className="px-4 py-2 text-white font-semibold hover:text-cyan-200 transition-colors rounded-lg hover:bg-blue-800/40"
          >
            Đăng nhập
          </button>
          <button
            onClick={navigateToRegister}
            className="px-4 py-2 bg-white text-blue-700 font-bold rounded-lg shadow hover:bg-cyan-100 hover:text-blue-900 transition-colors border-2 border-white hover:border-cyan-400"
          >
            Đăng ký
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;