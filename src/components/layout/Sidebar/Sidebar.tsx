import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  className?: string;
}

interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  path: string;
}

// Tạo style riêng cho sidebar
const sidebarStyle = {
  transition: 'width 250ms ease-out',
  willChange: 'width',
  overflowX: 'hidden' as const
};

export const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
  const location = useLocation();
  
  // Load từ localStorage đơn giản
  const [collapsed, setCollapsed] = useState(() => {
    try {
      const saved = localStorage.getItem('sidebarCollapsed');
      return saved ? JSON.parse(saved) : false;
    } catch (e) {
      return false;
    }
  });
  
  // Lưu vào localStorage sau khi thay đổi
  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(collapsed));
  }, [collapsed]);
  
  // Toggle đơn giản
  const toggleSidebar = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCollapsed(!collapsed);
  };
  
  const sidebarItems: SidebarItem[] = [
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>,
      label: 'Trang chủ',
      path: '/admin',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
            </svg>,
      label: 'Quản lý nhập hàng',
      path: '/import',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
            </svg>,
      label: 'Quản lý xuất hàng',
      path: '/export',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>,
      label: 'Tra cứu đại lý',
      path: '/search',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>,
      label: 'Quản lý thanh toán',
      path: '/payment',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm4-1a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1z" clipRule="evenodd" />
            </svg>,
      label: 'Lập báo cáo',
      path: '/reports',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>,
      label: 'Quản lý quy định',
      path: '/settings',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>,
      label: 'Quản lý tài khoản',
      path: '/account',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </svg>,
      label: 'Quản lý đại lý',
      path: '/agencies',
    },
  ];
  
  return (
    <aside 
      className={`${collapsed ? 'w-20' : 'w-64'} bg-gray-100 border-r border-gray-200 min-h-screen ${className}`}
      style={sidebarStyle}
    >
      <div className="p-4 relative">
        {/* Logo & Toggle Button */}
        <div className="flex items-center justify-between mb-8">
          {!collapsed ? (
            <Link to="/admin" className="flex items-center">
              <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
            </Link>
          ) : (
            <Link to="/admin" className="mx-auto">
              <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
            </Link>
          )}
          
          {/* Toggle Button - Đơn giản hóa nút toggle */}
          <button 
            onClick={toggleSidebar}
            className="absolute -right-3 top-6 bg-white rounded-full p-2 border border-gray-200 shadow-sm hover:shadow-md z-10"
            aria-label={collapsed ? "Mở rộng sidebar" : "Thu gọn sidebar"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${collapsed ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        <nav className="space-y-1">
          {sidebarItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-3'} px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
                title={collapsed ? item.label : ''}
              >
                <div className={`${isActive ? 'text-blue-700' : 'text-gray-500'} flex-shrink-0`}>
                  {item.icon}
                </div>
                {!collapsed && <span className="whitespace-nowrap">{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar; 