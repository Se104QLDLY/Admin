import React from 'react';
import { useNavigate } from 'react-router-dom';

const mockAccount = {
  id: 1,
  name: 'Nguyễn Văn A',
  email: 'nguyenvana@example.com',
  role: 'Admin',
  phone: '0123456789',
  status: 'Active',
};

const AccountView: React.FC = () => {
  const navigate = useNavigate();
  const account = mockAccount;
  return (
    <div className="flex justify-center items-center min-h-[60vh] bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-lg p-10 border-t-4 border-blue-500">
        <div className="flex items-center justify-between mb-8">
          <span className="text-2xl font-extrabold text-blue-800 tracking-wide drop-shadow">Thông tin tài khoản</span>
        </div>
        <div className="space-y-5 text-lg">
          <div><span className="font-semibold text-blue-700">Họ tên:</span> {account.name}</div>
          <div><span className="font-semibold text-blue-700">Email:</span> {account.email}</div>
          <div><span className="font-semibold text-blue-700">Vai trò:</span> {account.role}</div>
          <div><span className="font-semibold text-blue-700">Số điện thoại:</span> {account.phone}</div>
          <div><span className="font-semibold text-blue-700">Trạng thái:</span> {account.status}</div>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="mt-10 w-full py-3 bg-blue-600 text-white rounded-xl font-bold shadow hover:bg-blue-700 transition text-lg"
        >
          Quay lại
        </button>
      </div>
    </div>
  );
};

export default AccountView;
