import { Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';
import { APP_URLS } from '../utils/navigation';

export const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();

  useEffect(() => {
    // Chỉ redirect khi đã kiểm tra xong trạng thái đăng nhập
    if (!isLoading && !user) {
      window.location.href = `${APP_URLS.LOGIN_PAGE}/login`;
      return;
    }
    if (!isLoading && user && user.account_role !== 'admin') {
      switch (user.account_role) {
        case 'staff':
          window.location.href = APP_URLS.STAFF_APP;
          break;
        case 'agent':
          window.location.href = APP_URLS.AGENCY_APP;
          break;
        default:
          window.location.href = APP_URLS.LOGIN_PAGE;
      }
      return;
    }
  }, [user, isLoading]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        <div className="ml-4 text-lg">Đang kiểm tra quyền truy cập...</div>
      </div>
    );
  }

  if (!user || user.account_role !== 'admin') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        <div className="ml-4 text-lg">Đang chuyển hướng...</div>
      </div>
    );
  }

  // User authenticated and has admin role
  return <Outlet />;
};