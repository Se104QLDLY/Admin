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
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold uppercase mb-6">Quản lý thanh toán</h1>
        
        <div className="flex justify-between items-center mb-6">
          <div className="w-96">
            <input
              type="text"
              placeholder="Tìm kiếm phiếu thu..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Thêm phiếu thu
          </button>
        </div>
        
        <h2 className="text-lg font-medium mb-4">Danh sách phiếu thu</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-50 border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
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
            <tbody className="divide-y divide-gray-200">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-900">{payment.code}</td>
                  <td className="px-4 py-3 text-gray-900">{payment.agency}</td>
                  <td className="px-4 py-3 text-gray-900">{payment.amount}</td>
                  <td className="px-4 py-3 text-gray-800">{payment.paymentDate}</td>
                  <td className="px-4 py-3 text-gray-800">{payment.creator}</td>
                  <td className="px-4 py-3 text-gray-800">{payment.createdDate}</td>
                  <td className="px-4 py-3 text-gray-800">{payment.updatedDate}</td>
                  <td className="px-4 py-3 space-x-2">
                    <Link 
                      to={`/payment/detail/${payment.id}`} 
                      className="px-3 py-1 text-xs font-medium text-blue-600 hover:text-blue-800"
                    >
                      Xem chi tiết
                    </Link>
                    <button className="px-3 py-1 text-xs font-medium text-blue-600 hover:text-blue-800">
                      Sửa
                    </button>
                    <button className="px-3 py-1 text-xs font-medium text-red-600 hover:text-red-800">
                      Xóa
                    </button>
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