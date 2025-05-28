import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';

interface ExportItem {
  code: string;
  agency: string;
  exportDate: string;
  totalAmount: number;
  creator: string;
  createdDate: string;
  updatedDate: string;
}

const ExportPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAgency, setSelectedAgency] = useState<string>('all');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const navigate = useNavigate();

  const exportItems: ExportItem[] = [
    {
      code: 'PX001',
      agency: 'Đại lý A',
      exportDate: '2024-01-15',
      totalAmount: 18500000,
      creator: 'Nguyễn Văn A',
      createdDate: '2024-01-15',
      updatedDate: '2024-01-15',
    },
    {
      code: 'PX002',
      agency: 'Đại lý B',
      exportDate: '2024-01-14',
      totalAmount: 25700000,
      creator: 'Trần Thị B',
      createdDate: '2024-01-14',
      updatedDate: '2024-01-14',
    },
  ];

  // Filter based on search term, agency selection, and date range
  const filteredItems = exportItems.filter((item) => {
    if (searchTerm && !item.code.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    if (selectedAgency !== 'all' && item.agency !== selectedAgency) {
      return false;
    }
    if (startDate && new Date(item.exportDate) < new Date(startDate)) {
      return false;
    }
    if (endDate && new Date(item.exportDate) > new Date(endDate)) {
      return false;
    }
    return true;
  });

  return (
    <DashboardLayout>
      <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-blue-100">
        <div className="flex flex-wrap gap-4 mb-8 justify-between items-center">
          <h1 className="text-3xl font-extrabold text-blue-800 drop-shadow uppercase tracking-wide">Quản lý xuất hàng</h1>
          <button
            onClick={() => navigate('/export/add')}
            className="px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-bold text-lg shadow-lg"
          >
            Tạo phiếu xuất
          </button>
        </div>
        <div className="flex flex-wrap gap-4 mb-8 items-center">
          <input
            type="text"
            placeholder="Tìm kiếm phiếu xuất..."
            className="flex-1 min-w-[220px] px-4 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="px-4 py-3 border-2 border-blue-200 rounded-xl bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg font-semibold"
            value={selectedAgency}
            onChange={(e) => setSelectedAgency(e.target.value)}
          >
            <option value="all">Tất cả đại lý</option>
            <option value="Đại lý A">Đại lý A</option>
            <option value="Đại lý B">Đại lý B</option>
          </select>
          <input
            type="date"
            className="px-4 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            placeholder="Từ ngày"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className="px-4 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            placeholder="Đến ngày"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <h2 className="text-2xl font-extrabold text-blue-800 mb-6 drop-shadow">Danh sách phiếu xuất</h2>
        <div className="overflow-x-auto rounded-2xl shadow-xl border-2 border-blue-100 bg-white">
          <table className="min-w-full bg-white border border-blue-200">
            <thead className="bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700">
              <tr className="uppercase text-sm">
                <th className="px-6 py-3 text-left">Mã phiếu xuất</th>
                <th className="px-6 py-3 text-left">Đại lý</th>
                <th className="px-6 py-3 text-left">Ngày xuất</th>
                <th className="px-6 py-3 text-left">Tổng tiền</th>
                <th className="px-6 py-3 text-left">Người tạo</th>
                <th className="px-6 py-3 text-left">Ngày tạo</th>
                <th className="px-6 py-3 text-left">Ngày cập nhật</th>
                <th className="px-6 py-3 text-left">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-100">
              {filteredItems.map((item) => (
                <tr key={item.code} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-gray-900">{item.code}</td>
                  <td className="px-6 py-4 text-gray-900">{item.agency}</td>
                  <td className="px-6 py-4 text-gray-700">{new Date(item.exportDate).toLocaleDateString('vi-VN')}</td>
                  <td className="px-6 py-4 text-gray-700">{item.totalAmount.toLocaleString('vi-VN')}</td>
                  <td className="px-6 py-4 text-gray-700">{item.creator}</td>
                  <td className="px-6 py-4 text-gray-700">{new Date(item.createdDate).toLocaleDateString('vi-VN')}</td>
                  <td className="px-6 py-4 text-gray-700">{new Date(item.updatedDate).toLocaleDateString('vi-VN')}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <Link
                      to={`/export/detail/${item.code}`}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-bold shadow"
                    >
                      Xem chi tiết
                    </Link>
                    <button className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors font-bold shadow">
                      Sửa
                    </button>
                    <button className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors font-bold shadow">
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

export default ExportPage;