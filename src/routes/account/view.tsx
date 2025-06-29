import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout/DashboardLayout';
import { 
  ArrowLeft, 
  Edit, 
  Users, 
  CheckCircle, 
  AlertCircle, 
  XCircle,
  Calendar,
  Clock,
  User,
  Shield,
  Crown,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

interface Account {
  id: string;
  username: string;
  fullName: string;
  email: string;
  phone?: string;
  address?: string;
  role: 'Admin' | 'Staff' | 'Agency';
  status: 'Hoạt động' | 'Tạm khóa' | 'Ngừng hoạt động';
  createdDate: string;
  updatedDate: string;
  lastLogin?: string;
}

const ViewAccountPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Mock data - trong thực tế sẽ fetch từ API
  const account: Account = {
    id: id || '1',
    username: 'admin',
    fullName: 'Quản trị viên hệ thống',
    email: 'admin@company.com',
    phone: '0123456789',
    address: '123 Đường ABC, Quận 1, TP.HCM',
    role: 'Admin',
    status: 'Hoạt động',
    createdDate: '2024-01-01',
    updatedDate: '2024-01-20',
    lastLogin: '2024-01-20 14:30:00'
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin': return 'bg-gradient-to-r from-red-50 to-pink-50 text-red-700 border border-red-200';
      case 'Staff': return 'bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 border border-emerald-200';
      case 'Agency': return 'bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 border border-blue-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Admin': return <Crown className="h-4 w-4" />;
      case 'Staff': return <User className="h-4 w-4" />;
      case 'Agency': return <Shield className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Hoạt động': return 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-200';
      case 'Tạm khóa': return 'bg-gradient-to-r from-yellow-50 to-amber-50 text-yellow-700 border border-yellow-200';
      case 'Ngừng hoạt động': return 'bg-gradient-to-r from-red-50 to-pink-50 text-red-700 border border-red-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Hoạt động': return <CheckCircle className="h-4 w-4" />;
      case 'Tạm khóa': return <AlertCircle className="h-4 w-4" />;
      case 'Ngừng hoạt động': return <XCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
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
              <Users className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-2">
              CHI TIẾT TÀI KHOẢN
            </h1>
            <p className="text-gray-600 text-lg max-w-3xl leading-relaxed">
              Xem thông tin chi tiết tài khoản {account.username} với đầy đủ thông tin và cấu hình.
            </p>
          </div>
        </div>

        {/* Back Button */}
        <div className="mb-6">
          <Link
            to="/account"
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
                <Users className="h-5 w-5" />
                Thông tin cơ bản
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-blue-700 font-semibold mb-1">Tên đăng nhập</label>
                  <p className="bg-white px-4 py-2 rounded-lg border text-gray-800 font-semibold">{account.username}</p>
                </div>
                <div>
                  <label className="block text-blue-700 font-semibold mb-1">Họ tên</label>
                  <p className="bg-white px-4 py-2 rounded-lg border text-gray-800">{account.fullName}</p>
                </div>
                <div>
                  <label className="block text-blue-700 font-semibold mb-1">Email</label>
                  <div className="bg-white px-4 py-2 rounded-lg border flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-800">{account.email}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-blue-700 font-semibold mb-1">Số điện thoại</label>
                  <div className="bg-white px-4 py-2 rounded-lg border flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-800">{account.phone || 'Chưa cập nhật'}</span>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-blue-700 font-semibold mb-1">Địa chỉ</label>
                  <div className="bg-white px-4 py-2 rounded-lg border flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-800">{account.address || 'Chưa cập nhật'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Status */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200 shadow-xl">
              <h2 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Trạng thái và phân quyền
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-blue-700 font-semibold mb-2">Vai trò</label>
                  <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold shadow-sm ${getRoleColor(account.role)}`}>
                    {getRoleIcon(account.role)}
                    {account.role}
                  </span>
                </div>
                <div>
                  <label className="block text-blue-700 font-semibold mb-2">Trạng thái</label>
                  <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold shadow-sm ${getStatusColor(account.status)}`}>
                    {getStatusIcon(account.status)}
                    {account.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Account Info Card */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xl">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                Thông tin tài khoản
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">ID:</span>
                  <span className="text-gray-800 font-semibold">{account.id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Tên đăng nhập:</span>
                  <span className="text-blue-600 font-semibold">{account.username}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Vai trò:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${getRoleColor(account.role)}`}>
                    {account.role}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Trạng thái:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(account.status)}`}>
                    {account.status}
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
                  <label className="block text-gray-600 font-medium mb-1">Ngày tạo</label>
                  <p className="text-gray-800">{account.createdDate}</p>
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-1">Cập nhật lần cuối</label>
                  <p className="text-gray-800">{account.updatedDate}</p>
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-1">Đăng nhập cuối</label>
                  {account.lastLogin ? (
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-gray-400" />
                      <p className="text-gray-800">{account.lastLogin}</p>
                    </div>
                  ) : (
                    <p className="text-gray-400">Chưa đăng nhập</p>
                  )}
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
                  to={`/account/edit/${account.id}`}
                  className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all duration-200 font-semibold"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Chỉnh sửa tài khoản
                </Link>
                <Link
                  to="/account"
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

export default ViewAccountPage;
