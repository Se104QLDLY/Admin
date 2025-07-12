import React, { useState, useEffect } from 'react';
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
  UserCheck,
  Building,
} from 'lucide-react';
import { getUsers, deleteUser } from '../../api/user.api';
import agencyAssignmentApi, { 
  type UnassignedAgent, 
  type AgencyAssignmentRequest,
  type AgencyType,
  type District 
} from '../../api/agency-assignment.api';
import { useForm } from 'react-hook-form';

interface Account {
  id: string;
  username: string;
  fullName: string;
  email: string;
  role: 'Admin' | 'Staff' | 'Agency';
  status: 'Hoạt động' | 'Tạm khóa' | 'Ngừng hoạt động';
  createdDate: string;
  updatedDate: string;
}

const AccountPage: React.FC = () => {
  // Tab state
  const [activeTab, setActiveTab] = useState<'accounts' | 'assignments'>('accounts');
  
  // Account management states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState<Account | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Agency assignment states
  const [unassignedAgents, setUnassignedAgents] = useState<UnassignedAgent[]>([]);
  const [agencyTypes, setAgencyTypes] = useState<AgencyType[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [assignmentLoading, setAssignmentLoading] = useState(false);
  const [assignmentError, setAssignmentError] = useState<string | null>(null);
  const [agentSearchTerm, setAgentSearchTerm] = useState('');
  const [showAssignForm, setShowAssignForm] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<UnassignedAgent | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const assignForm = useForm<AgencyAssignmentRequest>();

  // Fetch accounts from API
  useEffect(() => {
    if (activeTab === 'accounts') {
      const fetchAccounts = async () => {
        setLoading(true);
        try {
          const data = await getUsers();
          const mapped: Account[] = data.map(u => ({
            id: u.user_id.toString(),
            username: u.username || '',
            fullName: u.full_name || '',
            email: u.email || '',
            role: u.account_role === 'admin' ? 'Admin' : u.account_role === 'staff' ? 'Staff' : 'Agency',
            status: 'Hoạt động' as const,
            createdDate: u.created_at,
            updatedDate: u.updated_at,
          }));
          setAccounts(mapped);
        } catch (err) {
          console.error('Error fetching accounts:', err);
          setError('Lỗi khi tải danh sách tài khoản');
        } finally {
          setLoading(false);
        }
      };
      fetchAccounts();
    }
  }, [activeTab]);

  // Load assignment data when switching to assignments tab
  useEffect(() => {
    if (activeTab === 'assignments') {
      const loadAssignmentData = async () => {
        setAssignmentLoading(true);
        try {
          setAssignmentError(null);
          
          console.log('Loading assignment data...');
          
          const [agentsResponse, typesResponse, districtsResponse] = await Promise.all([
            agencyAssignmentApi.getUnassignedAgents(),
            agencyAssignmentApi.getAgencyTypes(),
            agencyAssignmentApi.getDistricts()
          ]);
          
          console.log('Agents response:', agentsResponse);
          console.log('Number of unassigned agents:', agentsResponse.results.length);
          
          setUnassignedAgents(agentsResponse.results);
          setAgencyTypes(typesResponse);
          setDistricts(districtsResponse);
        } catch (err) {
          console.error('Error loading assignment data:', err);
          setAssignmentError('Không thể tải dữ liệu cấp hồ sơ');
        } finally {
          setAssignmentLoading(false);
        }
      };
      loadAssignmentData();
    }
  }, [activeTab]);

  // Load unassigned agents count on component mount for tab display
  useEffect(() => {
    const loadAgentsCount = async () => {
      try {
        const agentsResponse = await agencyAssignmentApi.getUnassignedAgents();
        setUnassignedAgents(agentsResponse.results);
      } catch (err) {
        console.error('Error loading agents count:', err);
      }
    };
    loadAgentsCount();
  }, []);

  // Calculate assigned accounts (admin, staff, and agents with agencies)
  const assignedAccounts = accounts.filter(account => {
    // Only show agents that have agencies (not in unassigned list)
    const isAssignedAgent = account.role === 'Agency' ? 
      !unassignedAgents.some(unassigned => unassigned.user_id.toString() === account.id) : 
      true; // Show all non-agent accounts (admin, staff)
    
    return isAssignedAgent;
  });

  // Filter accounts based on search and filter criteria
  const filteredAccounts = assignedAccounts.filter(account => {
    const matchesSearch = 
      account.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = selectedRole === 'all' || account.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || account.status === selectedStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const filteredAgents = unassignedAgents.filter(agent =>
    agent.full_name.toLowerCase().includes(agentSearchTerm.toLowerCase()) ||
    agent.username.toLowerCase().includes(agentSearchTerm.toLowerCase()) ||
    agent.email.toLowerCase().includes(agentSearchTerm.toLowerCase())
  );

  const handleAssignClick = (agent: UnassignedAgent) => {
    setSelectedAgent(agent);
    // Pre-fill form with agent data
    assignForm.reset({
      user_id: agent.user_id,
      agency_name: `Đại lý ${agent.full_name}`,
      phone_number: agent.phone_number || '',
      address: agent.address || '',
      email: agent.email,
      representative: agent.full_name
    });
    setShowAssignForm(true);
  };

  const handleFormSubmit = async (data: AgencyAssignmentRequest) => {
    if (!selectedAgent) return;

    try {
      setSubmitting(true);
      await agencyAssignmentApi.assignProfile(data);
      
      // Show success and refresh list
      alert(`Đã cấp hồ sơ đại lý thành công cho ${selectedAgent.full_name}!`);
      setShowAssignForm(false);
      setSelectedAgent(null);
      assignForm.reset();
      
      // Reload assignment data
      const agentsResponse = await agencyAssignmentApi.getUnassignedAgents();
      setUnassignedAgents(agentsResponse.results);
    } catch (err: any) {
      console.error('Error assigning profile:', err);
      const errorMsg = err.response?.data?.error || 'Có lỗi xảy ra khi cấp hồ sơ';
      alert(`Lỗi: ${errorMsg}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteClick = (account: Account) => {
    setAccountToDelete(account);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (accountToDelete) {
      try {
        // Delete account via API
        await deleteUser(Number(accountToDelete.id));
        
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
              {activeTab === 'accounts' ? <Users className="h-10 w-10 text-white" /> : <Building className="h-10 w-10 text-white" />}
            </div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-2">
              {activeTab === 'accounts' ? 'QUẢN LÝ TÀI KHOẢN' : 'CẤP HỒ SƠ ĐẠI LÝ'}
            </h1>
            <p className="text-gray-600 text-lg max-w-3xl leading-relaxed">
              {activeTab === 'accounts' 
                ? 'Quản lý tài khoản admin, staff và các agent đã được cấp hồ sơ đại lý với giao diện hiện đại và trực quan.'
                : 'Cấp hồ sơ đại lý cho các tài khoản agent chưa có agency với quy trình đơn giản và hiệu quả.'
              }
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-xl p-2 border border-blue-200 mb-6">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('accounts')}
              className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-bold text-lg transition-all duration-200 ${
                activeTab === 'accounts'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <Users className="h-6 w-6" />
              Danh sách tài khoản
              <span className="text-sm font-normal bg-white/20 px-2 py-1 rounded-full">
                {assignedAccounts.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('assignments')}
              className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-bold text-lg transition-all duration-200 ${
                activeTab === 'assignments'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <Building className="h-6 w-6" />
              Cấp hồ sơ đại lý
              <span className="text-sm font-normal bg-white/20 px-2 py-1 rounded-full">
                {unassignedAgents.length}
              </span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'accounts' && (
          <>
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
          </>
        )}

        {/* Assignments Tab Content */}
        {activeTab === 'assignments' && (
          <div className="space-y-6">
            {assignmentLoading ? (
              <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-blue-200">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-12 h-12 border-4 border-blue-200 rounded-full animate-spin border-t-blue-500"></div>
                  <p className="text-gray-600">Đang tải danh sách agents...</p>
                </div>
              </div>
            ) : assignmentError ? (
              <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-red-200">
                <div className="text-red-600 mb-4">
                  <AlertCircle className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Lỗi tải dữ liệu</h3>
                <p className="text-gray-600 mb-4">{assignmentError}</p>
                <button
                  onClick={() => setActiveTab('assignments')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Thử lại
                </button>
              </div>
            ) : (
              <>
                {/* Search Agents */}
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-blue-200">
                  <div className="flex items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Tìm kiếm agent..."
                        value={agentSearchTerm}
                        onChange={(e) => setAgentSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-4 rounded-xl text-white">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{unassignedAgents.length}</div>
                        <div className="text-emerald-100 text-sm">Agents chưa có hồ sơ</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Agents List */}
                {filteredAgents.length === 0 ? (
                  <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-blue-200">
                    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <UserCheck className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {unassignedAgents.length === 0 
                        ? 'Không có agent nào chưa có hồ sơ' 
                        : 'Không tìm thấy agent phù hợp'
                      }
                    </h3>
                    <p className="text-gray-600">
                      {unassignedAgents.length === 0
                        ? 'Tất cả các tài khoản agent đã được cấp hồ sơ đại lý.'
                        : 'Thử thay đổi từ khóa tìm kiếm để xem tất cả agents.'
                      }
                    </p>
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-200">
                    <div className="p-6 border-b border-gray-100">
                      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                        <UserCheck className="h-7 w-7 text-emerald-600" />
                        Agents chưa có hồ sơ đại lý
                        <span className="text-sm font-normal text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          {filteredAgents.length} agents
                        </span>
                      </h2>
                    </div>
                    <div className="divide-y divide-gray-100">
                      {filteredAgents.map((agent) => (
                        <div key={agent.user_id} className="p-6 hover:bg-blue-50 transition-all duration-200">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-4 mb-2">
                                <span className="inline-flex items-center px-3 py-1 bg-emerald-100 text-emerald-800 text-sm font-bold rounded-full">
                                  {agent.username}
                                </span>
                                <h3 className="text-lg font-semibold text-gray-900">{agent.full_name}</h3>
                              </div>
                              <div className="text-sm text-gray-600 space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">Email:</span>
                                  <span>{agent.email}</span>
                                </div>
                                {agent.phone_number && (
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">SĐT:</span>
                                    <span>{agent.phone_number}</span>
                                  </div>
                                )}
                                {agent.address && (
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">Địa chỉ:</span>
                                    <span>{agent.address}</span>
                                  </div>
                                )}
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">Ngày tạo:</span>
                                  <span>{new Date(agent.created_at).toLocaleDateString('vi-VN')}</span>
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={() => handleAssignClick(agent)}
                              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
                            >
                              <div className="flex items-center gap-2">
                                <Building className="h-5 w-5" />
                                <span>Cấp hồ sơ</span>
                              </div>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Assignment Form Modal */}
        {showAssignForm && selectedAgent && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-blue-100">
              <div className="p-8">
                <div className="text-center mb-8">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-4">
                    <Building className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Cấp hồ sơ đại lý</h3>
                  <p className="text-gray-600">
                    Cấp hồ sơ đại lý cho <strong>{selectedAgent.full_name}</strong>
                  </p>
                </div>

                <form onSubmit={assignForm.handleSubmit(handleFormSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tên đại lý *
                      </label>
                      <input
                        {...assignForm.register('agency_name', { required: 'Vui lòng nhập tên đại lý' })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                        placeholder="Nhập tên đại lý"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Loại đại lý *
                      </label>
                      <select
                        {...assignForm.register('agency_type_id', { required: 'Vui lòng chọn loại đại lý' })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="">Chọn loại đại lý</option>
                        {agencyTypes.map(type => (
                          <option key={type.agency_type_id} value={type.agency_type_id}>
                            {type.type_name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Quận/Huyện *
                      </label>
                      <select
                        {...assignForm.register('district_id', { required: 'Vui lòng chọn quận/huyện' })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="">Chọn quận/huyện</option>
                        {districts.map(district => (
                          <option key={district.district_id} value={district.district_id}>
                            {district.district_name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Số điện thoại *
                      </label>
                      <input
                        {...assignForm.register('phone_number', { required: 'Vui lòng nhập số điện thoại' })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                        placeholder="Nhập số điện thoại"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Địa chỉ *
                    </label>
                    <textarea
                      {...assignForm.register('address', { required: 'Vui lòng nhập địa chỉ' })}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                      placeholder="Nhập địa chỉ đầy đủ"
                    />
                  </div>

                  <div className="flex gap-4 pt-6">
                    <button
                      type="button"
                      onClick={() => {
                        setShowAssignForm(false);
                        setSelectedAgent(null);
                        assignForm.reset();
                      }}
                      className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 font-semibold"
                    >
                      Hủy bỏ
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 font-semibold shadow-lg disabled:opacity-50"
                    >
                      {submitting ? 'Đang xử lý...' : 'Cấp hồ sơ'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AccountPage;