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
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
        <div className="text-center mb-8">
          <img src="/logo.png" alt="Home Icon" className="mx-auto mb-3 h-12 w-12 drop-shadow" />
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-700 via-cyan-500 to-blue-400 bg-clip-text text-transparent drop-shadow mb-2 flex items-center justify-center gap-2">
            {/* <span className='text-3xl'>🔒</span> */}
            Đăng nhập
          </h2>
          <div className="flex justify-center">
            <span className="block w-16 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mb-3"></span>
          </div>
          <p className="text-gray-500 text-base font-medium tracking-wide">
            Chào mừng bạn quay lại hệ thống!
          </p>
        </div>
        
        <div className="flex mb-6">
          <button
            onClick={() => setLoginType('admin')}
            type="button"
            className={`flex-1 py-2 text-center text-base font-semibold transition-all border border-r-0 first:rounded-l-full last:rounded-r-full focus:z-10
              ${loginType === 'admin' ? 'bg-white text-blue-700 shadow-md border-blue-500' : 'bg-blue-50 text-gray-500 hover:bg-blue-100 border-blue-200'}`}
            style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
          >
            {/* <span className="mr-1">👑</span> */}Admin
          </button>
          <button
            onClick={() => setLoginType('staff')}
            type="button"
            className={`flex-1 py-2 text-center text-base font-semibold transition-all border border-r-0 border-l-0 focus:z-10
              ${loginType === 'staff' ? 'bg-white text-blue-700 shadow-md border-blue-500' : 'bg-blue-50 text-gray-500 hover:bg-blue-100 border-blue-200'}`}
            style={{ borderRadius: 0 }}
          >
            {/* <span className="mr-1">🧑‍💼</span> */}Staff
          </button>
          <button
            onClick={() => setLoginType('agency')}
            type="button"
            className={`flex-1 py-2 text-center text-base font-semibold transition-all border last:rounded-r-full focus:z-10
              ${loginType === 'agency' ? 'bg-white text-blue-700 shadow-md border-blue-500' : 'bg-blue-50 text-gray-500 hover:bg-blue-100 border-blue-200'}`}
            style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
          >
            {/* <span className="mr-1">🏢</span> */}Agency
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-blue-700 font-semibold mb-1">Tên đăng nhập</label>
            <input
              {...register('username')}
              className="w-full px-4 py-3 rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-lg bg-blue-50 placeholder:text-blue-300"
              placeholder="Nhập tên đăng nhập"
            />
            {errors.username && (
              <span className="text-red-500 text-sm mt-1">{errors.username.message}</span>
            )}
          </div>
          <div>
            <label className="block text-blue-700 font-semibold mb-1">Mật khẩu</label>
            <input
              type="password"
              {...register('password')}
              className="w-full px-4 py-3 rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-lg bg-blue-50 placeholder:text-blue-300"
              placeholder="Nhập mật khẩu"
            />
            {errors.password && (
              <span className="text-red-500 text-sm mt-1">{errors.password.message}</span>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all text-lg border-2 border-transparent hover:border-blue-700"
          >
            Đăng nhập
          </button>
        </form>
        <div className="flex justify-between mt-6 text-sm">
          <Link to="/register" className="text-blue-600 hover:underline font-semibold">Chưa có tài khoản?</Link>
          <Link to="/forgot-password" className="text-blue-400 hover:underline">Quên mật khẩu?</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;