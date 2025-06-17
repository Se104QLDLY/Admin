import React from 'react';
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

const ReportView: React.FC = () => {
  const navigate = useNavigate();
  // const { id } = useParams();
  const report = mockReport;
  return (
    <div className="flex justify-center items-center min-h-[60vh] bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-2xl p-10 border-t-4 border-blue-500">
        <div className="text-2xl font-extrabold text-blue-800 mb-8 drop-shadow tracking-wide">Chi tiết báo cáo</div>
        <div className="space-y-4 text-lg">
          <div><span className="font-semibold text-blue-700">Mã báo cáo:</span> {report.id}</div>
          <div><span className="font-semibold text-blue-700">Tiêu đề:</span> {report.title}</div>
          <div><span className="font-semibold text-blue-700">Loại báo cáo:</span> {report.type}</div>
          <div><span className="font-semibold text-blue-700">Kỳ báo cáo:</span> {report.period}</div>
          <div><span className="font-semibold text-blue-700">Trạng thái:</span> {report.status}</div>
          <div><span className="font-semibold text-blue-700">Người tạo:</span> {report.creator}</div>
          <div><span className="font-semibold text-blue-700">Ngày tạo:</span> {report.createdAt}</div>
          <div><span className="font-semibold text-blue-700">Nội dung:</span> <div className="mt-1 text-gray-700 bg-blue-50 rounded-xl p-4">{report.content}</div></div>
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

export default ReportView;
