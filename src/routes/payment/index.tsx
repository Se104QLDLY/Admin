import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';

interface PaymentReceipt {
  id: string;
  code: string;
  agency: string;
  amount: string;
  paymentDate: string;
  creator: string;
  createdDate: string;
  updatedDate: string;
}

const PaymentPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for payment receipts
  const payments: PaymentReceipt[] = [
    {
      id: '1',
      code: 'PT001',
      agency: 'Đại lý Hà Nội',
      amount: '5,000,000 VND',
      paymentDate: '15/01/2024',
      creator: 'Nguyễn Văn A',
      createdDate: '15/01/2024 08:30',
      updatedDate: '15/01/2024 08:30'
    },
    {
      id: '2',
      code: 'PT002',
      agency: 'Đại lý Hồ Chí Minh',
      amount: '3,500,000 VND',
      paymentDate: '14/01/2024',
      creator: 'Trần Thị B',
      createdDate: '14/01/2024 14:15',
      updatedDate: '14/01/2024 14:15'
    }
  ];

  const filteredPayments = payments.filter(payment => 
    payment.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.agency.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-blue-100">
        <h1 className="text-3xl font-extrabold text-blue-800 mb-8 drop-shadow uppercase tracking-wide">Quản lý thanh toán</h1>
        <div className="flex flex-wrap gap-4 mb-8 justify-between items-center">
          <input
            type="text"
            placeholder="Tìm kiếm phiếu thu..."
            className="flex-1 min-w-[220px] px-4 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Link
            to="/payment/add"
            className="flex items-center px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-bold text-lg shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Thêm phiếu thu
          </Link>
        </div>
        <h2 className="text-2xl font-extrabold text-blue-800 mb-6 drop-shadow">Danh sách phiếu thu</h2>
        <div className="overflow-x-auto rounded-2xl shadow-xl border-2 border-blue-100 bg-white">
          <table className="min-w-full bg-white border border-blue-200">
            <thead className="bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700">
              <tr className="uppercase text-sm">
                <th className="py-3 px-4 text-left">Mã phiếu thu</th>
                <th className="py-3 px-4 text-left">Đại lý</th>
                <th className="py-3 px-4 text-left">Số tiền</th>
                <th className="py-3 px-4 text-left">Ngày thu</th>
                <th className="py-3 px-4 text-left">Người tạo</th>
                <th className="py-3 px-4 text-left">Ngày tạo</th>
                <th className="py-3 px-4 text-left">Ngày cập nhật</th>
                <th className="py-3 px-4 text-left">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-100">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-semibold text-gray-900">{payment.code}</td>
                  <td className="px-4 py-3 text-gray-900">{payment.agency}</td>
                  <td className="px-4 py-3">
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-bold shadow">
                      {payment.amount}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-800">{payment.paymentDate}</td>
                  <td className="px-4 py-3 text-gray-800">{payment.creator}</td>
                  <td className="px-4 py-3 text-gray-800">{payment.createdDate}</td>
                  <td className="px-4 py-3 text-gray-800">{payment.updatedDate}</td>
                  <td className="px-4 py-3 space-x-2">
                    <Link
                      to={`/payment/detail/${payment.id}`}
                      className="px-3 py-1 text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 rounded-lg"
                    >
                      Xem chi tiết
                    </Link>
                    <button className="px-3 py-1 text-xs font-bold text-green-600 hover:text-green-800 bg-green-50 rounded-lg">Sửa</button>
                    <button className="px-3 py-1 text-xs font-bold text-red-600 hover:text-red-800 bg-red-50 rounded-lg">Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PaymentPage;