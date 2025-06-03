import React from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useTableFilters } from '../../hooks/useTableFilters';

interface ExportItem {
  code: string;
  agency: string;
  exportDate: string;
  totalAmount: number;
  creator: string;
  createdDate: string;
  updatedDate: string;
}

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

const ExportPage: React.FC = () => {
  const {
    searchTerm,
    setSearchTerm,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    selectedFilter: selectedAgency,
    setSelectedFilter: setSelectedAgency,
    filteredData
  } = useTableFilters<ExportItem>(
    exportItems,
    ['code', 'agency', 'creator'],
    { useDate: true, dateField: 'exportDate' }
  );

  const filteredItems = filteredData();

  return (
    <DashboardLayout>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Quản lý Xuất hàng</h1>
          <Link to="/export/create" className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Tạo phiếu xuất
          </Link>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-1 min-w-[300px]">
            <input
              type="text"
              placeholder="Tìm kiếm phiếu xuất..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="w-auto">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedAgency}
              onChange={(e) => setSelectedAgency(e.target.value)}
            >
              <option value="all">Tất cả đại lý</option>
              <option value="Đại lý A">Đại lý A</option>
              <option value="Đại lý B">Đại lý B</option>
            </select>
          </div>
          
          <div className="w-auto">
            <input
              type="date"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Từ ngày"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          
          <div className="w-auto">
            <input
              type="date"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Đến ngày"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Mã phiếu xuất
                </th>
                <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Đại lý
                </th>
                <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Ngày xuất
                </th>
                <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Tổng tiền
                </th>
                <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Người tạo
                </th>
                <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Ngày tạo
                </th>
                <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Ngày cập nhật
                </th>
                <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.map((item) => (
                <tr key={item.code}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.code}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.agency}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {new Date(item.exportDate).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {item.totalAmount.toLocaleString('vi-VN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {item.creator}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {new Date(item.createdDate).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {new Date(item.updatedDate).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm flex gap-2">
                    <Link 
                      to={`/export/detail/${item.code}`} 
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      Xem chi tiết
                    </Link>
                    <button className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                      Sửa
                    </button>
                    <button className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
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