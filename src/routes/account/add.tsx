import React, { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';

interface AccountFormInputs {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'Admin' | 'Staff';
  fullName: string;
  phone?: string;
  status: 'active' | 'inactive';
}

const schema = yup.object().shape({
  username: yup
    .string()
    .required('Vui lòng nhập tên đăng nhập')
    .min(3, 'Tên đăng nhập phải có ít nhất 3 ký tự')
    .max(20, 'Tên đăng nhập không được vượt quá 20 ký tự')
    .matches(/^[a-zA-Z0-9._]+$/, 'Tên đăng nhập chỉ được chứa chữ cái, số, dấu chấm và gạch dưới'),
  email: yup
    .string()
    .email('Email không hợp lệ')
    .required('Vui lòng nhập email'),
  password: yup
    .string()
    .required('Vui lòng nhập mật khẩu')
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
  confirmPassword: yup
    .string()
    .required('Vui lòng xác nhận mật khẩu')
    .oneOf([yup.ref('password')], 'Mật khẩu xác nhận không khớp'),
  role: yup
    .string()
    .required('Vui lòng chọn vai trò'),
  fullName: yup
    .string()
    .required('Vui lòng nhập họ tên')
    .min(2, 'Họ tên phải có ít nhất 2 ký tự'),
  phone: yup
    .string()
    .matches(/^[0-9]{10,11}$/, 'Số điện thoại không hợp lệ'),
  status: yup
    .string()
    .required('Vui lòng chọn trạng thái')
});

const AddAccountPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors }, watch } = useForm<AccountFormInputs>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      status: 'active'
    }
  });

  const onSubmit: SubmitHandler<AccountFormInputs> = async (data) => {
    setIsSubmitting(true);
    console.log('Creating account:', data);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    navigate('/account');
  };

  return (
    <DashboardLayout>
      <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-blue-100">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-extrabold text-blue-800 drop-shadow uppercase tracking-wide">
            Thêm tài khoản mới
          </h1>
          <button
            onClick={() => navigate('/account')}
            className="px-4 py-2 text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors font-semibold"
          >
            ← Quay lại
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-blue-700 font-semibold mb-2">Họ và tên *</label>
              <input
                type="text"
                {...register('fullName')}
                className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-lg bg-blue-50"
                placeholder="Nhập họ và tên"
              />
              {errors.fullName && (
                <span className="text-red-500 text-sm mt-1">{errors.fullName.message}</span>
              )}
            </div>

            {/* Username */}
            <div>
              <label className="block text-blue-700 font-semibold mb-2">Tên đăng nhập *</label>
              <input
                type="text"
                {...register('username')}
                className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-lg bg-blue-50"
                placeholder="Nhập tên đăng nhập"
              />
              {errors.username && (
                <span className="text-red-500 text-sm mt-1">{errors.username.message}</span>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-blue-700 font-semibold mb-2">Email *</label>
              <input
                type="email"
                {...register('email')}
                className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-lg bg-blue-50"
                placeholder="Nhập email"
              />
              {errors.email && (
                <span className="text-red-500 text-sm mt-1">{errors.email.message}</span>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-blue-700 font-semibold mb-2">Số điện thoại</label>
              <input
                type="text"
                {...register('phone')}
                className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-lg bg-blue-50"
                placeholder="Nhập số điện thoại"
              />
              {errors.phone && (
                <span className="text-red-500 text-sm mt-1">{errors.phone.message}</span>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-blue-700 font-semibold mb-2">Mật khẩu *</label>
              <input
                type="password"
                {...register('password')}
                className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-lg bg-blue-50"
                placeholder="Nhập mật khẩu"
              />
              {errors.password && (
                <span className="text-red-500 text-sm mt-1">{errors.password.message}</span>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-blue-700 font-semibold mb-2">Xác nhận mật khẩu *</label>
              <input
                type="password"
                {...register('confirmPassword')}
                className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-lg bg-blue-50"
                placeholder="Nhập lại mật khẩu"
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</span>
              )}
            </div>

            {/* Role */}
            <div>
              <label className="block text-blue-700 font-semibold mb-2">Vai trò *</label>
              <select
                {...register('role')}
                className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-lg bg-blue-50"
              >
                <option value="">Chọn vai trò</option>
                <option value="Admin">Quản trị viên</option>
                <option value="Staff">Nhân viên</option>
              </select>
              {errors.role && (
                <span className="text-red-500 text-sm mt-1">{errors.role.message}</span>
              )}
            </div>

            {/* Status */}
            <div>
              <label className="block text-blue-700 font-semibold mb-2">Trạng thái *</label>
              <select
                {...register('status')}
                className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-lg bg-blue-50"
              >
                <option value="active">Hoạt động</option>
                <option value="inactive">Không hoạt động</option>
              </select>
              {errors.status && (
                <span className="text-red-500 text-sm mt-1">{errors.status.message}</span>
              )}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3 bg-gradient-to-r from-green-600 to-blue-500 text-white font-bold rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Đang tạo tài khoản...
                </div>
              ) : (
                'Tạo tài khoản'
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate('/account')}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AddAccountPage; 