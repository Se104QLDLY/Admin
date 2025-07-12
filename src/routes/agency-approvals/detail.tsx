import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import agencyApprovalApi, { type PendingAgency, type ApprovalRequest, type RejectRequest } from '../../api/agency-approval.api';
import { useForm } from 'react-hook-form';
import { DashboardLayout } from '../../components/layout/DashboardLayout/DashboardLayout';

const AgencyApprovalDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [agency, setAgency] = useState<PendingAgency | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [showApprovalForm, setShowApprovalForm] = useState(false);
  const [showRejectForm, setShowRejectForm] = useState(false);

  // Forms
  const approvalForm = useForm<ApprovalRequest>();
  const rejectForm = useForm<RejectRequest>();

  useEffect(() => {
    if (id) {
      loadAgencyDetail(parseInt(id));
    }
  }, [id]);

  const loadAgencyDetail = async (agencyId: number) => {
    try {
      setLoading(true);
      setError(null);
      const agencyData = await agencyApprovalApi.getAgencyDetail(agencyId);
      setAgency(agencyData);
    } catch (err) {
      console.error('Error loading agency detail:', err);
      setError('Không thể tải thông tin hồ sơ');
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async (data: ApprovalRequest) => {
    if (!agency) return;

    try {
      setActionLoading(true);
      await agencyApprovalApi.approveAgency(agency.id, data);
      
      // Show success message and redirect
      alert('Đã duyệt hồ sơ thành công! Tài khoản đã được tạo cho đại lý.');
      navigate('/agency-approvals');
    } catch (err: any) {
      console.error('Error approving agency:', err);
      const errorMsg = err.response?.data?.error || 'Có lỗi xảy ra khi duyệt hồ sơ';
      alert(`Lỗi: ${errorMsg}`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async (data: RejectRequest) => {
    if (!agency) return;

    try {
      setActionLoading(true);
      await agencyApprovalApi.rejectAgency(agency.id, data);
      
      // Show success message and redirect
      alert('Đã từ chối hồ sơ thành công!');
      navigate('/agency-approvals');
    } catch (err: any) {
      console.error('Error rejecting agency:', err);
      const errorMsg = err.response?.data?.error || 'Có lỗi xảy ra khi từ chối hồ sơ';
      alert(`Lỗi: ${errorMsg}`);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-slate-200 rounded-full animate-spin border-t-blue-500"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-pulse border-t-indigo-300"></div>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-slate-800 mb-2">Đang tải thông tin hồ sơ</h3>
              <p className="text-slate-600">Vui lòng chờ trong giây lát...</p>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !agency) {
    return (
      <DashboardLayout>
        <div className="min-h-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
          <div className="text-center">
            <div className="mx-auto w-24 h-24 bg-gradient-to-br from-red-100 to-pink-100 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Không thể tải hồ sơ</h2>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">{error || 'Hồ sơ không tồn tại hoặc đã bị xóa'}</p>
            <Link
              to="/agency-approvals"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Quay lại danh sách
            </Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-full">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60 mb-6 rounded-2xl shadow-lg">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <Link
                  to="/agency-approvals"
                  className="inline-flex items-center px-4 py-2 bg-white/50 hover:bg-white/80 border border-slate-200 text-slate-700 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Quay lại danh sách
                </Link>
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                      Chi tiết hồ sơ đại lý
                    </h1>
                    <p className="text-slate-600 mt-1 font-medium">Mã hồ sơ: {agency.code}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-4 py-2 text-sm font-bold rounded-full border shadow-sm ${
                  agency.days_pending <= 1 ? 'bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 border-emerald-200' :
                  agency.days_pending <= 3 ? 'bg-gradient-to-r from-yellow-50 to-amber-50 text-amber-700 border-amber-200' :
                  agency.days_pending <= 7 ? 'bg-gradient-to-r from-orange-50 to-red-50 text-orange-700 border-orange-200' :
                  'bg-gradient-to-r from-red-50 to-pink-50 text-red-700 border-red-200'
                }`}>
                  Chờ duyệt {agency.days_pending} ngày
                </span>
              </div>
            </div>
          </div>
        </div>

      {/* Content */}
      <div className="px-2 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Agency Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Thông tin đại lý</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tên đại lý
                    </label>
                    <div className="text-lg font-semibold text-gray-900">{agency.name}</div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mã hồ sơ
                    </label>
                    <div className="text-lg font-mono text-blue-600">{agency.code}</div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Loại đại lý
                    </label>
                    <div className="text-gray-900">{agency.type}</div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Khu vực
                    </label>
                    <div className="text-gray-900">{agency.district}, {agency.city}</div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Số điện thoại
                    </label>
                    <div className="text-gray-900">{agency.phone}</div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <div className="text-gray-900">{agency.email}</div>
                  </div>

                  {agency.representative && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Người đại diện
                      </label>
                      <div className="text-gray-900">{agency.representative}</div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ngày đăng ký
                    </label>
                    <div className="text-gray-900">
                      {new Date(agency.registration_date).toLocaleDateString('vi-VN')}
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Địa chỉ
                    </label>
                    <div className="text-gray-900">{agency.address}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Thao tác</h2>
              </div>
              <div className="p-6 space-y-4">
                <button
                  onClick={() => setShowApprovalForm(true)}
                  disabled={actionLoading}
                  className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ✅ Duyệt hồ sơ
                </button>
                
                <button
                  onClick={() => setShowRejectForm(true)}
                  disabled={actionLoading}
                  className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ❌ Từ chối hồ sơ
                </button>

                <div className="pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-600">
                    <div className="mb-2">
                      <strong>Thời gian chờ:</strong> {agency.days_pending} ngày
                    </div>
                    <div>
                      <strong>Gửi lúc:</strong>{' '}
                      {new Date(agency.created_at).toLocaleString('vi-VN')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Approval Modal */}
      {showApprovalForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Duyệt hồ sơ đại lý</h3>
            </div>
            <form onSubmit={approvalForm.handleSubmit(handleApproval)} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tên đăng nhập <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...approvalForm.register('username', { required: 'Tên đăng nhập là bắt buộc' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nhập tên đăng nhập cho đại lý"
                  />
                  {approvalForm.formState.errors.username && (
                    <p className="text-red-500 text-sm mt-1">
                      {approvalForm.formState.errors.username.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mật khẩu <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    {...approvalForm.register('password', { 
                      required: 'Mật khẩu là bắt buộc',
                      minLength: { value: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự' }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nhập mật khẩu cho đại lý"
                  />
                  {approvalForm.formState.errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {approvalForm.formState.errors.password.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Họ tên đầy đủ
                  </label>
                  <input
                    type="text"
                    {...approvalForm.register('full_name')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Để trống để dùng tên đại lý"
                    defaultValue={agency.representative || agency.name}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowApprovalForm(false)}
                  disabled={actionLoading}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {actionLoading ? 'Đang xử lý...' : 'Duyệt hồ sơ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Từ chối hồ sơ đại lý</h3>
            </div>
            <form onSubmit={rejectForm.handleSubmit(handleReject)} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lý do từ chối <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...rejectForm.register('reason', { required: 'Lý do từ chối là bắt buộc' })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nhập lý do từ chối hồ sơ..."
                  />
                  {rejectForm.formState.errors.reason && (
                    <p className="text-red-500 text-sm mt-1">
                      {rejectForm.formState.errors.reason.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    {...rejectForm.register('send_email')}
                    defaultChecked={true}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    Gửi email thông báo cho đại lý
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowRejectForm(false)}
                  disabled={actionLoading}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {actionLoading ? 'Đang xử lý...' : 'Từ chối hồ sơ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </DashboardLayout>
  );
};

export default AgencyApprovalDetailPage; 