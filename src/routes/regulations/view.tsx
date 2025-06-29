import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout/DashboardLayout';
import { 
  ArrowLeft, 
  Edit, 
  Shield, 
  CheckCircle, 
  AlertCircle, 
  Calendar,
  Clock,
  User,
  FileText
} from 'lucide-react';

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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6" style={{ overflow: 'visible' }}>
        {/* Header Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-blue-200 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-400/20 to-cyan-400/20 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl mb-4 shadow-xl">
              <Shield className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-2">
              CHI TIẾT QUY ĐỊNH
            </h1>
            <p className="text-gray-600 text-lg max-w-3xl leading-relaxed">
              Xem thông tin chi tiết quy định {regulation.code} với đầy đủ nội dung và cấu hình.
            </p>
          </div>
        </div>

        {/* Back Button */}
        <div className="mb-6">
          <Link
            to="/regulations"
            className="inline-flex items-center px-4 py-2 text-blue-600 hover:text-blue-800 bg-white hover:bg-blue-50 rounded-xl transition-all duration-200 font-semibold shadow-lg border border-blue-200"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Quay lại danh sách
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200 shadow-xl">
              <h2 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Thông tin cơ bản
              </h2>
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
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200 shadow-xl">
              <h2 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Nội dung quy định
              </h2>
              <div className="bg-white p-6 rounded-lg border">
                <pre className="whitespace-pre-wrap text-gray-700 leading-relaxed font-sans">{regulation.content}</pre>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Card */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xl">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                Trạng thái
              </h3>
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
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xl">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                Thời gian
              </h3>
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
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xl">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Edit className="h-5 w-5 text-blue-600" />
                Thao tác
              </h3>
              <div className="space-y-3">
                <Link
                  to={`/regulations/edit/${regulation.id}`}
                  className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all duration-200 font-semibold"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Chỉnh sửa quy định
                </Link>
                <Link
                  to="/regulations"
                  className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 font-semibold"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Quay lại danh sách
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ViewRegulationPage; 