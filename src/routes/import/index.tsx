import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useNavigate } from 'react-router-dom';

const ImportManagementPage: React.FC = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const navigate = useNavigate();

  const importRecords = [
    {
      id: 'PN001',
      agency: 'Đại lý A',
      importDate: '2024-01-15',
      totalAmount: '15,000,000',
      creator: 'Nguyễn Văn A',
      createdDate: '2024-01-15',
      updatedDate: '2024-01-15',
    },
    {
      id: 'PN002',
      agency: 'Đại lý B',
      importDate: '2024-01-14',
      totalAmount: '22,500,000',
      creator: 'Trần Thị B',
      createdDate: '2024-01-14',
      updatedDate: '2024-01-14',
    },
  ];

  const filteredRecords = importRecords.filter(
    (record) =>
      (!fromDate || new Date(record.importDate) >= new Date(fromDate)) &&
      (!toDate || new Date(record.importDate) <= new Date(toDate))
  );

  return (
    <DashboardLayout>
      <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-blue-100">
        <h1 className="text-3xl font-extrabold text-blue-800 mb-8 drop-shadow uppercase tracking-wide">Quản lý Nhập hàng</h1>
        <div className="flex flex-wrap gap-4 mb-8 justify-between items-center">
          <select className="px-4 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg shadow-sm">
            <option>Tất cả đại lý</option>
            <option>Đại lý A</option>
            <option>Đại lý B</option>
          </select>
          <input
            type="date"
            className="px-4 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg shadow-sm"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <input
            type="date"
            className="px-4 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg shadow-sm"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
          <button
            onClick={() => navigate('/import/add')}
            className="px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-bold text-lg shadow-lg"
          >
            Tạo phiếu nhập
          </button>
        </div>
        <div className="overflow-x-auto rounded-2xl shadow-xl border-2 border-blue-100 bg-white">
          <table className="min-w-full bg-white border border-blue-200">
            <thead className="bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700">
              <tr className="uppercase text-sm">
                <th className="py-3 px-4 text-left">Mã phiếu nhập</th>
                <th className="py-3 px-4 text-left">Đại lý</th>
                <th className="py-3 px-4 text-left">Ngày nhập</th>
                <th className="py-3 px-4 text-left">Tổng tiền</th>
                <th className="py-3 px-4 text-left">Người tạo</th>
                <th className="py-3 px-4 text-left">Ngày tạo</th>
                <th className="py-3 px-4 text-left">Ngày cập nhật</th>
                <th className="py-3 px-4 text-left">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-100">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-semibold text-gray-900">{record.id}</td>
                  <td className="px-4 py-3 text-gray-800">{record.agency}</td>
                  <td className="px-4 py-3 text-gray-800">{record.importDate}</td>
                  <td className="px-4 py-3 text-gray-800">{record.totalAmount}</td>
                  <td className="px-4 py-3 text-gray-800">{record.creator}</td>
                  <td className="px-4 py-3 text-gray-800">{record.createdDate}</td>
                  <td className="px-4 py-3 text-gray-800">{record.updatedDate}</td>
                  <td className="px-4 py-3 space-x-2">
                    <button className="px-3 py-1 text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 rounded-lg">Xem chi tiết</button>
                    <button className="px-3 py-1 text-xs font-bold text-green-600 hover:text-green-800 bg-green-50 rounded-lg">Sửa</button>
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

export default ImportManagementPage;