import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';

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
  };
  const confirmDelete = (id: string) => setDeleteId(id);
  const cancelDelete = () => setDeleteId(null);
  const handleDelete = () => {
    setAgencies(agencies.filter(a => a.id !== deleteId));
    setDeleteId(null);
  };

  return (
    <DashboardLayout>
      <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-blue-100">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-blue-800 drop-shadow uppercase tracking-wide">QUẢN LÝ ĐẠI LÝ</h1>
        </div>
        <div className="flex items-center gap-4 mb-6">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Tìm kiếm đại lý..."
            className="flex-1 px-5 py-3 border-2 border-blue-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 text-lg shadow-sm min-w-[220px] transition-all"
          />
          <Link
            to="/agencies/add"
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-colors font-bold text-lg shadow-md whitespace-nowrap"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Thêm đại lý
          </Link>
        </div>
        <div className="overflow-x-auto rounded-2xl shadow-xl border-2 border-blue-100 bg-white">
          <table className="min-w-full bg-white border border-blue-200">
            <thead className="bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700">
              <tr className="uppercase text-sm">
                <th className="py-3 px-4 text-left">Mã đại lý</th>
                <th className="py-3 px-4 text-left">Tên đại lý</th>
                <th className="py-3 px-4 text-left">Địa chỉ</th>
                <th className="py-3 px-4 text-left">Số điện thoại</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-100">
              {filteredAgencies.map((agency) => (
                <tr key={agency.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-semibold text-gray-900">{agency.code}</td>
                  <td className="px-4 py-3 text-gray-800">{agency.name}</td>
                  <td className="px-4 py-3 text-gray-800">{agency.address}</td>
                  <td className="px-4 py-3 text-gray-800">{agency.phone}</td>
                  <td className="px-4 py-3 text-gray-800">{agency.email}</td>
                  <td className="px-4 py-3 space-x-2">
                    <Link to={`/agencies/view/${agency.id}`} className="px-3 py-1 text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">Xem</Link>
                    <Link to={`/agencies/edit/${agency.id}`} className="px-3 py-1 text-xs font-bold text-green-600 hover:text-green-800 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">Sửa</Link>
                    {!agency.approved && (
                      <button onClick={() => openApproveModal(agency)} className="px-3 py-1 text-xs font-bold text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors">Phê duyệt</button>
                    )}
                    {agency.approved && (
                      <span className="px-3 py-1 text-xs font-bold text-green-700 bg-green-100 rounded-lg">Đã duyệt</span>
                    )}
                    <button onClick={() => confirmDelete(agency.id)} className="px-3 py-1 text-xs font-bold text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors">Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <h2 className="text-xl font-bold text-blue-800 mb-4">Phê duyệt đại lý</h2>
            <div className="mb-4">
              <div className="mb-2 font-semibold">Tên đại lý: <span className="text-blue-700">{selectedAgency?.name}</span></div>
              <div className="mb-2">Mã đại lý: <span className="font-medium">{selectedAgency?.code}</span></div>
              <div className="mb-2">Email: <span className="font-medium">{selectedAgency?.email}</span></div>
              <div className="mb-2">Số điện thoại: <span className="font-medium">{selectedAgency?.phone}</span></div>
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1">Mức công nợ tối đa (VNĐ)</label>
              <input type="number" min={0} value={maxDebt} onChange={e => setMaxDebt(e.target.value)} className="w-full px-4 py-2 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg" placeholder="Nhập mức công nợ tối đa" />
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={closeModal} className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold">Hủy</button>
              <button onClick={handleApprove} disabled={!maxDebt} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50">Phê duyệt & kích hoạt</button>
            </div>
          </div>
        </div>
      )}
      {deleteId && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <h2 className="text-xl font-bold text-red-700 mb-4">Xác nhận xóa đại lý</h2>
            <p className="mb-6">Bạn có chắc chắn muốn xóa đại lý này không? Thao tác này không thể hoàn tác.</p>
            <div className="flex gap-3 mt-6">
              <button onClick={cancelDelete} className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold">Hủy</button>
              <button onClick={handleDelete} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold">Xóa</button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default AgencyPage; 