import React from 'react';

interface Metric {
  value: string;
  label: string;
}

interface MetricsProps {
  className?: string;
}

const metrics: Metric[] = [
  {
    value: '150+',
    label: 'Tổng đại lý',
  },
  {
    value: '2,500+',
    label: 'Đơn hàng/tháng',
  },
  {
    value: '500M+',
    label: 'Doanh thu',
  },
];

export const Metrics: React.FC<MetricsProps> = ({ className = '' }) => {
  return (
    <section className={`py-16 bg-white ${className}`}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg bg-gray-50 hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {metric.value}
              </div>
              <div className="text-gray-600">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Metrics; 