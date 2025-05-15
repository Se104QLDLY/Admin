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
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold uppercase mb-8">Lập báo cáo</h1>
        
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border rounded-lg p-6 shadow-sm">
            <h2 className="text-base font-medium text-gray-600 mb-2">Tổng doanh số</h2>
            <p className="text-2xl font-bold text-blue-600">{totalSales}</p>
          </div>
          
          <div className="bg-white border rounded-lg p-6 shadow-sm">
            <h2 className="text-base font-medium text-gray-600 mb-2">Tổng nợ</h2>
            <p className="text-2xl font-bold text-red-600">{totalDebt}</p>
          </div>
          
          <div className="bg-white border rounded-lg p-6 shadow-sm">
            <h2 className="text-base font-medium text-gray-600 mb-2">Số lượng báo cáo</h2>
            <p className="text-2xl font-bold text-gray-800">{reportCount}</p>
          </div>
        </div>
        
        {/* Reports List */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Danh sách báo cáo</h2>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Lập báo cáo
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-50 border border-gray-200">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
                  <th className="py-3 px-4 text-left">Mã báo cáo</th>
                  <th className="py-3 px-4 text-left">Loại báo cáo</th>
                  <th className="py-3 px-4 text-left">Ngày báo cáo</th>
                  <th className="py-3 px-4 text-left">Dữ liệu báo cáo</th>
                  <th className="py-3 px-4 text-left">Người tạo</th>
                  <th className="py-3 px-4 text-left">Ngày tạo</th>
                  <th className="py-3 px-4 text-left">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {reports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-900">{report.code}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        report.type === 'Doanh số' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {report.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-800">{report.date}</td>
                    <td className="px-4 py-3 text-gray-800">{report.data}</td>
                    <td className="px-4 py-3 text-gray-800">{report.creator}</td>
                    <td className="px-4 py-3 text-gray-800">{report.created_at}</td>
                    <td className="px-4 py-3">
                      <Link 
                        to={`/reports/${report.id}`} 
                        className="text-blue-600 hover:text-blue-800 font-medium"
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