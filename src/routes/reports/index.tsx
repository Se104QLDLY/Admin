import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';

interface Report {
  id: string;
  code: string;
  type: 'Doanh số' | 'Công nợ';
  date: string;
  data: string;
  creator: string;
  created_at: string;
}

const ReportsPage: React.FC = () => {
  // Mock data
  const reports: Report[] = [
    {
      id: '1',
      code: 'BC001',
      type: 'Doanh số',
      date: '15/01/2024',
      data: '1,250,000,000 VND',
      creator: 'Nguyễn Văn A',
      created_at: '15/01/2024',
    },
    {
      id: '2',
      code: 'BC002',
      type: 'Công nợ',
      date: '14/01/2024',
      data: '458,000,000 VND',
      creator: 'Trần Thị B',
      created_at: '14/01/2024',
    },
    {
      id: '3',
      code: 'BC003',
      type: 'Doanh số',
      date: '13/01/2024',
      data: '890,000,000 VND',
      creator: 'Lê Văn C',
      created_at: '13/01/2024',
    }
  ];

  const totalSales = '2,140,000,000 VND';
  const totalDebt = '458,000,000 VND';
  const reportCount = 3;

  return (
    <DashboardLayout>
      <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-blue-100">
        <h1 className="text-3xl font-extrabold text-blue-800 mb-8 drop-shadow uppercase tracking-wide">Lập báo cáo</h1>
        
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 border-2 border-blue-200 rounded-2xl shadow-xl p-6 flex flex-col items-center">
            <h2 className="text-base font-semibold text-blue-700 mb-2">Tổng doanh số</h2>
            <p className="text-2xl font-extrabold text-blue-800">{totalSales}</p>
          </div>
          
          <div className="bg-gradient-to-br from-red-50 via-white to-pink-50 border-2 border-red-200 rounded-2xl shadow-xl p-6 flex flex-col items-center">
            <h2 className="text-base font-semibold text-red-700 mb-2">Tổng nợ</h2>
            <p className="text-2xl font-extrabold text-red-800">{totalDebt}</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 via-white to-lime-50 border-2 border-green-200 rounded-2xl shadow-xl p-6 flex flex-col items-center">
            <h2 className="text-base font-semibold text-green-700 mb-2">Số lượng báo cáo</h2>
            <p className="text-2xl font-extrabold text-green-800">{reportCount}</p>
          </div>
        </div>
        
        {/* Reports List */}
        <div>
          <div className="flex flex-wrap gap-4 mb-8 justify-between items-center">
            <h2 className="text-2xl font-extrabold text-blue-800 drop-shadow">Báo cáo</h2>
            <button className="flex items-center px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-bold text-lg shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Lập báo cáo
            </button>
          </div>
          
          <div className="overflow-x-auto rounded-2xl shadow-xl border-2 border-blue-100 bg-white">
            <table className="min-w-full bg-white border border-blue-200">
              <thead className="bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700">
                <tr className="uppercase text-sm">
                  <th className="py-3 px-4 text-left">Mã báo cáo</th>
                  <th className="py-3 px-4 text-left">Loại báo cáo</th>
                  <th className="py-3 px-4 text-left">Ngày báo cáo</th>
                  <th className="py-3 px-4 text-left">Dữ liệu báo cáo</th>
                  <th className="py-3 px-4 text-left">Người tạo</th>
                  <th className="py-3 px-4 text-left">Ngày tạo</th>
                  <th className="py-3 px-4 text-left">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-100">
                {reports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold text-gray-900">{report.code}</td>
                    <td className="px-4 py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg ${
                        report.type === 'Doanh số' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>{report.type}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-800">{report.date}</td>
                    <td className="px-4 py-3 text-gray-800">{report.data}</td>
                    <td className="px-4 py-3 text-gray-800">{report.creator}</td>
                    <td className="px-4 py-3 text-gray-800">{report.created_at}</td>
                    <td className="px-4 py-3">
                      <Link
                        to={`/reports/${report.id}`}
                        className="px-3 py-1 text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 rounded-lg"
                      >
                        Xem chi tiết
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ReportsPage;