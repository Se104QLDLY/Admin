import React from 'react';
import { FaUserFriends, FaChartLine, FaWarehouse } from 'react-icons/fa';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface FeaturesProps {
  className?: string;
}

const features: Feature[] = [
  {
    icon: <FaUserFriends className="w-8 h-8 text-blue-600" />,
    title: 'Quản lý đại lý',
    description: 'Theo dõi thông tin và hoạt động của các đại lý trong hệ thống'
  },
  {
    icon: <FaChartLine className="w-8 h-8 text-blue-600" />,
    title: 'Báo cáo doanh số',
    description: 'Thống kê chi tiết doanh số theo từng đại lý và khu vực'
  },
  {
    icon: <FaWarehouse className="w-8 h-8 text-blue-600" />,
    title: 'Quản lý kho hàng',
    description: 'Kiểm soát xuất nhập kho và tồn kho theo thời gian thực'
  }
];

export const Features: React.FC<FeaturesProps> = ({ className = '' }) => {
  return (
    <section className={`py-16 bg-gray-50 ${className}`}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
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