import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Users, UserPlus, Search, CheckCircle, XCircle, AlertCircle, Trash2, Edit, Eye, BadgeCheck, Info, ShieldCheck } from 'lucide-react';
import { useToast } from '../../components/common/ToastContext';

const mockAgencies = [
  { id: '1', name: 'Đại lý Minh Anh', code: 'DL001', address: '123 Nguyễn Văn Linh, Q.7, TP.HCM', phone: '0901234567', email: 'minhanh@example.com', approved: false, maxDebt: null },
  { id: '2', name: 'Đại lý Thành Công', code: 'DL002', address: '456 Lê Lợi, Q.1, TP.HCM', phone: '0902345678', email: 'thanhcong@example.com', approved: true, maxDebt: 20000000 },
  { id: '3', name: 'Đại lý Hồng Phúc', code: 'DL003', address: '789 Trần Hưng Đạo, Q.5, TP.HCM', phone: '0903456789', email: 'hongphuc@example.com', approved: false, maxDebt: null },
];

const AgencyPage: React.FC = () => {
  const [agencies, setAgencies] = useState(mockAgencies);
  const [showModal, setShowModal] = useState(false);
  const [selectedAgency, setSelectedAgency] = useState<any>(null);
  const [maxDebt, setMaxDebt] = useState('');
  const [deleteId, setDeleteId] = useState<string|null>(null);
  const [search, setSearch] = useState('');
  const toast = useToast();

  // Lọc danh sách theo từ khóa
  const filteredAgencies = agencies.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.code.toLowerCase().includes(search.toLowerCase()) ||
    a.address.toLowerCase().includes(search.toLowerCase()) ||
    a.phone.includes(search) ||
    a.email.toLowerCase().includes(search.toLowerCase())
  );

  const openApproveModal = (agency: any) => {
    setSelectedAgency(agency);
    setMaxDebt('');
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setSelectedAgency(null);
    setMaxDebt('');
  };
  const handleApprove = () => {
    setAgencies(agencies.map(a => a.id === selectedAgency.id ? { ...a, approved: true, maxDebt: Number(maxDebt) } : a));
    closeModal();
    toast.show('Phê duyệt đại lý thành công!', 'success');
  };
  const confirmDelete = (id: string) => setDeleteId(id);
  const cancelDelete = () => setDeleteId(null);
  const handleDelete = () => {
    setAgencies(agencies.filter(a => a.id !== deleteId));
    setDeleteId(null);
    toast.show('Xóa đại lý thành công!', 'success');
  };

  // Thống kê
  const total = agencies.length;
  const approved = agencies.filter(a => a.approved).length;
  const notApproved = total - approved;

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
        {/* Header */}
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold text-gray-900 drop-shadow uppercase tracking-wide">Quản lý đại lý</h1>
                <p className="text-gray-600 text-base mt-1">Theo dõi, phê duyệt và quản lý thông tin các đại lý trong hệ thống.</p>
              </div>
            </div>
            <Link
              to="/agencies/add"
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-colors font-bold text-lg shadow-md whitespace-nowrap"
            >
              <UserPlus className="h-6 w-6" />
              Thêm đại lý
            </Link>
          </div>

          {/* Thống kê */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-lg p-6 border-2 border-blue-100 flex flex-col items-center">
              <Users className="h-8 w-8 text-blue-600 mb-2" />
              <div className="text-gray-700 font-semibold mb-1">Tổng số đại lý</div>
              <div className="text-2xl font-extrabold text-blue-700">{total}</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg p-6 border-2 border-green-100 flex flex-col items-center">
              <CheckCircle className="h-8 w-8 text-green-600 mb-2" />
              <div className="text-gray-700 font-semibold mb-1">Đã duyệt</div>
              <div className="text-2xl font-extrabold text-green-700">{approved}</div>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl shadow-lg p-6 border-2 border-red-100 flex flex-col items-center">
              <AlertCircle className="h-8 w-8 text-red-600 mb-2" />
              <div className="text-gray-700 font-semibold mb-1">Chưa duyệt</div>
              <div className="text-2xl font-extrabold text-red-600">{notApproved}</div>
            </div>
          </div>

          {/* Tìm kiếm */}
          <div className="bg-white rounded-2xl shadow-lg p-4 border-2 border-blue-100 flex flex-col sm:flex-row items-center gap-4 mb-6">
            <div className="flex items-center w-full sm:w-1/2 bg-blue-50 rounded-xl px-4 py-2 border border-blue-100">
              <Search className="h-5 w-5 text-blue-400 mr-2" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Tìm kiếm đại lý..."
                className="flex-1 bg-transparent outline-none text-lg text-blue-900"
              />
            </div>
          </div>

          {/* Bảng đại lý */}
          <div className="overflow-x-auto rounded-2xl shadow-xl border-2 border-blue-100 bg-white">
            <table className="min-w-full bg-white border border-blue-200">
              <thead className="bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700">
                <tr className="uppercase text-sm">
                  <th className="py-3 px-4 text-left">#</th>
                  <th className="py-3 px-4 text-left">Mã đại lý</th>
                  <th className="py-3 px-4 text-left">Tên đại lý</th>
                  <th className="py-3 px-4 text-left">Địa chỉ</th>
                  <th className="py-3 px-4 text-left">Số điện thoại</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Trạng thái</th>
                  <th className="py-3 px-4 text-left">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-100">
                {filteredAgencies.map((agency, idx) => (
                  <tr key={agency.id} className="hover:bg-blue-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-200 to-blue-400 flex items-center justify-center text-white font-bold text-lg shadow">
                        <Users className="h-5 w-5" />
                      </div>
                    </td>
                    <td className="px-4 py-3 font-semibold text-blue-900">{agency.code}</td>
                    <td className="px-4 py-3 text-gray-800">{agency.name}</td>
                    <td className="px-4 py-3 text-gray-800">{agency.address}</td>
                    <td className="px-4 py-3 text-gray-800">{agency.phone}</td>
                    <td className="px-4 py-3 text-gray-800">{agency.email}</td>
                    <td className="px-4 py-3">
                      {agency.approved ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full"><BadgeCheck className="h-4 w-4"/>Đã duyệt</span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-800 text-xs font-semibold rounded-full"><AlertCircle className="h-4 w-4"/>Chưa duyệt</span>
                      )}
                    </td>
                    <td className="px-4 py-3 flex gap-2">
                      <Link to={`/agencies/view/${agency.id}`} className="p-2 rounded-full bg-blue-50 hover:bg-blue-200 text-blue-600 hover:text-blue-900 transition-colors" title="Xem">
                        <Eye className="h-5 w-5" />
                      </Link>
                      <Link to={`/agencies/edit/${agency.id}`} className="p-2 rounded-full bg-green-50 hover:bg-green-200 text-green-600 hover:text-green-900 transition-colors" title="Sửa">
                        <Edit className="h-5 w-5" />
                      </Link>
                      {!agency.approved && (
                        <button onClick={() => openApproveModal(agency)} className="p-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white transition-colors" title="Phê duyệt">
                          <CheckCircle className="h-5 w-5" />
                        </button>
                      )}
                      <button onClick={() => confirmDelete(agency.id)} className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors" title="Xóa">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal phê duyệt */}
        {showModal && (
          <div className="fixed inset-0 bg-gradient-to-br from-blue-100/80 via-cyan-100/80 to-blue-200/80 flex items-center justify-center z-50 animate-fade-in" onClick={closeModal}>
            <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl border-2 border-blue-200 relative animate-scale-in" onClick={e => e.stopPropagation()}>
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="h-9 w-9 text-blue-500 animate-bounce-slow" />
                <h2 className="text-2xl font-bold text-blue-800 tracking-wide">Phê duyệt đại lý</h2>
              </div>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-blue-700 font-semibold">
                  <Users className="h-5 w-5" /> {selectedAgency?.name}
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <BadgeCheck className="h-5 w-5 text-blue-400" /> Mã: <span className="font-bold">{selectedAgency?.code}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Info className="h-5 w-5 text-blue-400" /> Email: <span className="font-medium">{selectedAgency?.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Info className="h-5 w-5 text-blue-400" /> SĐT: <span className="font-medium">{selectedAgency?.phone}</span>
                </div>
              </div>
              <div className="mb-6">
                <label className="block font-semibold mb-2 text-blue-700">Mức công nợ tối đa (VNĐ)</label>
                <input type="number" min={0} value={maxDebt} onChange={e => setMaxDebt(e.target.value)} className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg transition-all shadow-sm" placeholder="Nhập mức công nợ tối đa" />
              </div>
              <div className="flex gap-3 mt-8">
                <button onClick={closeModal} className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold flex items-center justify-center gap-2 shadow-md">
                  <XCircle className="h-5 w-5" /> Hủy
                </button>
                <button onClick={handleApprove} disabled={!maxDebt} className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-500 text-white rounded-lg hover:from-blue-700 hover:to-indigo-600 transition-all font-bold flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 animate-pulse-on-hover" style={{transition: 'transform 0.15s'}}>
                  <CheckCircle className="h-5 w-5 animate-bounce" /> Phê duyệt & kích hoạt
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Modal xóa */}
        {deleteId && (
          <div className="fixed inset-0 bg-gradient-to-br from-blue-100/80 via-cyan-100/80 to-blue-200/80 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl border-2 border-red-100">
              <div className="flex items-center gap-3 mb-4">
                <Trash2 className="h-7 w-7 text-red-600" />
                <h2 className="text-xl font-bold text-red-700">Xác nhận xóa đại lý</h2>
              </div>
              <p className="mb-6">Bạn có chắc chắn muốn xóa đại lý này không? Thao tác này không thể hoàn tác.</p>
              <div className="flex gap-3 mt-6">
                <button onClick={cancelDelete} className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold">Hủy</button>
                <button onClick={handleDelete} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold">Xóa</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AgencyPage; 