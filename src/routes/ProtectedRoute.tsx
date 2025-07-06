import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

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

  // Nếu không có user, điều hướng về trang đăng nhập
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Nếu có user nhưng không phải admin, redirect về trang login với thông báo
  if (user.account_role !== 'admin') {
    console.log('Admin app: User is not admin, redirecting to login');
    return <Navigate to="/login" />;
  }

  console.log('Admin app: User authenticated and has admin role');
  // Nếu có user và là admin, cho phép truy cập vào các route con
  return <Outlet />;
};