import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';

interface Regulation {
  id: string;
  code: string;
  title: string;
  description: string;
  status: 'Hiệu lực' | 'Hết hiệu lực';
  createdDate: string;
}

const RegulationsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [regulationToDelete, setRegulationToDelete] = useState<Regulation | null>(null);

  // Mock data
  const [regulations, setRegulations] = useState<Regulation[]>([
    {
      id: '1',
      code: 'QD001',
      title: 'Quy định về mức nợ tối đa của đại lý',
      description: 'Quy định mức nợ tối đa mà một đại lý có thể có đối với công ty là 10,000,000 VND',
      status: 'Hiệu lực',
      createdDate: '15/01/2024'
    },
    {
      id: '2',
      code: 'QD002',
      title: 'Quy định về loại hàng hóa được phép nhập',
      description: 'Danh sách các loại hàng hóa được phép nhập và xuất trong hệ thống',
      status: 'Hiệu lực',
      createdDate: '10/01/2024'
    },
    {
      id: '3',
      code: 'QD003',
      title: 'Quy định về thời hạn thanh toán',
      description: 'Thời hạn thanh toán tối đa cho các giao dịch là 30 ngày',
      status: 'Hết hiệu lực',
      createdDate: '20/12/2023'
    }
  ]);

  const filteredRegulations = regulations.filter(regulation => 
    regulation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    regulation.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClick = (regulation: Regulation) => {
    setRegulationToDelete(regulation);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (regulationToDelete) {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Remove from local state
        setRegulations(regulations.filter(r => r.id !== regulationToDelete.id));
        
        // Close modal and reset
        setShowDeleteModal(false);
        setRegulationToDelete(null);
        
        alert(`Đã xóa quy định ${regulationToDelete.code} thành công!`);
      } catch (error) {
        console.error('Error deleting regulation:', error);
        alert('Có lỗi xảy ra khi xóa quy định!');
      }
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setRegulationToDelete(null);
  };

  return (
    <DashboardLayout>
      <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-blue-100">
        <h1 className="text-3xl font-extrabold text-blue-800 mb-8 drop-shadow uppercase tracking-wide">
          Quản lý quy định
        </h1>
        
        {/* Search and Add Button */}
        <div className="flex flex-wrap gap-4 mb-8 justify-between items-center">
          <input
            type="text"
            placeholder="Tìm kiếm quy định..."
            className="flex-1 min-w-[220px] px-4 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Link 
            to="/regulations/add"
            className="flex items-center px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-bold text-lg shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Thêm quy định
          </Link>
        </div>

        {/* Regulations Table */}
        <div className="overflow-x-auto rounded-2xl shadow-xl border-2 border-blue-100 bg-white">
          <table className="min-w-full bg-white border border-blue-200">
            <thead className="bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700">
              <tr className="uppercase text-sm">
                <th className="py-3 px-4 text-left">Mã quy định</th>
                <th className="py-3 px-4 text-left">Tiêu đề</th>
                <th className="py-3 px-4 text-left">Mô tả</th>
                <th className="py-3 px-4 text-left">Trạng thái</th>
                <th className="py-3 px-4 text-left">Ngày tạo</th>
                <th className="py-3 px-4 text-left">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-100">
              {filteredRegulations.map((regulation) => (
                <tr key={regulation.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-semibold text-gray-900">{regulation.code}</td>
                  <td className="px-4 py-3 font-semibold text-gray-900">{regulation.title}</td>
                  <td className="px-4 py-3 text-gray-700">{regulation.description}</td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg ${
                      regulation.status === 'Hiệu lực' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {regulation.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-800">{regulation.createdDate}</td>
                  <td className="px-4 py-3 space-x-2">
                    <Link
                      to={`/regulations/view/${regulation.id}`}
                      className="px-3 py-1 text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                    >
                      Xem
                    </Link>
                    <Link
                      to={`/regulations/edit/${regulation.id}`}
                      className="px-3 py-1 text-xs font-bold text-green-600 hover:text-green-800 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                    >
                      Sửa
                    </Link>
                    <button
                      onClick={() => handleDeleteClick(regulation)}
                      className="px-3 py-1 text-xs font-bold text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRegulations.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">Không tìm thấy quy định nào.</p>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Xác nhận xóa quy định</h3>
                <p className="text-gray-600 mb-6">
                  Bạn có chắc chắn muốn xóa quy định <strong>{regulationToDelete?.code}</strong>?
                  <br />
                  <span className="text-sm text-red-600">Hành động này không thể hoàn tác.</span>
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={handleDeleteCancel}
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    onClick={handleDeleteConfirm}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
                  >
                    Xóa quy định
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default RegulationsPage; 