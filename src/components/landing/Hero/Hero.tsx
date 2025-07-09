import React from 'react';
import { Link } from 'react-router-dom';
import { navigateToLogin, navigateToRegister } from '../../../utils/navigation';

interface HeroProps {
  className?: string;
}

export const Hero: React.FC<HeroProps> = ({ className = '' }) => {
  return (
    <section className={`py-20 bg-gradient-to-br from-blue-50 via-white to-blue-100 ${className}`}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Content bên trái */}
          <div className="lg:w-1/2 lg:pr-12">
            <h1 className="text-5xl lg:text-6xl font-extrabold text-blue-800 mb-6 drop-shadow-lg">
              Giải pháp quản lý đại lý toàn diện
            </h1>
            <p className="text-xl text-blue-700 mb-8 font-medium">
              Hệ thống giúp tối ưu hóa quy trình quản lý, tăng hiệu quả vận hành và thúc đẩy tăng trưởng doanh thu cho chuỗi đại lý của bạn.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={navigateToLogin}
                className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all text-center font-semibold text-lg border-2 border-transparent hover:border-blue-700"
              >
                Đăng nhập hệ thống
              </button>
              <button
                onClick={navigateToRegister}
                className="inline-block px-8 py-3 border-2 border-blue-600 text-blue-700 rounded-xl hover:bg-blue-50 transition-all text-center font-semibold text-lg"
              >
                Dùng thử miễn phí
              </button>
              <Link
                to="/about"
                className="inline-block px-8 py-3 border-2 border-blue-400 text-blue-600 rounded-xl hover:bg-blue-50 transition-all text-center font-semibold text-lg"
              >
                Tìm hiểu thêm
              </Link>
            </div>
          </div>

          {/* Hình ảnh bên phải */}
          <div className="lg:w-1/2 mt-12 lg:mt-0 flex justify-center">
            <img
              src="/daden.png"
              alt="Quản lý đại lý"
              className="w-full max-w-md rounded-3xl shadow-2xl border-4 border-blue-100 hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;