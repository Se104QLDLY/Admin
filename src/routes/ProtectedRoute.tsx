import { Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import { APP_URLS } from '../utils/navigation';

export const ProtectedRoute = () => {
  const { user, isLoading, checkUserSession } = useAuth();
  const [hasCheckedSession, setHasCheckedSession] = useState(false);

  useEffect(() => {
    if (hasCheckedSession) return; // Đã check rồi

    const checkAuthentication = async () => {
      const currentUser = await checkUserSession();
      setHasCheckedSession(true);

      if (!currentUser) {
        // Redirect only if user is truly not logged in
        window.location.href = `${APP_URLS.LOGIN_PAGE}/login`;
        return;
      }

      if (currentUser.account_role !== 'admin') {
        // Redirect wrong role to correct app
        switch (currentUser.account_role) {
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
    };

    checkAuthentication();
  }, [checkUserSession, hasCheckedSession]);

  if (isLoading || !hasCheckedSession) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        <div className="ml-4 text-lg">Đang kiểm tra quyền truy cập...</div>
      </div>
    );
  }

  if (!user) {
    // Show a message instead of loading spinner when not authenticated
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Yêu cầu đăng nhập</h2>
          <p className="text-gray-600 mb-6">Bạn cần đăng nhập để truy cập trang này.</p>
          <button
            onClick={() => window.location.href = `${APP_URLS.LOGIN_PAGE}/login`}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-semibold"
          >
            Đăng nhập ngay
          </button>
        </div>
      </div>
    );
  }

  if (user.account_role !== 'admin') {
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