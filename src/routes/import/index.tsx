import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';

interface ImportItem {
  id: number;
  name: string;
  quantity: number;
  supplier: string;
  date: string;
  status: 'pending' | 'completed';
}

const ImportPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'completed'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const importItems: ImportItem[] = [
    {
      id: 1,
      name: 'Laptop Dell XPS',
      quantity: 50,
      supplier: 'Dell Vietnam',
      date: '2024-01-15',
      status: 'pending',
    },
    {
      id: 2,
      name: 'iPhone 15 Pro',
      quantity: 100,
      supplier: 'Apple Store',
      date: '2024-01-14',
      status: 'completed',
    },
    {
      id: 3,
      name: 'Samsung S24',
      quantity: 75,
      supplier: 'Samsung Electronics',
      date: '2024-01-13',
      status: 'pending',
    },
  ];

  const filteredItems = importItems.filter((item) => {
    if (activeTab === 'pending' && item.status !== 'pending') return false;
    if (activeTab === 'completed' && item.status !== 'completed') return false;
    if (searchTerm && !item.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <DashboardLayout>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-6">QUẢN LÝ NHẬP HÀNG</h1>

        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'pending'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Chờ xử lý
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'completed'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Đã nhập
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Tên sản phẩm
                </th>
                <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Số lượng
                </th>
                <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Nhà cung cấp
                </th>
                <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Ngày nhập
                </th>
                <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Trạng thái
                </th>
                <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {item.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {item.supplier}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {new Date(item.date).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {item.status === 'completed' ? 'Đã nhập' : 'Chờ xử lý'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                    <a href="#" className="hover:underline">
                      Chi tiết
                    </a>
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

export default ImportPage; 