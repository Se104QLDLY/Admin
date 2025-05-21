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
      <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-blue-100">
        <h1 className="text-3xl font-extrabold text-blue-800 mb-8 drop-shadow uppercase tracking-wide">Quản lý nhập hàng</h1>
        <div className="flex flex-wrap gap-4 mb-8 items-center">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-5 py-2 rounded-xl font-bold text-lg shadow-lg transition-colors ${activeTab === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-blue-700 hover:bg-blue-200'}`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-5 py-2 rounded-xl font-bold text-lg shadow-lg transition-colors ${activeTab === 'pending' ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-yellow-700 hover:bg-yellow-100'}`}
          >
            Chờ xử lý
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-5 py-2 rounded-xl font-bold text-lg shadow-lg transition-colors ${activeTab === 'completed' ? 'bg-green-600 text-white' : 'bg-gray-100 text-green-700 hover:bg-green-100'}`}
          >
            Đã nhập
          </button>
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="flex-1 min-w-[220px] px-4 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg shadow-sm ml-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <h2 className="text-2xl font-extrabold text-blue-800 mb-6 drop-shadow">Danh sách phiếu nhập</h2>
        <div className="overflow-x-auto rounded-2xl shadow-xl border-2 border-blue-100 bg-white">
          <table className="min-w-full bg-white border border-blue-200">
            <thead className="bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700">
              <tr className="uppercase text-sm">
                <th className="px-6 py-3 text-left">Tên sản phẩm</th>
                <th className="px-6 py-3 text-left">Số lượng</th>
                <th className="px-6 py-3 text-left">Nhà cung cấp</th>
                <th className="px-6 py-3 text-left">Ngày nhập</th>
                <th className="px-6 py-3 text-left">Trạng thái</th>
                <th className="px-6 py-3 text-left">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-100">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-gray-900">{item.name}</td>
                  <td className="px-6 py-4 text-gray-700">{item.quantity}</td>
                  <td className="px-6 py-4 text-gray-700">{item.supplier}</td>
                  <td className="px-6 py-4 text-gray-700">{new Date(item.date).toLocaleDateString('vi-VN')}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg ${item.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {item.status === 'completed' ? 'Đã nhập' : 'Chờ xử lý'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-blue-600 font-bold">
                    <a href="#" className="hover:underline">Chi tiết</a>
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