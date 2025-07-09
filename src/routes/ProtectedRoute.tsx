import { Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';
import { navigateToLogin } from '../utils/navigation';

export const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();

  // Nếu đang trong quá trình kiểm tra user (lúc tải lại trang)
  // thì hiển thị một màn hình chờ đơn giản
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        <div className="ml-4 text-lg">Đang kiểm tra quyền truy cập...</div>
      </div>
    );
  }

  // Sử dụng useEffect để redirect sang login page (cross-app navigation)
  useEffect(() => {
    if (!user) {
      console.log('Admin app: No user found, redirecting to login page');
      navigateToLogin();
      return;
    }

    if (user.account_role !== 'admin') {
      console.log('Admin app: User is not admin, redirecting to login page');
      navigateToLogin();
      return;
    }
  }, [user]);

  // Nếu không có user hoặc không phải admin, hiển thị loading cho đến khi redirect
  if (!user || user.account_role !== 'admin') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        <div className="ml-4 text-lg">Đang chuyển hướng...</div>
      </div>
    );
  }

  console.log('Admin app: User authenticated and has admin role');
  // Nếu có user và là admin, cho phép truy cập vào các route con
  return <Outlet />;
};