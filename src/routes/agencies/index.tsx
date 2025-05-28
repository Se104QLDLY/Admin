import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';

const AgencyPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Mock data for agencies
  const agencies = [
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

  return (
    <DashboardLayout>
      <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-blue-100">
        <h1 className="text-3xl font-extrabold text-blue-800 mb-8 drop-shadow uppercase tracking-wide">Quản lý đại lý</h1>
        <div className="flex flex-wrap gap-4 mb-8 justify-between items-center">
          <input
            type="text"
            placeholder="Tìm kiếm đại lý..."
            className="flex-1 min-w-[220px] px-4 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={() => navigate('/agencies/add')}
            className="flex items-center px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-bold text-lg shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Thêm đại lý
          </button>
        </div>
        <h2 className="text-2xl font-extrabold text-blue-800 mb-6 drop-shadow">Danh sách đại lý</h2>
        <div className="overflow-x-auto rounded-2xl shadow-xl border-2 border-blue-100 bg-white">
          <table className="min-w-full bg-white border border-blue-200">
            <thead className="bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700">
              <tr className="uppercase text-sm">
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
            <tbody className="divide-y divide-blue-100">
              {filteredAgencies.map((agency) => (
                <tr key={agency.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-semibold text-gray-900">{agency.code}</td>
                  <td className="px-4 py-3 font-semibold text-gray-900">{agency.name}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-sm font-bold shadow-lg ${agency.type.name === 'Cấp 1' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>{agency.type.name}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-800">{agency.district}</td>
                  <td className="px-4 py-3 text-gray-800">{agency.address}</td>
                  <td className="px-4 py-3 text-gray-800">{agency.phone}</td>
                  <td className="px-4 py-3 text-gray-800">{agency.email}</td>
                  <td className="px-4 py-3 text-gray-800">{new Date(agency.createdDate).toLocaleDateString('vi-VN')}</td>
                  <td className="px-4 py-3 text-gray-800">{new Date(agency.updatedDate).toLocaleDateString('vi-VN')}</td>
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

export default AgencyPage;