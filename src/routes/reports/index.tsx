import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, FileText, FileSpreadsheet, FilePlus2, Users, TrendingUp, TrendingDown, CheckCircle, AlertCircle, Clock, User, Eye } from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout/DashboardLayout';
import { getMonthlySales, getDebtReport } from '../../api/dashboard.api';
import { getReports } from '../../api/report.api';
import type { MonthlySalesItem, DebtReportItem } from '../../api/dashboard.api';
import type { ReportListItem } from '../../api/report.api';

interface Report {
  id: string;
  title: string;
  type: 'Doanh thu' | 'Tồn kho' | 'Công nợ' | 'Hoạt động';
  period: string;
  status: 'Hoàn thành' | 'Đang xử lý' | 'Lỗi';
  creator: string;
  createdDate: string;
  updatedDate: string;
  description?: string;
  amount?: number;
}

const formatCurrency = (amount: number) => new Intl.NumberFormat('vi-VN').format(amount) + ' VND';

const getTypeBadge = (type: string) => {
  switch (type) {
    case 'Doanh thu':
      return <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-lg"><TrendingUp className="h-4 w-4"/>Doanh thu</span>;
    case 'Công nợ':
      return <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-800 text-sm font-semibold rounded-lg"><TrendingDown className="h-4 w-4"/>Công nợ</span>;
    case 'Tồn kho':
      return <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-lg"><BarChart className="h-4 w-4"/>Tồn kho</span>;
    case 'Hoạt động':
      return <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 text-sm font-semibold rounded-lg"><Users className="h-4 w-4"/>Hoạt động</span>;
    default:
      return null;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Hoàn thành':
      return <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-lg"><CheckCircle className="h-4 w-4"/>Hoàn thành</span>;
    case 'Đang xử lý':
      return <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-semibold rounded-lg"><Clock className="h-4 w-4"/>Đang xử lý</span>;
    case 'Lỗi':
      return <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-800 text-sm font-semibold rounded-lg"><AlertCircle className="h-4 w-4"/>Lỗi</span>;
    default:
      return null;
  }
};

