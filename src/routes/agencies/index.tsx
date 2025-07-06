import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Users, UserPlus, Search, CheckCircle, XCircle, AlertCircle, Trash2, Edit, Eye, BadgeCheck, Info, ShieldCheck } from 'lucide-react';
import { useToast } from '../../components/common/ToastContext';
import { getAgencies, deleteAgency } from '../../api/agency.api';
import type { AgencyItem } from '../../api/agency.api';
import { getStaffList } from '../../api/staff.api';
import type { StaffItem } from '../../api/staff.api';
import { assignAgencyToStaff, getStaffAssignments } from '../../api/staffAgency.api';

const AgencyPage: React.FC = () => {
  const [agencies, setAgencies] = useState<AgencyItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedAgencyForAssign, setSelectedAgencyForAssign] = useState<AgencyItem | null>(null);
  const [staffList, setStaffList] = useState<StaffItem[]>([]);
  const [selectedStaffId, setSelectedStaffId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<string|null>(null);
  const [search, setSearch] = useState('');
  const toast = useToast();
  const [agencyManagers, setAgencyManagers] = useState<Record<number, string[]>>({});

  // Fetch agencies, staff list, and assignments from backend
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [agList, staffItems, assignments] = await Promise.all([
          getAgencies(),
          getStaffList(),
          getStaffAssignments()
        ]);
        setAgencies(agList);
        setStaffList(staffItems);
        // Build name map and manager mapping
        const nameMap = Object.fromEntries(staffItems.map(s => [s.id, s.name]));
        const managerMap: Record<number, string[]> = {};
        assignments.forEach(a => {
          const name = nameMap[a.staff_id] || `Staff ${a.staff_id}`;
          if (!managerMap[a.agency]) managerMap[a.agency] = [];
          managerMap[a.agency].push(name);
        });
        setAgencyManagers(managerMap);
      } catch (error) {
        toast.show('Không thể tải dữ liệu đại lý', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Lọc danh sách theo từ khóa
  const filteredAgencies = agencies.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.code.toLowerCase().includes(search.toLowerCase()) ||
    a.address.toLowerCase().includes(search.toLowerCase()) ||
    a.phone.includes(search) ||
    a.email.toLowerCase().includes(search.toLowerCase())
  );

  const openAssignModal = (agency: AgencyItem) => {
    setSelectedAgencyForAssign(agency);
    setSelectedStaffId(null);
    // Load staff list from API
    getStaffList()
      .then(list => setStaffList(list))
      .catch(() => toast.show('Không thể tải danh sách nhân viên', 'error'));
    setShowAssignModal(true);
  };
  const closeAssignModal = () => {
    setShowAssignModal(false);
    setSelectedAgencyForAssign(null);
  };
  const handleAssign = async () => {
    if (!selectedStaffId || !selectedAgencyForAssign) {
      toast.show('Vui lòng chọn nhân viên', 'warning');
      return;
    }
    try {
      await assignAgencyToStaff(selectedAgencyForAssign.id, selectedStaffId);
      toast.show(`Đã gán đại lý ${selectedAgencyForAssign.name} cho nhân viên thành công!`, 'success');
      closeAssignModal();
    } catch {
      toast.show('Không thể gán đại lý', 'error');
    }
  };
  const confirmDelete = (id: string) => setDeleteId(id);
  const cancelDelete = () => setDeleteId(null);
  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteAgency(Number(deleteId));
      setAgencies(prev => prev.filter(a => a.id !== deleteId));
      toast.show('Xóa đại lý thành công!', 'success');
    } catch {
      toast.show('Không thể xóa đại lý', 'error');
    } finally {
      setDeleteId(null);
    }
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
                  <th className="py-3 px-4 text-left">Nhân viên quản lý</th>
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
                    <td className="px-4 py-3 text-gray-800">{agencyManagers[agency.id]?.join(', ') || '-'}</td>
                    <td className="px-4 py-3 flex gap-2">
                      <Link to={`/agencies/view/${agency.id}`} className="p-2 rounded-full bg-blue-50 hover:bg-blue-200 text-blue-600 hover:text-blue-900 transition-colors" title="Xem">
                        <Eye className="h-5 w-5" />
                      </Link>
                      <Link to={`/agencies/edit/${agency.id}`} className="p-2 rounded-full bg-green-50 hover:bg-green-200 text-green-600 hover:text-green-900 transition-colors" title="Sửa">
                        <Edit className="h-5 w-5" />
                      </Link>
                      <button onClick={() => openAssignModal(agency)} className="p-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white transition-colors" title="Gán đại lý cho nhân viên">
                        <UserPlus className="h-5 w-5" />
                      </button>
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

        {/* Assign Agency Modal */}
        {showAssignModal && (
          <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
              <h3 className="text-lg font-bold mb-4">Gán đại lý cho nhân viên</h3>
              <div className="mb-4">
                <label className="block font-semibold mb-2">Chọn nhân viên:</label>
                <select
                  value={selectedStaffId ?? ''}
                  onChange={e => setSelectedStaffId(Number(e.target.value))}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl"
                >
                  <option value="">-- Chọn nhân viên --</option>
                  {staffList.map(staff => (
                    <option key={staff.id} value={staff.id}>{staff.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3 justify-end">
                <button onClick={closeAssignModal} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">Hủy</button>
                <button onClick={handleAssign} className="px-4 py-2 bg-orange-500 text-white rounded-lg">Gán</button>
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