import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';

interface Agency {
  id: string;
  code: string;
  name: string;
  type: {
    id: number;
    name: string;
  };
  district: string;
  address: string;
  phone: string;
  email: string;
  createdDate: string;
  updatedDate: string;
}

const AgencyPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for agencies
  const agencies: Agency[] = [
    {
      id: '1',
      code: 'DL001',
      name: 'Đại lý Minh Anh',
      type: {
        id: 1,
        name: 'Cấp 1'
      },
      district: 'Quận 1',
      address: '123 Nguyễn Huệ',
      phone: '0901234567',
      email: 'minhanh@email.com',
      createdDate: '2024-01-15',
      updatedDate: '2024-01-20'
    },
    {
      id: '2',
      code: 'DL002',
      name: 'Đại lý Thành Công',
      type: {
        id: 2,
        name: 'Cấp 2'
      },
      district: 'Quận 3',
      address: '456 Lê Lợi',
      phone: '0907654321',
      email: 'thanhcong@email.com',
      createdDate: '2024-01-10',
      updatedDate: '2024-01-18'
    }
  ];

  const filteredAgencies = agencies.filter(agency => 
    agency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agency.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agency.district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to render the agency type badge
  const renderAgencyTypeBadge = (type: { id: number; name: string }) => {
    if (type.name === 'Cấp 1') {
      return (
        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
          Cấp 1
        </span>
      );
    } else {
      return (
        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
          Cấp 2
        </span>
      );
    }
  };

  return (
    <DashboardLayout>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold uppercase mb-6">Quản lý đại lý</h1>
        
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-96">
            <input
              type="text"
              placeholder="Tìm kiếm đại lý..."
              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Thêm đại lý
          </button>
        </div>
        
        <h2 className="text-lg font-medium mb-4">Danh sách đại lý</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-50 border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
                <th className="py-3 px-4 text-left">Mã đại lý</th>
                <th className="py-3 px-4 text-left">Tên đại lý</th>
                <th className="py-3 px-4 text-left">Loại đại lý</th>
                <th className="py-3 px-4 text-left">Quận/Huyện</th>
                <th className="py-3 px-4 text-left">Địa chỉ</th>
                <th className="py-3 px-4 text-left">Số điện thoại</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Ngày tạo</th>
                <th className="py-3 px-4 text-left">Ngày cập nhật</th>
                <th className="py-3 px-4 text-left">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAgencies.map((agency) => (
                <tr key={agency.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-900">{agency.code}</td>
                  <td className="px-4 py-3 text-gray-900">{agency.name}</td>
                  <td className="px-4 py-3 text-gray-900 whitespace-nowrap">
                    {renderAgencyTypeBadge(agency.type)}
                  </td>
                  <td className="px-4 py-3 text-gray-800">{agency.district}</td>
                  <td className="px-4 py-3 text-gray-800">{agency.address}</td>
                  <td className="px-4 py-3 text-gray-800">{agency.phone}</td>
                  <td className="px-4 py-3 text-gray-800">{agency.email}</td>
                  <td className="px-4 py-3 text-gray-800">{new Date(agency.createdDate).toLocaleDateString('vi-VN')}</td>
                  <td className="px-4 py-3 text-gray-800">{new Date(agency.updatedDate).toLocaleDateString('vi-VN')}</td>
                  <td className="px-4 py-3 space-x-2">
                    <button className="px-3 py-1 text-xs font-medium text-blue-600 hover:text-blue-800">
                      Sửa
                    </button>
                    <button className="px-3 py-1 text-xs font-medium text-red-600 hover:text-red-800">
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

export default AgencyPage; 