const AdminReportsPage: React.FC = () => {
  const [monthlySales, setMonthlySales] = useState<MonthlySalesItem[]>([]);
  const [debtData, setDebtData] = useState<DebtReportItem[]>([]);
  const [reports, setReports] = useState<ReportListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [sales, debts, reportsData] = await Promise.all([
          getMonthlySales(),
          getDebtReport(),
          getReports()
        ]);
        setMonthlySales(sales);
        setDebtData(debts);
        setReports(reportsData);
      } catch (err) {
        console.error('Error loading report data:', err);
        setError('Lỗi khi tải dữ liệu báo cáo');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center"><p>Đang tải báo cáo...</p></div>
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

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-blue-100 mb-8 flex flex-col gap-2 items-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-2 shadow-lg">
            <FileText className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-1 drop-shadow uppercase tracking-wide">LẬP BÁO CÁO</h1>
          <p className="text-gray-600 text-lg text-center max-w-2xl">Tổng hợp, thống kê và quản lý các báo cáo doanh thu, tồn kho, công nợ và hoạt động của đại lý.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg p-6 border-2 border-green-100 flex flex-col items-center">
            <TrendingUp className="h-8 w-8 text-blue-600 mb-2"/>
            <h3 className="text-gray-700 font-semibold mb-1">Tổng doanh thu</h3>
            <p className="text-2xl font-extrabold text-blue-700">
              {monthlySales.length
                ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(monthlySales[monthlySales.length - 1].amount)
                : '-'}
            </p>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl shadow-lg p-6 border-2 border-red-100 flex flex-col items-center">
            <TrendingDown className="h-8 w-8 text-red-600 mb-2"/>
            <h3 className="text-gray-700 font-semibold mb-1">Tổng công nợ</h3>
            <p className="text-2xl font-extrabold text-red-600">
              {debtData.length
                ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(debtData.reduce((sum, d) => sum + d.total_debt, 0))
                : '-'}
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-lg p-6 border-2 border-blue-100 flex flex-col items-center">
            <FileText className="h-8 w-8 text-blue-600 mb-2"/>
            <h3 className="text-gray-700 font-semibold mb-1">Số lượng báo cáo</h3>
            <p className="text-2xl font-extrabold text-blue-800">{monthlySales.length}</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold text-blue-800 drop-shadow flex items-center gap-2"><FileSpreadsheet className="h-6 w-6 text-blue-600"/>Danh sách báo cáo</h2>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => alert('Chức năng đang phát triển')} 
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-bold text-base shadow-md"
            >
              <FileSpreadsheet className="h-5 w-5 mr-2" />
              Xuất Excel
            </button>
            <button 
              onClick={() => alert('Chức năng đang phát triển')} 
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-bold text-base shadow-md"
            >
              <FileText className="h-5 w-5 mr-2" />
              Xuất PDF
            </button>
            <Link 
              to="/reports/add" 
              className="flex items-center px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-bold text-lg shadow-lg whitespace-nowrap"
            >
              <FilePlus2 className="h-6 w-6 mr-2" />
              Lập báo cáo
            </Link>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-blue-100">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Mã báo cáo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Loại</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Ngày báo cáo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Người tạo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Ngày tạo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Thao tác</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reports.map((report) => (
                  <tr key={report.report_id} className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-900">{report.report_id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.report_type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.report_date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.created_by_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.created_at}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link to={`/reports/view/${report.report_id}`} className="text-blue-600 hover:text-blue-900">Xem chi tiết</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          {/* Hàng 1: Doanh số */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-blue-100">
            <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2"><TrendingUp className="h-5 w-5 text-blue-600"/>Danh sách đại lý có doanh số cao nhất</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border-collapse">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="py-2 px-4 text-left text-blue-700 font-semibold">MÃ ĐẠI LÝ</th>
                    <th className="py-2 px-4 text-left text-blue-700 font-semibold">TÊN ĐẠI LÝ</th>
                    <th className="py-2 px-4 text-right text-blue-700 font-semibold">DOANH SỐ</th>
                  </tr>
                </thead>
                <tbody>
                  {debtData.slice(0,5).map(d => (
                    <tr key={d.agency_id} className="border-b last:border-0">
                      <td className="py-2 px-4 font-bold text-blue-900 whitespace-nowrap">{d.agency_id}</td>
                      <td className="py-2 px-4 text-gray-800 whitespace-nowrap">{d.agency_name}</td>
                      <td className="py-2 px-4 text-right font-semibold text-blue-700 whitespace-nowrap">{d.total_debt.toLocaleString('vi-VN')} đ</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Hàng 2: Công nợ */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-blue-100">
            <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2"><TrendingDown className="h-5 w-5 text-red-600"/>Danh sách đại lý có công nợ cao nhất</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border-collapse">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="py-2 px-4 text-left text-blue-700 font-semibold">MÃ ĐẠI LÝ</th>
                    <th className="py-2 px-4 text-left text-blue-700 font-semibold">TÊN ĐẠI LÝ</th>
                    <th className="py-2 px-4 text-right text-blue-700 font-semibold">SỐ TIỀN CÔNG NỢ</th>
                  </tr>
                </thead>
                <tbody>
                  {debtData.slice(0,5).map(d => (
                    <tr key={d.agency_id} className="border-b last:border-0">
                      <td className="py-2 px-4 font-bold text-blue-900 whitespace-nowrap">{d.agency_id}</td>
                      <td className="py-2 px-4 text-gray-800 whitespace-nowrap">{d.agency_name}</td>
                      <td className="py-2 px-4 text-right font-semibold text-blue-700 whitespace-nowrap">{d.total_debt.toLocaleString('vi-VN')} đ</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminReportsPage;