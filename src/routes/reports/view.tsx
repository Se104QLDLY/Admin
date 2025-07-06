import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getReportDetail } from '../../api/report.api';
import type { ReportDetailItem } from '../../api/report.api';
import { DashboardLayout } from '../../components/layout/DashboardLayout/DashboardLayout';
import { FileText, User, Calendar, BadgeCheck, Layers, ArrowLeft, DollarSign, Info, ClipboardList, CheckCircle, AlertCircle } from 'lucide-react';

const ReportView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [reportData, setReportData] = useState<ReportDetailItem | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getReportDetail(id)
      .then(data => setReportData(data))
      .catch(() => setError('Lỗi khi tải chi tiết báo cáo'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center"><p>Đang tải chi tiết báo cáo...</p></div>
      </DashboardLayout>
    );
  }
  if (error) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center"><p className="text-red-500">{error}</p></div>
      </DashboardLayout>
    );
  }
  if (!reportData) {
    return null;
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' VND';
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'Doanh thu':
        return <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-lg"><DollarSign className="h-4 w-4"/>Doanh thu</span>;
      case 'Công nợ':
        return <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-800 text-sm font-semibold rounded-lg"><AlertCircle className="h-4 w-4"/>Công nợ</span>;
      case 'Tồn kho':
        return <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-lg"><Layers className="h-4 w-4"/>Tồn kho</span>;
      case 'Hoạt động':
        return <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 text-sm font-semibold rounded-lg"><ClipboardList className="h-4 w-4"/>Hoạt động</span>;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-blue-100 mb-8 flex flex-col gap-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <FileText className="h-10 w-10 text-blue-600" />
                <h1 className="text-3xl font-extrabold text-gray-900 drop-shadow uppercase tracking-wide">Chi tiết báo cáo</h1>
              </div>
              <Link
                to="/reports"
                className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all font-semibold shadow-md"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Quay lại
              </Link>
            </div>
            <div className="flex flex-wrap gap-3 items-center">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full border border-blue-200">
                <BadgeCheck className="h-4 w-4" />
                Mã: {reportData.id}
              </span>
              {getTypeBadge(reportData.type)}
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-semibold rounded-full border border-emerald-200">
                <CheckCircle className="h-4 w-4" />
                {reportData.status}
              </span>
            </div>
          </div>

          {/* Thông tin cơ bản */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100 mb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-blue-500" />
                <span className="font-semibold text-gray-700">Người tạo:</span>
                <span className="text-gray-900 font-bold">{reportData.created_by_name}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-blue-500" />
                <span className="font-semibold text-gray-700">Ngày tạo:</span>
                <span className="text-gray-900 font-bold">{new Date(reportData.created_at).toLocaleString('vi-VN')}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-blue-500" />
                <span className="font-semibold text-gray-700">Ngày báo cáo:</span>
                <span className="text-gray-900 font-bold">{reportData.report_date}</span>
              </div>
              <div className="flex items-center gap-3">
                <Info className="h-5 w-5 text-blue-500" />
                <span className="font-semibold text-gray-700">Kỳ báo cáo:</span>
                <span className="text-gray-900 font-bold">{reportData.period}</span>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <DollarSign className="h-5 w-5 text-green-500" />
                <span className="font-semibold text-gray-700">Số tiền:</span>
                <span className="text-2xl font-extrabold text-green-700">{formatCurrency(reportData.amount)}</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-emerald-500" />
                <span className="font-semibold text-gray-700">Trạng thái:</span>
                <span className="text-emerald-700 font-bold">{reportData.status}</span>
              </div>
            </div>
          </div>

          {/* Mô tả báo cáo */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100 mb-8">
            <h2 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2"><Info className="h-5 w-5 text-blue-500"/>Mô tả báo cáo</h2>
            <p className="text-gray-700 text-lg leading-relaxed">{reportData.description}</p>
          </div>

          {/* Chi tiết báo cáo */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100 mb-8">
            <h2 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2"><ClipboardList className="h-5 w-5 text-blue-500"/>Chi tiết báo cáo</h2>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 overflow-x-auto">
              <pre className="text-gray-700 whitespace-pre-wrap font-mono text-base leading-relaxed">
                {JSON.stringify(reportData.data, null, 2)}
              </pre>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mt-6 justify-end">
            <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-md flex items-center gap-2">
              <FileText className="h-5 w-5" /> Xuất PDF
            </button>
            <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors shadow-md flex items-center gap-2">
              <Layers className="h-5 w-5" /> Xuất Excel
            </button>
            <button className="px-6 py-3 bg-orange-600 text-white font-semibold rounded-xl hover:bg-orange-700 transition-colors shadow-md flex items-center gap-2">
              <CheckCircle className="h-5 w-5" /> In báo cáo
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ReportView;
