import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Mock data, replace with real API/data fetching
const mockReport = {
  id: 'RPT001',
  title: 'Báo cáo doanh thu tháng 1/2024',
  type: 'Doanh thu',
  period: 'Tháng 1/2024',
  status: 'Hoàn thành',
  creator: 'Nguyễn Văn A',
  createdAt: '31/1/2024',
  content: 'Nội dung chi tiết báo cáo doanh thu tháng 1/2024...'
};

const ReportEdit: React.FC = () => {
  const navigate = useNavigate();
  // const { id } = useParams();
  const [form, setForm] = useState(mockReport);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Cập nhật báo cáo thành công!');
      navigate(-1);
    }, 1000);
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh] bg-gradient-to-br from-blue-50 to-cyan-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-3xl w-full max-w-2xl p-10 border-t-4 border-blue-500"
      >
        <div className="text-2xl font-extrabold text-blue-800 mb-8 drop-shadow tracking-wide">Chỉnh sửa báo cáo</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold text-blue-700 mb-1">Mã báo cáo</label>
            <input name="id" value={form.id} disabled className="w-full rounded-xl border px-4 py-2 bg-gray-100" />
          </div>
          <div>
            <label className="block font-semibold text-blue-700 mb-1">Tiêu đề</label>
            <input name="title" value={form.title} onChange={handleChange} required className="w-full rounded-xl border px-4 py-2" />
          </div>
          <div>
            <label className="block font-semibold text-blue-700 mb-1">Loại báo cáo</label>
            <select name="type" value={form.type} onChange={handleChange} className="w-full rounded-xl border px-4 py-2">
              <option value="Doanh thu">Doanh thu</option>
              <option value="Tồn kho">Tồn kho</option>
              <option value="Công nợ">Công nợ</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold text-blue-700 mb-1">Kỳ báo cáo</label>
            <input name="period" value={form.period} onChange={handleChange} required className="w-full rounded-xl border px-4 py-2" />
          </div>
          <div>
            <label className="block font-semibold text-blue-700 mb-1">Trạng thái</label>
            <select name="status" value={form.status} onChange={handleChange} className="w-full rounded-xl border px-4 py-2">
              <option value="Hoàn thành">Hoàn thành</option>
              <option value="Đang xử lý">Đang xử lý</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold text-blue-700 mb-1">Người tạo</label>
            <input name="creator" value={form.creator} onChange={handleChange} required className="w-full rounded-xl border px-4 py-2" />
          </div>
          <div>
            <label className="block font-semibold text-blue-700 mb-1">Ngày tạo</label>
            <input name="createdAt" value={form.createdAt} onChange={handleChange} required className="w-full rounded-xl border px-4 py-2" />
          </div>
        </div>
        <div className="mt-6">
          <label className="block font-semibold text-blue-700 mb-1">Nội dung</label>
          <textarea name="content" value={form.content} onChange={handleChange} rows={4} className="w-full rounded-xl border px-4 py-2" />
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

export default ReportEdit;
