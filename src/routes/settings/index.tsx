import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';

interface Regulation {
  id: string;
  code: string;
  name: string;
  value: string | number;
  description: string;
  created_at: string;
  updated_at: string;
}

const SettingsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for regulations
  const regulations: Regulation[] = [
    {
      id: '1',
      code: 'QD001',
      name: 'Quy định số lượng đại lý tối đa',
      value: 5,
      description: 'Giới hạn số lượng đại lý được phép đăng ký trong hệ thống',
      created_at: '15/01/2024',
      updated_at: '15/01/2024'
    },
    {
      id: '2',
      code: 'QD002',
      name: 'Quy định số lượng mặt hàng tối đa',
      value: 100,
      description: 'Giới hạn số lượng mặt hàng mỗi loại được phép bán',
      created_at: '10/01/2024',
      updated_at: '14/01/2024'
    },
    {
      id: '3',
      code: 'QD003',
      name: 'Quy định số tiền nợ tối đa',
      value: '10000000',
      description: 'Giới hạn số tiền nợ tối đa cho phép của một đại lý',
      created_at: '25/12/2023',
      updated_at: '12/01/2024'
    }
  ];

  const filteredRegulations = regulations.filter(regulation => 
    regulation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    regulation.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-blue-100">
        <h1 className="text-3xl font-extrabold text-blue-800 mb-8 drop-shadow uppercase tracking-wide">Quản lý quy định</h1>
        <div className="flex flex-wrap gap-4 mb-8 justify-between items-center">
          <input
            type="text"
            placeholder="Tìm kiếm quy định..."
            className="flex-1 min-w-[220px] px-4 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="flex items-center px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-bold text-lg shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Thêm quy định
          </button>
        </div>
        <div className="overflow-x-auto rounded-2xl shadow-xl border-2 border-blue-100 bg-white">
          <table className="min-w-full bg-white border border-blue-200">
            <thead className="bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700">
              <tr className="uppercase text-sm">
                <th className="py-3 px-4 text-left">Mã quy định</th>
                <th className="py-3 px-4 text-left">Tên quy định</th>
                <th className="py-3 px-4 text-left">Giá trị</th>
                <th className="py-3 px-4 text-left">Mô tả</th>
                <th className="py-3 px-4 text-left">Ngày tạo</th>
                <th className="py-3 px-4 text-left">Ngày cập nhật</th>
                <th className="py-3 px-4 text-left">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-100">
              {filteredRegulations.map((regulation) => (
                <tr key={regulation.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-900 font-semibold">{regulation.code}</td>
                  <td className="px-4 py-3 text-gray-900 font-semibold">{regulation.name}</td>
                  <td className="px-4 py-3">
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-bold">
                      {regulation.value.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-800 max-w-sm truncate">{regulation.description}</td>
                  <td className="px-4 py-3 text-gray-800">{regulation.created_at}</td>
                  <td className="px-4 py-3 text-gray-800">{regulation.updated_at}</td>
                  <td className="px-4 py-3 space-x-2">
                    <button className="px-3 py-1 text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 rounded-lg">Sửa</button>
                    <button className="px-3 py-1 text-xs font-bold text-red-600 hover:text-red-800 bg-red-50 rounded-lg">Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;