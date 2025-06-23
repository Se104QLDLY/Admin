import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout/DashboardLayout';
import { 
  FileText, 
  FilePlus2, 
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  Shield,
  ArrowLeft
} from 'lucide-react';

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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6" style={{ overflow: 'visible' }}>
        {/* Header Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-blue-100 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-emerald-400/20 to-blue-400/20 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl mb-4 shadow-xl">
              <Shield className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              QUẢN LÝ QUY ĐỊNH
            </h1>
            <p className="text-gray-600 text-lg max-w-3xl leading-relaxed">
              Thiết lập, quản lý và theo dõi các quy định, chính sách và tiêu chuẩn của hệ thống với giao diện hiện đại và trực quan.
            </p>
          </div>
        </div>

        {/* Search and Add Button */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-blue-100 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm quy định..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
            <Link
              to="/regulations/add"
              className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:via-purple-600 hover:to-indigo-600 transition-all duration-200 font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <FilePlus2 className="h-6 w-6 mr-2" />
              Tạo quy định mới
            </Link>
          </div>
        </div>

        {/* Regulations Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100 mb-8">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <Shield className="h-7 w-7 text-blue-600" />
              Danh sách quy định
              <span className="text-sm font-normal text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {filteredRegulations.length} quy định
              </span>
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Mã quy định</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Tiêu đề</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Mô tả</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Trạng thái</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Ngày tạo</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Thao tác</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredRegulations.map((regulation) => (
                  <tr key={regulation.id} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm font-bold rounded-full">
                        {regulation.code}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{regulation.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">{regulation.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {regulation.status === 'Hiệu lực' ? (
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 text-sm font-semibold rounded-full border border-green-200 shadow-sm">
                          <CheckCircle className="h-4 w-4" />
                          Hiệu lực
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-red-50 to-pink-50 text-red-700 text-sm font-semibold rounded-full border border-red-200 shadow-sm">
                          <AlertCircle className="h-4 w-4" />
                          Hết hiệu lực
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{regulation.createdDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/regulations/view/${regulation.id}`}
                          className="text-blue-600 hover:text-blue-900 flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-all duration-200"
                        >
                          <Eye className="h-4 w-4" />
                          Xem
                        </Link>
                        <Link
                          to={`/regulations/edit/${regulation.id}`}
                          className="text-emerald-600 hover:text-emerald-900 flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-emerald-50 transition-all duration-200"
                        >
                          <Edit className="h-4 w-4" />
                          Sửa
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(regulation)}
                          className="text-red-600 hover:text-red-900 flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-all duration-200"
                        >
                          <Trash2 className="h-4 w-4" />
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredRegulations.length === 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-blue-100">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <FileText className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Không tìm thấy quy định</h3>
            <p className="text-gray-600 mb-6">Không có quy định nào phù hợp với tìm kiếm của bạn.</p>
            <Link
              to="/regulations/add"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FilePlus2 className="h-4 w-4 mr-2" />
              Tạo quy định đầu tiên
            </Link>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl border border-red-100">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-red-100 to-pink-100 mb-6">
                  <Trash2 className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Xác nhận xóa quy định</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Bạn có chắc chắn muốn xóa quy định <strong className="text-red-600">{regulationToDelete?.code} - {regulationToDelete?.title}</strong>?
                  <br />
                  <span className="text-sm text-red-500 font-medium">Hành động này không thể hoàn tác.</span>
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={handleDeleteCancel}
                    className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 font-semibold"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    onClick={handleDeleteConfirm}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-200 font-semibold shadow-lg"
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