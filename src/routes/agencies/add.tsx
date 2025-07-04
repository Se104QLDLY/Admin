import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { UserPlus, ArrowLeft, Building2, UserCircle, Phone, Mail, MapPin, Calendar, ShieldCheck, Map, CheckCircle } from 'lucide-react';

// =================================================================================
// DATA SETUP (For standalone running, based on your DB Schema)
// =================================================================================
const setupMockData = () => {
    if (!localStorage.getItem('agency_types')) {
        const mockAgencyTypes = [
            { agency_type_id: 1, type_name: 'Đại lý Cấp 1', max_debt: 100000000 },
            { agency_type_id: 2, type_name: 'Đại lý Cấp 2', max_debt: 50000000 },
            { agency_type_id: 3, type_name: 'Nhà Phân Phối', max_debt: 500000000 },
        ];
        localStorage.setItem('agency_types', JSON.stringify(mockAgencyTypes));
    }
    if (!localStorage.getItem('districts')) {
        const mockDistricts = [
            { district_id: 1, district_name: 'Quận 1', max_agencies: 4 },
            { district_id: 2, district_name: 'Quận 3', max_agencies: 4 },
            { district_id: 3, district_name: 'Quận Gò Vấp', max_agencies: 4 },
            { district_id: 4, district_name: 'Thành phố Thủ Đức', max_agencies: 4 },
        ];
        localStorage.setItem('districts', JSON.stringify(mockDistricts));
    }
     if (!localStorage.getItem('agencies_list')) {
        localStorage.setItem('agencies_list', JSON.stringify([]));
    }
};

const getAgencyTypes = () => JSON.parse(localStorage.getItem('agency_types') || '[]');
const getDistricts = () => JSON.parse(localStorage.getItem('districts') || '[]');

// =================================================================================
// FORM VALIDATION SCHEMA (Based on agency.agency table)
// =================================================================================
const schema = yup.object({
  agency_name: yup.string().required('Tên đại lý là bắt buộc').min(5, 'Tên đại lý phải có ít nhất 5 ký tự').max(150, 'Tên đại lý không quá 150 ký tự'),
  agency_type_id: yup.number().typeError('Vui lòng chọn loại đại lý').required('Loại đại lý là bắt buộc'),
  phone_number: yup.string().required('Số điện thoại là bắt buộc').matches(/^(0[3|5|7|8|9])+([0-9]{8})\b/, 'Số điện thoại không hợp lệ'),
  address: yup.string().required('Địa chỉ là bắt buộc').min(10, 'Địa chỉ phải có ít nhất 10 ký tự'),
  district_id: yup.number().typeError('Vui lòng chọn quận').required('Quận là bắt buộc'),
  email: yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
  representative: yup.string().optional().max(100, 'Tên người đại diện không quá 100 ký tự'),
  reception_date: yup.date().typeError('Ngày tiếp nhận không hợp lệ').required('Ngày tiếp nhận là bắt buộc').max(new Date(), 'Ngày tiếp nhận không được ở tương lai'),
});

// =================================================================================
// HELPER COMPONENT: InputField
// =================================================================================
const InputField = ({ id, label, icon, error, register, ...rest }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
        <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                {icon}
            </span>
            <input
                id={id}
                {...register(id)}
                {...rest}
                className={`w-full pl-11 pr-4 py-3 bg-white border ${error ? 'border-red-500 ring-red-500' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500'} rounded-lg focus:outline-none focus:ring-2 shadow-sm transition-all`}
            />
        </div>
        {error && <p className="text-red-600 text-xs mt-1">{error.message}</p>}
    </div>
);

