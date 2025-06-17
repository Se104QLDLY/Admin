import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Mock data, replace with real API/data fetching
const mockPayment = {
  id: 'PT001',
  agency: 'DL001 - Đại lý Hà Nội',
  amount: 5000000,
  date: '2024-01-15',
  creator: 'Nguyễn Văn A',
  createdAt: '2024-01-15',
  updatedAt: '2024-01-15',
  status: 'Hoàn thành',
};

const PaymentEdit: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState(mockPayment);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Cập nhật phiếu thu thành công!');
      navigate(-1);
    }, 1000);
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh] bg-gradient-to-br from-blue-50 to-cyan-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-3xl w-full max-w-2xl p-10 border-t-4 border-blue-500"
      >
        <div className="text-2xl font-extrabold text-blue-800 mb-8 drop-shadow tracking-wide">Chỉnh sửa phiếu thu</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold text-blue-700 mb-1">Mã phiếu thu</label>
            <input name="id" value={form.id} disabled className="w-full rounded-xl border px-4 py-2 bg-gray-100" />
          </div>
          <div>
            <label className="block font-semibold text-blue-700 mb-1">Đại lý</label>
            <input name="agency" value={form.agency} onChange={handleChange} required className="w-full rounded-xl border px-4 py-2" />
          </div>
          <div>
            <label className="block font-semibold text-blue-700 mb-1">Số tiền (VND)</label>
            <input name="amount" type="number" value={form.amount} onChange={handleChange} required className="w-full rounded-xl border px-4 py-2" />
          </div>
          <div>
            <label className="block font-semibold text-blue-700 mb-1">Ngày thu</label>
            <input name="date" type="date" value={form.date} onChange={handleChange} required className="w-full rounded-xl border px-4 py-2" />
          </div>
          <div>
            <label className="block font-semibold text-blue-700 mb-1">Người tạo</label>
            <input name="creator" value={form.creator} onChange={handleChange} required className="w-full rounded-xl border px-4 py-2" />
          </div>
          <div>
            <label className="block font-semibold text-blue-700 mb-1">Trạng thái</label>
            <select name="status" value={form.status} onChange={handleChange} className="w-full rounded-xl border px-4 py-2">
              <option value="Hoàn thành">Hoàn thành</option>
              <option value="Đang xử lý">Đang xử lý</option>
            </select>
          </div>
        </div>
        <div className="flex gap-4 mt-10">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-bold shadow hover:bg-gray-300 transition text-lg"
          >
            Quay lại
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold shadow hover:bg-blue-700 transition text-lg"
          >
            {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentEdit;
