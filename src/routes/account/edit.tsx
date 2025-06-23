import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout/DashboardLayout';
import { 
  ArrowLeft, 
  Edit, 
  Users, 
  Save, 
  AlertTriangle,
  Shield,
  Crown,
  User
} from 'lucide-react';

interface AccountFormData {
  username: string;
  fullName: string;
  email: string;
  role: 'Admin' | 'Staff' | 'Agency';
  status: 'Hoạt động' | 'Tạm khóa' | 'Ngừng hoạt động';
  phone?: string;
  address?: string;
}

const schema = yup.object({
  username: yup
    .string()
    .required('Tên đăng nhập là bắt buộc')
    .min(3, 'Tên đăng nhập phải có ít nhất 3 ký tự')
    .max(20, 'Tên đăng nhập không được vượt quá 20 ký tự')
    .matches(/^[a-zA-Z0-9_]+$/, 'Tên đăng nhập chỉ được chứa chữ cái, số và dấu gạch dưới'),
  fullName: yup
    .string()
    .required('Họ tên là bắt buộc')
    .min(2, 'Họ tên phải có ít nhất 2 ký tự')
    .max(50, 'Họ tên không được vượt quá 50 ký tự'),
  email: yup
    .string()
    .required('Email là bắt buộc')
    .email('Email không hợp lệ'),
  role: yup
    .string()
    .required('Vai trò là bắt buộc')
    .oneOf(['Admin', 'Staff', 'Agency']),
  status: yup
    .string()
    .required('Trạng thái là bắt buộc')
    .oneOf(['Hoạt động', 'Tạm khóa', 'Ngừng hoạt động']),
  phone: yup
    .string()
    .matches(/^[0-9+\-\s()]*$/, 'Số điện thoại không hợp lệ'),
  address: yup
    .string()
    .max(200, 'Địa chỉ không được vượt quá 200 ký tự'),
});

const EditAccountPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AccountFormData>({
    resolver: yupResolver(schema),
  });

  // Mock data - trong thực tế sẽ fetch từ API
  const mockAccount: AccountFormData = {
    username: 'admin',
    fullName: 'Quản trị viên hệ thống',
    email: 'admin@company.com',
    phone: '0123456789',
    address: '123 Đường ABC, Quận 1, TP.HCM',
    role: 'Admin',
    status: 'Hoạt động',
  };

  useEffect(() => {
    // Simulate loading data from API
    const loadAccount = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Set form data
        reset(mockAccount);
      } catch (error) {
        console.error('Error loading account:', error);
        alert('Có lỗi xảy ra khi tải thông tin tài khoản!');
      }
    };

    if (id) {
      loadAccount();
    }
  }, [id, reset]);

  const onSubmit = async (data: AccountFormData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Updated account data:', data);
      
      // Show success message and redirect
      alert('Tài khoản đã được cập nhật thành công!');
      navigate('/account');
    } catch (error) {
      console.error('Error updating account:', error);
      alert('Có lỗi xảy ra khi cập nhật tài khoản!');
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

  return (
    <DashboardLayout>
      <div className="min-h-screen p-6" style={{ overflow: 'visible' }}>
        {/* Header Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-orange-100 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-yellow-400/20 to-orange-400/20 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 rounded-3xl mb-4 shadow-xl">
              <Edit className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent mb-2">
              CHỈNH SỬA TÀI KHOẢN
            </h1>
            <p className="text-gray-600 text-lg max-w-3xl leading-relaxed">
              Cập nhật thông tin tài khoản {id} với các thay đổi cần thiết và cấu hình mới.
            </p>
          </div>
        </div>

        {/* Back Button */}
        <div className="mb-6">
          <Link
            to="/account"
            className="inline-flex items-center px-4 py-2 text-orange-600 hover:text-orange-800 bg-white hover:bg-orange-50 rounded-xl transition-all duration-200 font-semibold shadow-lg border border-orange-200"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Quay lại danh sách
          </Link>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-orange-100">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information Section */}
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-200">
              <h2 className="text-xl font-bold text-orange-800 mb-4 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Thông tin cơ bản
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Username */}
                <div>
                  <label className="block text-orange-700 font-semibold mb-2">
                    Tên đăng nhập <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('username')}
                    placeholder="Nhập tên đăng nhập"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  />
                  {errors.username && (
                    <span className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      {errors.username.message}
                    </span>
                  )}
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-orange-700 font-semibold mb-2">
                    Họ tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('fullName')}
                    placeholder="Nhập họ tên đầy đủ"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  />
                  {errors.fullName && (
                    <span className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      {errors.fullName.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="mt-6">
                <label className="block text-orange-700 font-semibold mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="Nhập địa chỉ email"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Phone and Address */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-orange-700 font-semibold mb-2">
                    Số điện thoại
                  </label>
                  <input
                    {...register('phone')}
                    placeholder="Nhập số điện thoại"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  />
                  {errors.phone && (
                    <span className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      {errors.phone.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-orange-700 font-semibold mb-2">
                    Địa chỉ
                  </label>
                  <input
                    {...register('address')}
                    placeholder="Nhập địa chỉ"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  />
                  {errors.address && (
                    <span className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      {errors.address.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Settings Section */}
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-6 border border-emerald-200">
              <h2 className="text-xl font-bold text-emerald-800 mb-4 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Cài đặt và phân quyền
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Role */}
                <div>
                  <label className="block text-emerald-700 font-semibold mb-2">
                    Vai trò <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register('role')}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="Staff">Staff</option>
                    <option value="Admin">Admin</option>
                    <option value="Agency">Agency</option>
                  </select>
                  {errors.role && (
                    <span className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      {errors.role.message}
                    </span>
                  )}
                </div>

                {/* Status */}
                <div>
                  <label className="block text-emerald-700 font-semibold mb-2">
                    Trạng thái <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register('status')}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="Hoạt động">Hoạt động</option>
                    <option value="Tạm khóa">Tạm khóa</option>
                    <option value="Ngừng hoạt động">Ngừng hoạt động</option>
                  </select>
                  {errors.status && (
                    <span className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      {errors.status.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Role Description */}
              <div className="mt-6 p-4 bg-white rounded-lg border border-emerald-200">
                <h3 className="font-semibold text-emerald-800 mb-2">Mô tả vai trò:</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    {getRoleIcon('Admin')}
                    <span><strong>Admin:</strong> Quyền quản trị cao nhất, có thể quản lý tất cả chức năng</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getRoleIcon('Staff')}
                    <span><strong>Staff:</strong> Nhân viên thường, có quyền truy cập các chức năng cơ bản</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getRoleIcon('Agency')}
                    <span><strong>Agency:</strong> Đại lý, có quyền quản lý thông tin riêng và báo cáo</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4 pt-6">
              <Link
                to="/account"
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 font-semibold"
              >
                Hủy bỏ
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center px-8 py-3 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 text-white rounded-xl hover:from-orange-600 hover:via-amber-600 hover:to-yellow-600 transition-all duration-200 font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Đang cập nhật...
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5 mr-2" />
                    Cập nhật tài khoản
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EditAccountPage;
