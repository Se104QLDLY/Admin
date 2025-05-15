import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';

interface Agency {
  id: string;
  name: string;
  code: string;
  district: string;
  ward: string;
  address: string;
  phone: string;
  email: string;
  type: {
    id: number;
    name: string;
  }
}

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [districtFilter, setDistrictFilter] = useState('all');

  // Mock data
  const agencies: Agency[] = [
    {
      id: '1',
      name: 'Đại lý Phương Nam',
      code: 'DL001',
      district: 'Quận 1',
      ward: 'Phường Bến Nghé',
      address: '123 Nguyễn Huệ, Phường Bến Nghé',
      phone: '028 1234 5678',
      email: 'phuongnam@email.com',
      type: {
        id: 1,
        name: 'Cấp 1'
      }
    },
    {
      id: '2',
      name: 'Đại lý Miền Tây',
      code: 'DL002',
      district: 'Quận 5',
      ward: 'Phường 6',
      address: '456 Trần Hưng Đạo, Phường 6',
      phone: '028 8765 4321',
      email: 'mientay@email.com',
      type: {
        id: 2,
        name: 'Cấp 2'
      }
    }
  ];

  const filteredAgencies = agencies.filter(agency => {
    if (searchTerm && !agency.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !agency.code.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    if (typeFilter !== 'all' && agency.type.name !== typeFilter) {
      return false;
    }
    if (districtFilter !== 'all' && agency.district !== districtFilter) {
      return false;
    }
    return true;
  });

  return (
    <DashboardLayout>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-6">Tra cứu Đại lý</h1>
        
        <div className="mb-6">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên hoặc mã đại lý..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="w-auto">
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Loại đại lý:</span>
              <select
                className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="all">Tất cả</option>
                <option value="Cấp 1">Cấp 1</option>
                <option value="Cấp 2">Cấp 2</option>
              </select>
            </div>
          </div>
          
          <div className="w-auto">
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Quận/Huyện:</span>
              <select
                className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={districtFilter}
                onChange={(e) => setDistrictFilter(e.target.value)}
              >
                <option value="all">Tất cả</option>
                <option value="Quận 1">Quận 1</option>
                <option value="Quận 5">Quận 5</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredAgencies.map((agency) => (
            <div key={agency.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-lg font-medium text-gray-900">{agency.name}</h2>
                  <p className="text-gray-600">{agency.code}</p>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {agency.type.name}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="text-gray-700">{agency.district}</p>
                    <p className="text-gray-700">{agency.address}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span className="text-gray-700">{agency.phone}</span>
                </div>
                
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span className="text-gray-700">{agency.email}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SearchPage; 