// =================================================================================
// MAIN COMPONENT: AddAgencyPage
// =================================================================================
const AddAgencyPage: React.FC = () => {
  const navigate = useNavigate();
  const [agencyTypes, setAgencyTypes] = useState([]);
  const [districts, setDistricts] = useState([]);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
        reception_date: new Date().toISOString().split('T')[0], // Default to today
    }
  });

  useEffect(() => {
    setupMockData();
    setAgencyTypes(getAgencyTypes());
    setDistricts(getDistricts());
  }, []);

  const onSubmit = async (data) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const agenciesList = JSON.parse(localStorage.getItem('agencies_list') || '[]');
      const newAgency = {
          agency_id: Date.now(), // Simple unique ID
          ...data,
          debt_amount: 0, // Default debt
          created_at: new Date().toISOString(),
      };
      agenciesList.push(newAgency);
      localStorage.setItem('agencies_list', JSON.stringify(agenciesList));

      console.log('Agency data to be saved:', newAgency);
      alert('Thêm đại lý mới thành công!');
      navigate('/agencies');
    } catch (error) {
      console.error('Lỗi khi thêm đại lý:', error);
      alert('Đã có lỗi xảy ra. Vui lòng thử lại.');
    }
  };

  return (
    <DashboardLayout>
      <div className="bg-gradient-to-br from-slate-50 to-blue-100/30 font-sans p-4 sm:p-6 lg:p-8 min-h-screen">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <UserPlus className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-800">Thêm Đại Lý Mới</h1>
                <p className="text-slate-500 text-base mt-1">Điền thông tin để tạo hồ sơ cho một đại lý</p>
              </div>
            </div>
            <button type="button" onClick={() => navigate('/agencies')} className="flex items-center justify-center px-4 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-100 hover:border-slate-400 transition-all duration-300 font-semibold gap-2 text-sm shadow-sm">
              <ArrowLeft className="h-4 w-4" />
              <span>Quay lại danh sách</span>
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-md border border-slate-200/80">
            <div className="space-y-8">
              {/* Section 1: Thông tin chung */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                    <InputField id="agency_name" label="Tên đại lý *" icon={<Building2 className="h-5 w-5"/>} error={errors.agency_name} register={register} placeholder="VD: Công ty TNHH An Khang" />
                </div>
                <InputField id="representative" label="Người đại diện" icon={<UserCircle className="h-5 w-5"/>} error={errors.representative} register={register} placeholder="VD: Nguyễn Văn A" />
                <InputField type="date" id="reception_date" label="Ngày tiếp nhận *" icon={<Calendar className="h-5 w-5"/>} error={errors.reception_date} register={register} />
              </div>

              {/* Section 2: Phân loại & Khu vực */}
              <div className="border-t border-slate-200 pt-8">
                 <h3 className="text-lg font-semibold text-blue-800 mb-4">Phân loại & Khu vực</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="agency_type_id" className="block text-sm font-medium text-slate-700 mb-1.5">Loại đại lý *</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400"><ShieldCheck className="h-5 w-5"/></span>
                            <select id="agency_type_id" {...register('agency_type_id')} className={`w-full pl-11 pr-4 py-3 bg-white border ${errors.agency_type_id ? 'border-red-500 ring-red-500' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500'} rounded-lg focus:outline-none focus:ring-2 shadow-sm transition-all`}>
                                <option value="">-- Chọn loại đại lý --</option>
                                {agencyTypes.map(type => <option key={type.agency_type_id} value={type.agency_type_id}>{type.type_name}</option>)}
                            </select>
                        </div>
                        {errors.agency_type_id && <p className="text-red-600 text-xs mt-1">{errors.agency_type_id.message}</p>}
                    </div>
                     <div>
                        <label htmlFor="district_id" className="block text-sm font-medium text-slate-700 mb-1.5">Quận / Huyện *</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400"><Map className="h-5 w-5"/></span>
                            <select id="district_id" {...register('district_id')} className={`w-full pl-11 pr-4 py-3 bg-white border ${errors.district_id ? 'border-red-500 ring-red-500' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500'} rounded-lg focus:outline-none focus:ring-2 shadow-sm transition-all`}>
                                <option value="">-- Chọn quận/huyện --</option>
                                {districts.map(d => <option key={d.district_id} value={d.district_id}>{d.district_name}</option>)}
                            </select>
                        </div>
                        {errors.district_id && <p className="text-red-600 text-xs mt-1">{errors.district_id.message}</p>}
                    </div>
                 </div>
              </div>

              {/* Section 3: Thông tin liên hệ */}
              <div className="border-t border-slate-200 pt-8">
                <h3 className="text-lg font-semibold text-blue-800 mb-4">Thông tin liên hệ</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField id="address" label="Địa chỉ chi tiết *" icon={<MapPin className="h-5 w-5"/>} error={errors.address} register={register} placeholder="VD: 123 Võ Văn Tần, Phường 6" />
                    <InputField id="phone_number" label="Số điện thoại *" icon={<Phone className="h-5 w-5"/>} error={errors.phone_number} register={register} placeholder="VD: 0901234567" />
                    <div className="md:col-span-2">
                        <InputField type="email" id="email" label="Email *" icon={<Mail className="h-5 w-5"/>} error={errors.email} register={register} placeholder="VD: daily.ankhang@email.com" />
                    </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-8 border-t border-slate-200">
                <button type="button" onClick={() => navigate('/agencies')} className="px-6 py-3 bg-slate-200 text-slate-800 rounded-lg hover:bg-slate-300/80 font-semibold transition-all">
                  Hủy Bỏ
                </button>
                <button type="submit" disabled={isSubmitting} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 font-semibold transition-all shadow-md hover:shadow-lg shadow-blue-500/30 flex items-center gap-2">
                  {isSubmitting ? (
                    <> <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div> Đang xử lý... </>
                  ) : (
                    <> <CheckCircle className="h-5 w-5"/> Thêm Đại Lý </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AddAgencyPage;
