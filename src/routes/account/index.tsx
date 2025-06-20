import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';

interface Account {
  id: string;
  username: string;
  fullName: string;
  email: string;
  role: 'Admin' | 'Staff' | 'Agency';
  status: 'Hoạt động' | 'Tạm khóa' | 'Ngừng hoạt động';
  createdDate: string;
  updatedDate: string;
  lastLogin?: string;
}

const AccountPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState<Account | null>(null);

  const [accounts, setAccounts] = useState<Account[]>([
    {
      id: '1',
      username: 'admin',
      fullName: 'Quản trị viên',
      email: 'admin@company.com',
      role: 'Admin',
      status: 'Hoạt động',
      createdDate: '2024-01-01',
      updatedDate: '2024-01-20',
      lastLogin: '2024-01-20'
    },
    {
      id: '2',
      username: 'staff01',
      fullName: 'Nguyễn Văn A',
      email: 'nvana@company.com',
      role: 'Staff',
      status: 'Hoạt động',
      createdDate: '2024-01-05',
      updatedDate: '2024-01-18',
      lastLogin: '2024-01-18'
    },
    {
      id: '3',
      username: 'agency01',
      fullName: 'Trần Thị B',
      email: 'qlb@company.com',
      role: 'Agency',
      status: 'Tạm khóa',
      createdDate: '2024-01-10',
      updatedDate: '2024-01-15'
    }
  ]);

  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = 
      account.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = selectedRole === 'all' || account.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || account.status === selectedStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleDeleteClick = (account: Account) => {
    setAccountToDelete(account);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (accountToDelete) {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Remove from local state
        setAccounts(accounts.filter(a => a.id !== accountToDelete.id));
        
        // Close modal and reset
        setShowDeleteModal(false);
        setAccountToDelete(null);
        
        alert(`Đã xóa tài khoản ${accountToDelete.username} thành công!`);
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Có lỗi xảy ra khi xóa tài khoản!');
      }
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setAccountToDelete(null);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin': return 'bg-red-100 text-red-800';
      case 'Staff': return 'bg-green-100 text-green-800';
      case 'Agency': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Hoạt động': return 'bg-green-100 text-green-800';
      case 'Tạm khóa': return 'bg-yellow-100 text-yellow-800';
      case 'Ngừng hoạt động': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout>
      <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-blue-100">
        <h1 className="text-3xl font-extrabold text-blue-800 mb-8 drop-shadow uppercase tracking-wide">
          QUẢN LÝ TÀI KHOẢN
        </h1>
        
        {/* Search and Filters */}
        <div className="flex flex-wrap gap-4 mb-8 justify-between items-center">
          <input
            type="text"
            placeholder="Tìm kiếm tài khoản..."
            className="flex-1 min-w-[220px] px-4 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-4 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg shadow-sm"
          >
            <option value="all">Tất cả vai trò</option>
            <option value="Admin">Admin</option>
            <option value="Staff">Staff</option>
            <option value="Agency">Agency</option>
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg shadow-sm"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="Hoạt động">Hoạt động</option>
            <option value="Tạm khóa">Tạm khóa</option>
            <option value="Ngừng hoạt động">Ngừng hoạt động</option>
          </select>
          <Link
            to="/account/add"
            className="flex items-center px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-bold text-lg shadow-lg whitespace-nowrap"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            <span className="hidden sm:inline">Thêm tài khoản</span>
            <span className="sm:hidden">Thêm</span>
          </Link>
        </div>

        <h2 className="text-2xl font-extrabold text-blue-800 mb-6 drop-shadow">Danh sách tài khoản</h2>
        
        {/* Accounts Table */}
        <div className="overflow-x-auto rounded-2xl shadow-xl border-2 border-blue-100 bg-white">
          <table className="min-w-full bg-white border border-blue-200">
            <thead className="bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700">
              <tr className="uppercase text-sm">
                <th className="py-3 px-4 text-left whitespace-nowrap min-w-[130px]">Tên Đăng Nhập</th>
                <th className="py-3 px-4 text-left whitespace-nowrap min-w-[150px]">Họ Tên</th>
                <th className="py-3 px-4 text-left whitespace-nowrap min-w-[180px] hidden lg:table-cell">Email</th>
                <th className="py-3 px-4 text-left whitespace-nowrap min-w-[100px]">Vai Trò</th>
                <th className="py-3 px-4 text-left whitespace-nowrap min-w-[120px]">Trạng Thái</th>
                <th className="py-3 px-4 text-left whitespace-nowrap min-w-[100px] hidden md:table-cell">Ngày Tạo</th>
                <th className="py-3 px-4 text-left whitespace-nowrap min-w-[130px] hidden xl:table-cell">Đăng Nhập Cuối</th>
                <th className="py-3 px-4 text-left whitespace-nowrap min-w-[120px]">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-100">
              {filteredAccounts.map((account) => (
                <tr key={account.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-semibold text-gray-900 whitespace-nowrap">{account.username}</td>
                  <td className="px-4 py-3 text-gray-800">
                    <div className="max-w-[150px] truncate" title={account.fullName}>
                      {account.fullName}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-800 hidden lg:table-cell">
                    <div className="max-w-[180px] truncate" title={account.email}>
                      {account.email}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold ${getRoleColor(account.role)}`}>
                      <span className="hidden sm:inline">{account.role}</span>
                      <span className="sm:hidden">{account.role === 'Admin' ? 'ADM' : account.role === 'Staff' ? 'ST' : 'AG'}</span>
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold ${getStatusColor(account.status)}`}>
                      <span className="hidden sm:inline">{account.status}</span>
                      <span className="sm:hidden">{account.status === 'Hoạt động' ? 'OK' : account.status === 'Tạm khóa' ? 'TK' : 'NG'}</span>
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-800 whitespace-nowrap hidden md:table-cell">{new Date(account.createdDate).toLocaleDateString('vi-VN')}</td>
                  <td className="px-4 py-3 text-gray-800 whitespace-nowrap hidden xl:table-cell">
                    {account.lastLogin ? new Date(account.lastLogin).toLocaleDateString('vi-VN') : 'Chưa đăng nhập'}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                      <Link
                        to={`/account/view/${account.id}`}
                        className="px-2 sm:px-3 py-1 text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-center whitespace-nowrap"
                      >
                        Xem
                      </Link>
                      <Link
                        to={`/account/edit/${account.id}`}
                        className="px-2 sm:px-3 py-1 text-xs font-bold text-green-600 hover:text-green-800 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-center whitespace-nowrap"
                      >
                        <span className="hidden sm:inline">Chỉnh sửa</span>
                        <span className="sm:hidden">Sửa</span>
                      </Link>
                      <button
                        onClick={() => handleDeleteClick(account)}
                        className="px-2 sm:px-3 py-1 text-xs font-bold text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 rounded-lg transition-colors whitespace-nowrap"
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAccounts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">Không tìm thấy tài khoản nào.</p>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Xác nhận xóa tài khoản</h3>
                <p className="text-gray-600 mb-6">
                  Bạn có chắc chắn muốn xóa tài khoản <strong>{accountToDelete?.username} - {accountToDelete?.fullName}</strong>?
                  <br />
                  <span className="text-sm text-red-600">Hành động này không thể hoàn tác.</span>
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={handleDeleteCancel}
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    onClick={handleDeleteConfirm}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
                  >
                    Xóa tài khoản
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AccountPage;