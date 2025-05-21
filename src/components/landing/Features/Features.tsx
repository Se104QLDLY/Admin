import React from 'react';
import { FaUserFriends, FaChartLine, FaWarehouse } from 'react-icons/fa';

interface Feature {
  icon: React.FC<{ className?: string }>;
  title: string;
  description: string;
}

interface FeaturesProps {
  className?: string;
}

const features: Feature[] = [
  {
    icon: FaUserFriends,
    title: 'Quản lý đại lý',
    description: 'Theo dõi thông tin và hoạt động của các đại lý trong hệ thống'
  },
  {
    icon: FaChartLine,
    title: 'Báo cáo doanh số',
    description: 'Thống kê chi tiết doanh số theo từng đại lý và khu vực'
  },
  {
    icon: FaWarehouse,
    title: 'Quản lý kho hàng',
    description: 'Kiểm soát xuất nhập kho và tồn kho theo thời gian thực'
  }
];

export const Features: React.FC<FeaturesProps> = ({ className = '' }) => {
  return (
    <section className={`py-16 bg-gradient-to-b from-blue-50 to-white ${className}`}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-8 bg-white bg-gradient-to-br from-cyan-50 to-blue-100 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all border-2 border-blue-100"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">
                  <feature.icon className="w-12 h-12 text-blue-600 drop-shadow-lg" />
                </div>
                <h3 className="text-2xl font-bold text-blue-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-blue-700 font-medium">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;