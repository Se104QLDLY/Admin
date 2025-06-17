import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';

interface RegulationFormData {
  code: string;
  title: string;
  description: string;
  content: string;
  effectiveDate: string;
  expiryDate?: string;
  category: string;
  priority: 'Thấp' | 'Trung bình' | 'Cao' | 'Rất cao';
  status: 'Hiệu lực' | 'Hết hiệu lực' | 'Dự thảo';
}

const schema = yup.object({
  code: yup
    .string()
    .required('Mã quy định là bắt buộc')
    .matches(/^QD\d{3,}$/, 'Mã quy định phải có định dạng QD001, QD002...'),
  title: yup
    .string()
    .required('Tiêu đề là bắt buộc')
    .min(10, 'Tiêu đề phải có ít nhất 10 ký tự')
    .max(200, 'Tiêu đề không được vượt quá 200 ký tự'),
  description: yup
    .string()
    .required('Mô tả ngắn là bắt buộc')
    .min(20, 'Mô tả phải có ít nhất 20 ký tự')
    .max(500, 'Mô tả không được vượt quá 500 ký tự'),
  content: yup
    .string()
    .required('Nội dung quy định là bắt buộc')
    .min(50, 'Nội dung phải có ít nhất 50 ký tự'),
  effectiveDate: yup
    .string()
    .required('Ngày hiệu lực là bắt buộc'),
  expiryDate: yup
    .string()
    .test('expiry-after-effective', 'Ngày hết hạn phải sau ngày hiệu lực', function(value) {
      if (!value) return true; // Optional field
      return new Date(value) > new Date(this.parent.effectiveDate);
    }),
  category: yup
    .string()
    .required('Danh mục là bắt buộc'),
  priority: yup
    .string()
    .required('Mức độ ưu tiên là bắt buộc')
    .oneOf(['Thấp', 'Trung bình', 'Cao', 'Rất cao']),
  status: yup
    .string()
    .required('Trạng thái là bắt buộc')
    .oneOf(['Hiệu lực', 'Hết hiệu lực', 'Dự thảo']),
});

const AddRegulationPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegulationFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      status: 'Dự thảo',
      priority: 'Trung bình',
    }
  });

  const onSubmit = async (data: RegulationFormData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Regulation data:', data);
      
      // Show success message and redirect
      alert('Quy định đã được thêm thành công!');
      navigate('/regulations');
    } catch (error) {
      console.error('Error adding regulation:', error);
      alert('Có lỗi xảy ra khi thêm quy định!');
    }
  };

  const categories = [
    'Quản lý tài chính',
    'Quản lý hàng hóa',
    'Quản lý đại lý',
    'Quy trình thanh toán',
    'Bảo mật thông tin',
    'Tuân thủ pháp luật',
    'Khác'
  ];

  return (
    <DashboardLayout>
      <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-blue-100">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-blue-800 mb-2 drop-shadow uppercase tracking-wide">
              Thêm quy định mới
            </h1>
            <p className="text-gray-600">Tạo quy định mới cho hệ thống quản lý</p>
          </div>
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

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Mã quy định */}
          <div className="lg:col-span-1">
            <label className="block text-blue-700 font-semibold mb-2">
              Mã quy định <span className="text-red-500">*</span>
            </label>
            <input
              {...register('code')}
              placeholder="Ví dụ: QD001"
              className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg shadow-sm"
            />
            {errors.code && (
              <span className="text-red-500 text-sm mt-1">{errors.code.message}</span>
            )}
          </div>

          {/* Danh mục */}
          <div className="lg:col-span-1">
            <label className="block text-blue-700 font-semibold mb-2">
              Danh mục <span className="text-red-500">*</span>
            </label>
            <select
              {...register('category')}
              className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg shadow-sm"
            >
              <option value="">Chọn danh mục</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            {errors.category && (
              <span className="text-red-500 text-sm mt-1">{errors.category.message}</span>
            )}
          </div>

          {/* Tiêu đề */}
          <div className="lg:col-span-2">
            <label className="block text-blue-700 font-semibold mb-2">
              Tiêu đề quy định <span className="text-red-500">*</span>
            </label>
            <input
              {...register('title')}
              placeholder="Nhập tiêu đề quy định"
              className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg shadow-sm"
            />
            {errors.title && (
              <span className="text-red-500 text-sm mt-1">{errors.title.message}</span>
            )}
          </div>

          {/* Mô tả ngắn */}
          <div className="lg:col-span-2">
            <label className="block text-blue-700 font-semibold mb-2">
              Mô tả ngắn <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register('description')}
              rows={3}
              placeholder="Mô tả ngắn gọn về quy định này"
              className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg shadow-sm resize-none"
            />
            {errors.description && (
              <span className="text-red-500 text-sm mt-1">{errors.description.message}</span>
            )}
          </div>

          {/* Nội dung quy định */}
          <div className="lg:col-span-2">
            <label className="block text-blue-700 font-semibold mb-2">
              Nội dung quy định <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register('content')}
              rows={8}
              placeholder="Nhập nội dung chi tiết của quy định..."
              className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg shadow-sm resize-none"
            />
            {errors.content && (
              <span className="text-red-500 text-sm mt-1">{errors.content.message}</span>
            )}
          </div>

          {/* Ngày hiệu lực */}
          <div className="lg:col-span-1">
            <label className="block text-blue-700 font-semibold mb-2">
              Ngày hiệu lực <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              {...register('effectiveDate')}
              className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg shadow-sm"
            />
            {errors.effectiveDate && (
              <span className="text-red-500 text-sm mt-1">{errors.effectiveDate.message}</span>
            )}
          </div>

          {/* Ngày hết hạn */}
          <div className="lg:col-span-1">
            <label className="block text-blue-700 font-semibold mb-2">
              Ngày hết hạn (tùy chọn)
            </label>
            <input
              type="date"
              {...register('expiryDate')}
              className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg shadow-sm"
            />
            {errors.expiryDate && (
              <span className="text-red-500 text-sm mt-1">{errors.expiryDate.message}</span>
            )}
          </div>

          {/* Mức độ ưu tiên */}
          <div className="lg:col-span-1">
            <label className="block text-blue-700 font-semibold mb-2">
              Mức độ ưu tiên <span className="text-red-500">*</span>
            </label>
            <select
              {...register('priority')}
              className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg shadow-sm"
            >
              <option value="Thấp">Thấp</option>
              <option value="Trung bình">Trung bình</option>
              <option value="Cao">Cao</option>
              <option value="Rất cao">Rất cao</option>
            </select>
            {errors.priority && (
              <span className="text-red-500 text-sm mt-1">{errors.priority.message}</span>
            )}
          </div>

          {/* Trạng thái */}
          <div className="lg:col-span-1">
            <label className="block text-blue-700 font-semibold mb-2">
              Trạng thái <span className="text-red-500">*</span>
            </label>
            <select
              {...register('status')}
              className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg shadow-sm"
            >
              <option value="Dự thảo">Dự thảo</option>
              <option value="Hiệu lực">Hiệu lực</option>
              <option value="Hết hiệu lực">Hết hiệu lực</option>
            </select>
            {errors.status && (
              <span className="text-red-500 text-sm mt-1">{errors.status.message}</span>
            )}
          </div>

          {/* Buttons */}
          <div className="lg:col-span-2 flex gap-4 pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all text-lg border-2 border-transparent hover:border-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                  Đang xử lý...
                </div>
              ) : (
                'Thêm quy định'
              )}
            </button>
            <Link
              to="/regulations"
              className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl shadow-lg hover:bg-gray-200 transition-all text-lg text-center"
            >
              Hủy bỏ
            </Link>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AddRegulationPage; 