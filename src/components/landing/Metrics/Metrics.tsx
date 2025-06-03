import React from 'react';

interface Metric {
  value: string;
  label: string;
  icon: React.ReactNode;
}

interface MetricsProps {
  className?: string;
}

const metrics: Metric[] = [
  {
    value: '150+',
    label: 'Tổng đại lý',
    icon: (
      <svg
        className="h-10 w-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M12 4v16m8-8H4" />
      </svg>
    ),
  },
  {
    value: '2,500+',
    label: 'Đơn hàng/tháng',
    icon: (
      <svg
        className="h-10 w-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M3 12h18M3 6h18M3 18h18" />
      </svg>
    ),
  },
  {
    value: '500M+',
    label: 'Doanh thu',
    icon: (
      <svg
        className="h-10 w-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 0V4m0 16v-4" />
      </svg>
    ),
  },
];

export const Metrics: React.FC<MetricsProps> = ({ className = '' }) => {
  return (
    <section className={`py-16 bg-white ${className}`}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {metrics.map((metric, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-blue-100 via-white to-cyan-100 border-2 border-blue-100 rounded-2xl shadow-xl p-8 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-all"
            >
              <div className="mb-4 text-4xl text-blue-600 drop-shadow-lg">
                {metric.icon}
              </div>
              <div className="text-3xl font-extrabold text-blue-800 mb-2">
                {metric.value}
              </div>
              <div className="text-lg font-semibold text-blue-700">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Metrics;