import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout/DashboardLayout';
import { 
  Users, 
  UserPlus, 
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  XCircle,
  Shield,
  Crown,
  User,
  Calendar,
  Clock
} from 'lucide-react';

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
      case 'Admin': return 'bg-gradient-to-r from-red-50 to-pink-50 text-red-700 border border-red-200';
      case 'Staff': return 'bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 border border-emerald-200';
      case 'Agency': return 'bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 border border-blue-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Admin': return <Crown className="h-4 w-4" />;
      case 'Staff': return <User className="h-4 w-4" />;
      case 'Agency': return <Shield className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Hoạt động': return 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-200';
      case 'Tạm khóa': return 'bg-gradient-to-r from-yellow-50 to-amber-50 text-yellow-700 border border-yellow-200';
      case 'Ngừng hoạt động': return 'bg-gradient-to-r from-red-50 to-pink-50 text-red-700 border border-red-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Hoạt động': return <CheckCircle className="h-4 w-4" />;
      case 'Tạm khóa': return <AlertCircle className="h-4 w-4" />;
      case 'Ngừng hoạt động': return <XCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6" style={{ overflow: 'visible' }}>
        {/* Header Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-blue-200 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-400/20 to-cyan-400/20 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl mb-4 shadow-xl">
              <Users className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-2">
              QUẢN LÝ TÀI KHOẢN
            </h1>
            <p className="text-gray-600 text-lg max-w-3xl leading-relaxed">
              Quản lý tài khoản người dùng, phân quyền và theo dõi hoạt động với giao diện hiện đại và trực quan.
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-blue-200 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm tài khoản..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="all">Tất cả vai trò</option>
                <option value="Admin">Admin</option>
                <option value="Staff">Staff</option>
                <option value="Agency">Agency</option>
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="Hoạt động">Hoạt động</option>
                <option value="Tạm khóa">Tạm khóa</option>
                <option value="Ngừng hoạt động">Ngừng hoạt động</option>
              </select>
            </div>
            <Link
              to="/account/add"
              className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:from-blue-700 hover:to-cyan-600 transition-all duration-200 font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <UserPlus className="h-6 w-6 mr-2" />
              Tạo tài khoản mới
            </Link>
          </div>
        </div>

        {/* Accounts Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-200 mb-8">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <Users className="h-7 w-7 text-blue-600" />
              Danh sách tài khoản
              <span className="text-sm font-normal text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {filteredAccounts.length} tài khoản
              </span>
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-blue-50 to-cyan-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Tên đăng nhập</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Họ tên</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider hidden lg:table-cell">Email</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Vai trò</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Trạng thái</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider hidden md:table-cell">Ngày tạo</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider hidden xl:table-cell">Đăng nhập cuối</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Thao tác</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredAccounts.map((account) => (
                  <tr key={account.id} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 transition-all duration-200 group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm font-bold rounded-full">
                        {account.username}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <div className="max-w-[150px] truncate" title={account.fullName}>
                        {account.fullName}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 hidden lg:table-cell">
                      <div className="max-w-[180px] truncate" title={account.email}>
                        {account.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold shadow-sm ${getRoleColor(account.role)}`}>
                        {getRoleIcon(account.role)}
                        {account.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold shadow-sm ${getStatusColor(account.status)}`}>
                        {getStatusIcon(account.status)}
                        {account.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden md:table-cell">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-gray-400" />
                        {account.createdDate}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden xl:table-cell">
                      {account.lastLogin ? (
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-gray-400" />
                          {account.lastLogin}
                        </div>
                      ) : (
                        <span className="text-gray-400">Chưa đăng nhập</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/account/view/${account.id}`}
                          className="text-blue-600 hover:text-blue-900 flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-all duration-200"
                        >
                          <Eye className="h-4 w-4" />
                          Xem
                        </Link>
                        <Link
                          to={`/account/edit/${account.id}`}
                          className="text-blue-600 hover:text-blue-900 flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-all duration-200"
                        >
                          <Edit className="h-4 w-4" />
                          Sửa
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(account)}
                          className="text-red-600 hover:text-red-900 flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-all duration-200"
                        >
                          <Trash2 className="h-4 w-4" />
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredAccounts.length === 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-blue-200">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <Users className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Không tìm thấy tài khoản</h3>
            <p className="text-gray-600 mb-6">Không có tài khoản nào phù hợp với tìm kiếm của bạn.</p>
            <Link
              to="/account/add"
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-colors"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Tạo tài khoản đầu tiên
            </Link>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl border border-red-100">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-red-100 to-pink-100 mb-6">
                  <Trash2 className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Xác nhận xóa tài khoản</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Bạn có chắc chắn muốn xóa tài khoản <strong className="text-red-600">{accountToDelete?.username} - {accountToDelete?.fullName}</strong>?
                  <br />
                  <span className="text-sm text-red-500 font-medium">Hành động này không thể hoàn tác.</span>
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={handleDeleteCancel}
                    className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 font-semibold"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    onClick={handleDeleteConfirm}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-200 font-semibold shadow-lg"
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