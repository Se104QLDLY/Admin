import React from 'react';
import { Link } from 'react-router-dom';
import { useLoginForm } from '../../hooks/useLoginForm';

const Login: React.FC = () => {
  const {
    loginType,
    setLoginType,
    isLoggedIn,
    showAccountMenu,
    userName,
    toggleAccountMenu,
    handleLogout,
    register,
    handleSubmit,
    errors,
    onSubmit
  } = useLoginForm();

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 relative">
      {/* Account Management Box */}
      <div className="absolute top-4 right-4">
        <div className="relative">
          <button
            onClick={toggleAccountMenu}
            className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
          >
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
              {isLoggedIn ? userName.substring(0, 1).toUpperCase() : '?'}
            </div>
            <span className="text-sm font-medium text-gray-700">
              {isLoggedIn ? userName : 'Khách'}
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {showAccountMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
              {isLoggedIn ? (
                <>
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-medium text-gray-700">{userName}</p>
                    <p className="text-xs text-gray-500">{loginType === 'admin' ? 'Quản trị viên' : 'Khách hàng'}</p>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Đăng xuất
                  </button>
                </>
              ) : (
                <div className="px-4 py-2 text-sm text-gray-700">
                  Vui lòng đăng nhập
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Đăng nhập
          </h2>
          <p className="text-gray-600">
            Vui lòng đăng nhập để tiếp tục
          </p>
        </div>
        
        <div className="flex bg-gray-100 p-1 rounded-lg mb-6">
          <button
            onClick={() => setLoginType('admin')}
            className={`flex-1 py-2 rounded-md text-center transition-all ${
              loginType === 'admin' 
                ? 'bg-white text-blue-600 shadow-sm font-medium' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Admin
          </button>
          <button
            onClick={() => setLoginType('client')}
            className={`flex-1 py-2 rounded-md text-center transition-all ${
              loginType === 'client' 
                ? 'bg-white text-blue-600 shadow-sm font-medium' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Client
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <input
              type="text"
              {...register('username')}
              placeholder="Tên đăng nhập"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-500">{errors.username.message}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              {...register('password')}
              placeholder="Mật khẩu"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="flex justify-end">
            <Link 
              to="/forgot-password" 
              className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
            >
              Quên mật khẩu?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-semibold"
          >
            Đăng nhập
          </button>

          <div className="text-center">
            <Link 
              to="/register" 
              className="text-blue-600 hover:text-blue-700 transition-colors duration-200 inline-flex items-center"
            >
              <span className="mr-2">→</span>
              Chưa có tài khoản? Đăng ký ngay
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login; 