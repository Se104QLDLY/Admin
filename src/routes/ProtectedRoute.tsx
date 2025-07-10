import { Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';
import { APP_URLS } from '../utils/navigation';

export const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return; // Wait until loading is done

    if (!user) {
      // Redirect only if user is truly not logged in
      window.location.href = `${APP_URLS.LOGIN_PAGE}/login`;
      return;
    }

    if (user.account_role !== 'admin') {
      // Redirect wrong role to correct app
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