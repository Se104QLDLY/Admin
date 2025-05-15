import React from 'react';
import { Link } from 'react-router-dom';

interface HeroProps {
  className?: string;
}

export const Hero: React.FC<HeroProps> = ({ className = '' }) => {
  return (
    <section className={`py-20 bg-gray-50 ${className}`}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Content bên trái */}
          <div className="lg:w-1/2 lg:pr-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Giải pháp quản lý đại lý toàn diện
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Hệ thống giúp tối ưu hóa quy trình quản lý, tăng hiệu quả vận hành và thúc 
              đẩy tăng trưởng doanh thu cho chuỗi đại lý của bạn.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/register"
                className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg 
                         hover:bg-blue-700 transition-colors text-center"
              >
                Dùng thử miễn phí
              </Link>
              <Link
                to="/about"
                className="inline-block px-8 py-3 border border-blue-600 text-blue-600 
                         rounded-lg hover:bg-blue-50 transition-colors text-center"
              >
                Tìm hiểu thêm
              </Link>
            </div>
          </div>

          {/* Hình ảnh bên phải */}
          <div className="lg:w-1/2 mt-12 lg:mt-0">
            <img
              src="/daden.png"
              alt="Quản lý đại lý"
              className="rounded-lg shadow-xl w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 