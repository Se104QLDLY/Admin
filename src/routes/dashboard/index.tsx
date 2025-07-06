import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { getMonthlySales, getDebtReport, getAgenciesCount } from '../../api/dashboard.api';
import type { MonthlySalesItem, DebtReportItem } from '../../api/dashboard.api';

const DashboardPage: React.FC = () => {
  // Dashboard data state
  const [monthlySales, setMonthlySales] = useState<MonthlySalesItem[]>([]);
  const [totalAgencies, setTotalAgencies] = useState<number>(0);
  const [totalDebt, setTotalDebt] = useState<number>(0);
  const [debtOverdue, setDebtOverdue] = useState<number>(0);
  const [topDebtAgencies, setTopDebtAgencies] = useState<DebtReportItem[]>([]);

  // Calculate max value for chart scaling
  const maxSalesValue = monthlySales.length
    ? Math.max(...monthlySales.map(item => item.amount))
    : 0;

  // Fetch dashboard data on mount
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [agenciesCount, salesData, debtData] = await Promise.all([
          getAgenciesCount(),
          getMonthlySales(),
          getDebtReport(),
        ]);
        setTotalAgencies(agenciesCount);
        setMonthlySales(salesData);
        const totalDebtAmount = debtData.reduce((sum, d) => sum + d.total_debt, 0);
        setTotalDebt(totalDebtAmount);
        const overdueAmount = debtData.reduce(
          (sum, d) => sum + (d.aging_buckets['90+'] || 0),
          0
        );
        setDebtOverdue(overdueAmount);
        const sortedByDebt = [...debtData].sort((a, b) => b.total_debt - a.total_debt);
        setTopDebtAgencies(sortedByDebt.slice(0, 5));
      } catch (error) {
        console.error('Failed to fetch dashboard stats', error);
      }
    };
    fetchStats();
  }, []);

  return (
    <DashboardLayout>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-6">Tổng quan hệ thống</h1>
        
        {/* Main statistics - Aligned with backend requirements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="bg-gradient-to-br from-blue-100 via-white to-cyan-100 border-2 border-blue-200 rounded-2xl shadow-xl p-8 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-all">
            <div className="p-4 bg-blue-600 rounded-full mb-4 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-blue-800 mb-2">Tổng đại lý</h3>
            <span className="text-3xl font-extrabold text-blue-700">{totalAgencies.toLocaleString()}</span>
            <div className="flex items-center mt-1">
              <span className="text-xs text-green-600">+3 trong tháng này</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-100 via-white to-lime-100 border-2 border-green-200 rounded-2xl shadow-xl p-8 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-all">
            <div className="p-4 bg-green-600 rounded-full mb-4 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-green-800 mb-2">Doanh số tháng</h3>
            <span className="text-3xl font-extrabold text-green-700">
              {monthlySales.length
                ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(
                    monthlySales[monthlySales.length - 1].amount
                  )
                : '-'}
            </span>
            <div className="flex items-center mt-1">
              <span className="text-xs text-green-600">+8.5% so với tháng trước</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-red-100 via-white to-pink-100 border-2 border-red-200 rounded-2xl shadow-xl p-8 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-all">
            <div className="p-4 bg-red-600 rounded-full mb-4 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-red-800 mb-2">Tổng công nợ</h3>
            <span className="text-3xl font-extrabold text-red-700">
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(
                totalDebt
              )}
            </span>
            <div className="flex items-center mt-1">
              <span className="text-xs text-red-600">
                Đã quá hạn: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(debtOverdue)}
              </span>
            </div>
          </div>
        </div>
        
        {/* Monthly Sales Chart - As required in the dashboard section */}
        <div className="border border-gray-200 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Doanh số theo tháng</h2>
          <div className="h-64 flex items-end space-x-2">
            {monthlySales.map((item, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div 
                  className="w-full bg-blue-500 hover:bg-blue-600 transition-colors rounded-t-md"
                  style={{ 
                    height: `${(item.amount / maxSalesValue) * 100}%`,
                    minHeight: '20px'
                  }}
                ></div>
                <div className="text-xs mt-2 text-gray-600">{item.month}</div>
                <div className="text-xs font-medium">{(item.amount / 1000000).toFixed(1)}M</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top 5 agencies by sales - Explicitly mentioned in the dashboard section */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Top 5 đại lý doanh số cao nhất</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold">
                  MN
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Đại lý Miền Nam</h3>
                    <span className="text-sm font-semibold">₫45.2M</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-semibold">
                  HN
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Đại lý Hà Nội</h3>
                    <span className="text-sm font-semibold">₫38.7M</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '72%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-semibold">
                  MB
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Đại lý Miền Bắc</h3>
                    <span className="text-sm font-semibold">₫32.5M</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-700 font-semibold">
                  MT
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Đại lý Miền Trung</h3>
                    <span className="text-sm font-semibold">₫28.9M</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '58%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-700 font-semibold">
                  CM
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Đại lý Cà Mau</h3>
                    <span className="text-sm font-semibold">₫22.4M</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-red-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Top 5 agencies by debt - Explicitly mentioned in the dashboard section */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Top 5 đại lý có công nợ cao nhất</h2>
            <div className="space-y-4">
              {topDebtAgencies.map((item) => {
                const maxDebt = topDebtAgencies[0]?.total_debt || 0;
                const percent = maxDebt ? (item.total_debt / maxDebt) * 100 : 0;
                const agencyName = (item.agency_name || '').trim();
                let code = '';
                if (agencyName) {
                  const initials = agencyName
                    .split(/\s+/)
                    .map(word => word[0] || '')
                    .join('');
                  code = initials.slice(0, 2).toUpperCase();
                } else if (item.agency_id != null) {
                  const idStr = String(item.agency_id);
                  code = idStr.slice(-2).toUpperCase();
                } else {
                  code = '??';
                }
                return (
                  <div key={item.agency_id} className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-700 font-semibold">
                      {code}
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium">{item.agency_name}</h3>
                        <span className="text-sm font-semibold">
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(item.total_debt)}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div className="bg-red-600 h-2 rounded-full" style={{ width: `${percent}%` }}></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Recent Activity */}
        <h2 className="text-2xl font-extrabold text-blue-800 mb-4 mt-10 drop-shadow">Hoạt động gần đây</h2>
        <div className="overflow-x-auto rounded-2xl shadow-xl border-2 border-blue-100 bg-white">
          <table className="min-w-full divide-y divide-blue-200">
            <thead className="bg-gradient-to-r from-blue-50 to-cyan-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã phiếu</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Đại lý</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loại</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Người tạo</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá trị</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-100">
              <tr>
                <td className="px-4 py-3 text-sm text-gray-900">PX-2458</td>
                <td className="px-4 py-3 text-sm text-gray-900">Đại lý Miền Bắc</td>
                <td className="px-4 py-3 text-sm text-gray-900">Xuất hàng</td>
                <td className="px-4 py-3 text-sm">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Hoàn thành
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">15/05/2024</td>
                <td className="px-4 py-3 text-sm text-gray-900">Nguyễn Văn A</td>
                <td className="px-4 py-3 text-sm text-gray-900">₫12,400,000</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-gray-900">PT-0145</td>
                <td className="px-4 py-3 text-sm text-gray-900">Đại lý Hậu Giang</td>
                <td className="px-4 py-3 text-sm text-gray-900">Thu tiền</td>
                <td className="px-4 py-3 text-sm">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    Đã thu
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">14/05/2024</td>
                <td className="px-4 py-3 text-sm text-gray-900">Trần Thị B</td>
                <td className="px-4 py-3 text-sm text-gray-900">₫5,500,000</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-gray-900">PN-0358</td>
                <td className="px-4 py-3 text-sm text-gray-900">Kho chính</td>
                <td className="px-4 py-3 text-sm text-gray-900">Nhập hàng</td>
                <td className="px-4 py-3 text-sm">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Đang xử lý
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">13/05/2024</td>
                <td className="px-4 py-3 text-sm text-gray-900">Lê Văn C</td>
                <td className="px-4 py-3 text-sm text-gray-900">₫28,500,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;