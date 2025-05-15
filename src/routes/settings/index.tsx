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
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold uppercase mb-6">Quản lý quy định</h1>
        
        <div className="flex justify-between items-center mb-6">
          <div className="w-96">
            <input
              type="text"
              placeholder="Tìm kiếm quy định..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Thêm quy định
          </button>
        </div>
        
        <h2 className="text-lg font-medium mb-4">Danh sách quy định</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-50 border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
                <th className="py-3 px-4 text-left">Mã quy định</th>
                <th className="py-3 px-4 text-left">Tên quy định</th>
                <th className="py-3 px-4 text-left">Giá trị</th>
                <th className="py-3 px-4 text-left">Mô tả</th>
                <th className="py-3 px-4 text-left">Ngày tạo</th>
                <th className="py-3 px-4 text-left">Ngày cập nhật</th>
                <th className="py-3 px-4 text-left">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredRegulations.map((regulation) => (
                <tr key={regulation.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-900">{regulation.code}</td>
                  <td className="px-4 py-3 text-gray-900">{regulation.name}</td>
                  <td className="px-4 py-3 text-gray-900">{regulation.value.toLocaleString()}</td>
                  <td className="px-4 py-3 text-gray-800 max-w-sm truncate">{regulation.description}</td>
                  <td className="px-4 py-3 text-gray-800">{regulation.created_at}</td>
                  <td className="px-4 py-3 text-gray-800">{regulation.updated_at}</td>
                  <td className="px-4 py-3 space-x-2">
                    <button className="px-2 py-1 text-xs font-medium text-blue-600 hover:text-blue-800">
                      Sửa
                    </button>
                    <button className="px-2 py-1 text-xs font-medium text-red-600 hover:text-red-800">
                      Xóa
                    </button>
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