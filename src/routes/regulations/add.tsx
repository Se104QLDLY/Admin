import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout/DashboardLayout';
import { 
  ArrowLeft, 
  FilePlus2, 
  Shield, 
  Save, 
  AlertTriangle
} from 'lucide-react';

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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6" style={{ overflow: 'visible' }}>
        {/* Header Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-blue-100 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-emerald-400/20 to-blue-400/20 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl mb-4 shadow-xl">
              <FilePlus2 className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              THÊM QUY ĐỊNH MỚI
            </h1>
            <p className="text-gray-600 text-lg max-w-3xl leading-relaxed">
              Tạo quy định mới cho hệ thống quản lý với các thông tin chi tiết và cấu hình phù hợp.
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

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information Section */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <h2 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Thông tin cơ bản
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Mã quy định */}
                <div>
                  <label className="block text-blue-700 font-semibold mb-2">
                    Mã quy định <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('code')}
                    placeholder="Ví dụ: QD001"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                  {errors.code && (
                    <span className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      {errors.code.message}
                    </span>
                  )}
                </div>

                {/* Danh mục */}
                <div>
                  <label className="block text-blue-700 font-semibold mb-2">
                    Danh mục <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register('category')}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Chọn danh mục</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  {errors.category && (
                    <span className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      {errors.category.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Tiêu đề */}
              <div className="mt-6">
                <label className="block text-blue-700 font-semibold mb-2">
                  Tiêu đề quy định <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('title')}
                  placeholder="Nhập tiêu đề quy định"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                {errors.title && (
                  <span className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    {errors.title.message}
                  </span>
                )}
              </div>

              {/* Mô tả ngắn */}
              <div className="mt-6">
                <label className="block text-blue-700 font-semibold mb-2">
                  Mô tả ngắn <span className="text-red-500">*</span>
                </label>
                <textarea
                  {...register('description')}
                  rows={3}
                  placeholder="Mô tả ngắn gọn về quy định này"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                />
                {errors.description && (
                  <span className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    {errors.description.message}
                  </span>
                )}
              </div>
            </div>

            {/* Content Section */}
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-6 border border-emerald-200">
              <h2 className="text-xl font-bold text-emerald-800 mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Nội dung quy định
              </h2>
              
              <div>
                <label className="block text-emerald-700 font-semibold mb-2">
                  Nội dung chi tiết <span className="text-red-500">*</span>
                </label>
                <textarea
                  {...register('content')}
                  rows={8}
                  placeholder="Nhập nội dung chi tiết của quy định..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 resize-none"
                />
                {errors.content && (
                  <span className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    {errors.content.message}
                  </span>
                )}
              </div>
            </div>

            {/* Settings Section */}
            <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl p-6 border border-purple-200">
              <h2 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Cài đặt và trạng thái
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Ngày hiệu lực */}
                <div>
                  <label className="block text-purple-700 font-semibold mb-2">
                    Ngày hiệu lực <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('effectiveDate')}
                    type="date"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  />
                  {errors.effectiveDate && (
                    <span className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      {errors.effectiveDate.message}
                    </span>
                  )}
                </div>

                {/* Ngày hết hạn */}
                <div>
                  <label className="block text-purple-700 font-semibold mb-2">
                    Ngày hết hạn
                  </label>
                  <input
                    {...register('expiryDate')}
                    type="date"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  />
                  {errors.expiryDate && (
                    <span className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      {errors.expiryDate.message}
                    </span>
                  )}
                </div>

                {/* Mức độ ưu tiên */}
                <div>
                  <label className="block text-purple-700 font-semibold mb-2">
                    Mức độ ưu tiên <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register('priority')}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="Thấp">Thấp</option>
                    <option value="Trung bình">Trung bình</option>
                    <option value="Cao">Cao</option>
                    <option value="Rất cao">Rất cao</option>
                  </select>
                  {errors.priority && (
                    <span className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      {errors.priority.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Trạng thái */}
              <div className="mt-6">
                <label className="block text-purple-700 font-semibold mb-2">
                  Trạng thái <span className="text-red-500">*</span>
                </label>
                <select
                  {...register('status')}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="Dự thảo">Dự thảo</option>
                  <option value="Hiệu lực">Hiệu lực</option>
                  <option value="Hết hiệu lực">Hết hiệu lực</option>
                </select>
                {errors.status && (
                  <span className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    {errors.status.message}
                  </span>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4 pt-6">
              <Link
                to="/regulations"
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 font-semibold"
              >
                Hủy bỏ
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center px-8 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:via-purple-600 hover:to-indigo-600 transition-all duration-200 font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Đang tạo...
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5 mr-2" />
                    Tạo quy định
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

export default AddRegulationPage; 