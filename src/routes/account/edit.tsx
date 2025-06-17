import React, { useState } from 'react';

const mockAccount = {
  id: 1,
  name: 'Nguyễn Văn A',
  email: 'nguyenvana@example.com',
  role: 'Admin',
  phone: '0123456789',
  status: 'Active',
};

const AccountEdit: React.FC = () => {
  const [form, setForm] = useState(mockAccount);
  const [loading, setLoading] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Cập nhật tài khoản thành công!');
    }, 1000);
  };
  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl w-full max-w-lg p-8"
      >
        <div className="text-xl font-bold mb-6">Chỉnh sửa tài khoản</div>
        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Họ tên</label>
            <input name="name" value={form.name} onChange={handleChange} required className="w-full rounded-xl border px-4 py-2" />
          </div>
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} required className="w-full rounded-xl border px-4 py-2" />
          </div>
          <div>
            <label className="block font-medium mb-1">Vai trò</label>
            <select name="role" value={form.role} onChange={handleChange} required className="w-full rounded-xl border px-4 py-2">
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">Số điện thoại</label>
            <input name="phone" value={form.phone} onChange={handleChange} className="w-full rounded-xl border px-4 py-2" />
          </div>
          <div>
            <label className="block font-medium mb-1">Trạng thái</label>
            <select name="status" value={form.status} onChange={handleChange} className="w-full rounded-xl border px-4 py-2">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <button type="submit" disabled={loading} className="w-full mt-2 bg-blue-600 text-white rounded-xl py-2 font-semibold shadow hover:bg-blue-700 transition">
            {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountEdit;
