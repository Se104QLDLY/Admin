import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';

interface Regulation {
  id: string;
  code: string;
  title: string;
  description: string;
  content: string;
  effectiveDate: string;
  expiryDate?: string;
  category: string;
  priority: 'Thấp' | 'Trung bình' | 'Cao' | 'Rất cao';
  status: 'Hiệu lực' | 'Hết hiệu lực' | 'Dự thảo';
  createdDate: string;
  updatedDate: string;
  createdBy: string;
}

const ViewRegulationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Mock data - trong thực tế sẽ fetch từ API
  const regulation: Regulation = {
    id: id || '1',
    code: 'QD001',
    title: 'Quy định về mức nợ tối đa của đại lý',
    description: 'Quy định mức nợ tối đa mà một đại lý có thể có đối với công ty nhằm đảm bảo tính thanh khoản và giảm thiểu rủi ro tài chính.',
    content: `Điều 1: Mức nợ tối đa
Mức nợ tối đa của đại lý được quy định như sau:
- Đại lý loại A: Tối đa 10,000,000 VND
- Đại lý loại B: Tối đa 5,000,000 VND  
- Đại lý loại C: Tối đa 2,000,000 VND

Điều 2: Thời hạn thanh toán
Đại lý phải thanh toán trong vòng 30 ngày kể từ ngày phát sinh nợ.

Điều 3: Xử lý vi phạm
Trường hợp đại lý vượt quá mức nợ cho phép:
- Lần 1: Cảnh cáo bằng văn bản
- Lần 2: Tạm dừng cung cấp hàng hóa trong 7 ngày
- Lần 3: Chấm dứt hợp đồng hợp tác

Điều 4: Hiệu lực
Quy định này có hiệu lực từ ngày 15/01/2024 và thay thế các quy định trước đó.`,
    effectiveDate: '2024-01-15',
    expiryDate: '2025-12-31',
    category: 'Quản lý tài chính',
    priority: 'Cao',
    status: 'Hiệu lực',
    createdDate: '15/01/2024',
    updatedDate: '15/01/2024',
    createdBy: 'Admin System'
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Rất cao': return 'bg-red-100 text-red-800';
      case 'Cao': return 'bg-orange-100 text-orange-800';
      case 'Trung bình': return 'bg-yellow-100 text-yellow-800';
      case 'Thấp': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Hiệu lực': return 'bg-green-100 text-green-800';
      case 'Hết hiệu lực': return 'bg-red-100 text-red-800';
      case 'Dự thảo': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout>
      <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-blue-100">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-blue-800 mb-2 drop-shadow uppercase tracking-wide">
              Chi tiết quy định
            </h1>
            <p className="text-gray-600">Xem thông tin chi tiết quy định {regulation.code}</p>
          </div>
          <div className="flex gap-3">
            <Link
              to={`/regulations/edit/${regulation.id}`}
              className="flex items-center px-4 py-2 text-green-600 hover:text-green-800 bg-green-50 hover:bg-green-100 rounded-xl transition-colors font-semibold"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Sửa
            </Link>
            <Link
              to="/regulations"
              className="flex items-center px-4 py-2 text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors font-semibold"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Quay lại
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-100">
              <h2 className="text-xl font-bold text-blue-800 mb-4">Thông tin cơ bản</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-blue-700 font-semibold mb-1">Mã quy định</label>
                  <p className="bg-white px-4 py-2 rounded-lg border text-gray-800 font-semibold">{regulation.code}</p>
                </div>
                <div>
                  <label className="block text-blue-700 font-semibold mb-1">Danh mục</label>
                  <p className="bg-white px-4 py-2 rounded-lg border text-gray-800">{regulation.category}</p>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-blue-700 font-semibold mb-1">Tiêu đề</label>
                  <p className="bg-white px-4 py-2 rounded-lg border text-gray-800 font-semibold">{regulation.title}</p>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-blue-700 font-semibold mb-1">Mô tả</label>
                  <p className="bg-white px-4 py-3 rounded-lg border text-gray-700 leading-relaxed">{regulation.description}</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-100">
              <h2 className="text-xl font-bold text-green-800 mb-4">Nội dung quy định</h2>
              <div className="bg-white p-6 rounded-lg border">
                <pre className="whitespace-pre-wrap text-gray-700 leading-relaxed font-sans">{regulation.content}</pre>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Card */}
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 shadow-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Trạng thái</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Trạng thái:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(regulation.status)}`}>
                    {regulation.status}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Mức độ ưu tiên:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${getPriorityColor(regulation.priority)}`}>
                    {regulation.priority}
                  </span>
                </div>
              </div>
            </div>

            {/* Dates Card */}
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 shadow-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Thời gian</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-gray-600 font-medium mb-1">Ngày hiệu lực</label>
                  <p className="text-blue-600 font-semibold">{new Date(regulation.effectiveDate).toLocaleDateString('vi-VN')}</p>
                </div>
                {regulation.expiryDate && (
                  <div>
                    <label className="block text-gray-600 font-medium mb-1">Ngày hết hạn</label>
                    <p className="text-red-600 font-semibold">{new Date(regulation.expiryDate).toLocaleDateString('vi-VN')}</p>
                  </div>
                )}
                <div>
                  <label className="block text-gray-600 font-medium mb-1">Ngày tạo</label>
                  <p className="text-gray-800">{regulation.createdDate}</p>
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-1">Cập nhật lần cuối</label>
                  <p className="text-gray-800">{regulation.updatedDate}</p>
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-1">Người tạo</label>
                  <p className="text-gray-800">{regulation.createdBy}</p>
                </div>
              </div>
            </div>

            {/* Actions Card */}
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 shadow-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Thao tác</h3>
              <div className="space-y-3">
                <Link
                  to={`/regulations/edit/${regulation.id}`}
                  className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  Chỉnh sửa
                </Link>
                <button className="w-full flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Xóa quy định
                </button>
                <button className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Tải xuống PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ViewRegulationPage; 