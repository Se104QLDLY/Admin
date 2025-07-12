import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { loginSchema } from '../api/auth.api';
import type { LoginCredentials } from '../api/auth.api';
import { z } from 'zod';

// Schema for registration
const registerSchema = z.object({
  username: z.string().min(3, 'Tên đăng nhập tối thiểu 3 ký tự'),
  password: z.string().min(8, 'Mật khẩu tối thiểu 8 ký tự')
    .regex(/[A-Z]/, 'Mật khẩu phải có ít nhất 1 chữ hoa')
    .regex(/[a-z]/, 'Mật khẩu phải có ít nhất 1 chữ thường')
    .regex(/[0-9]/, 'Mật khẩu phải có ít nhất 1 số'),
  confirm_password: z.string(),
  full_name: z.string().min(2, 'Họ tên tối thiểu 2 ký tự'),
  email: z.string().email('Email không hợp lệ'),
  phone_number: z.string().min(10, 'Số điện thoại không hợp lệ'),
  address: z.string().optional(),
  account_role: z.enum(['staff', 'agent'], {
    errorMap: () => ({ message: 'Vui lòng chọn vai trò' })
  })
}).refine((data) => data.password === data.confirm_password, {
  message: "Mật khẩu xác nhận không khớp",
  path: ["confirm_password"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and register
  const [registerSuccess, setRegisterSuccess] = useState(false);

  // Login form
  const loginForm = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
  });

  // Register form  
  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onLoginSubmit = async (data: LoginCredentials) => {
    try {
      setError(null);
      await login(data);
      
      // Small delay to ensure authentication state is synced
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Get user info to determine role-based redirect
      const userResponse = await fetch('/api/v1/auth/me/', {
        credentials: 'include',
      });
      
      if (userResponse.ok) {
        const userData = await userResponse.json();
        
        console.log('Login successful, user role:', userData.account_role);
        
        // Redirect based on account role
        switch (userData.account_role) {
          case 'admin':
            navigate('/admin');
            break;
          case 'staff':
            console.log('Redirecting to staff dashboard');
            window.location.href = 'http://localhost:5176/';
            break;
          case 'agent':
            console.log('Redirecting to agency dashboard');
                          window.location.href = 'http://localhost:5175/';
            break;
          default:
            navigate('/admin'); // Default fallback
        }
      } else {
        console.error('Failed to get user info');
        navigate('/admin'); // Fallback if can't get user info
      }
    } catch (err) {
      setError('Tên đăng nhập hoặc mật khẩu không đúng.');
      console.error('Login error:', err);
    }
  };

  const onRegisterSubmit = async (data: RegisterFormData) => {
    try {
      setError(null);
      
      // Gọi API đăng ký
      const response = await fetch('/api/v1/auth/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          username: data.username,
          password: data.password,
          confirm_password: data.confirm_password,
          full_name: data.full_name,
          email: data.email,
          phone_number: data.phone_number,
          address: data.address || '',
          account_role: data.account_role
        }),
      });

      if (response.ok) {
        setRegisterSuccess(true);
        setError(null);
        // Chuyển về tab login sau 2 giây
        setTimeout(() => {
          setIsLogin(true);
          setRegisterSuccess(false);
        }, 2000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Có lỗi xảy ra khi đăng ký');
      }
    } catch (err) {
      setError('Có lỗi xảy ra khi đăng ký. Vui lòng thử lại.');
      console.error('Register error:', err);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
        <div className="text-center mb-8">
          <img src="/logo.png" alt="Home Icon" className="mx-auto mb-3 h-12 w-12 drop-shadow" />
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-700 via-cyan-500 to-blue-400 bg-clip-text text-transparent drop-shadow mb-2 flex items-center justify-center gap-2">
            {isLogin ? 'Đăng nhập' : 'Đăng ký'}
          </h2>
          <div className="flex justify-center">
            <span className="block w-16 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mb-3"></span>
          </div>
          <p className="text-gray-500 text-base font-medium tracking-wide">
            {isLogin ? 'Chào mừng bạn quay lại hệ thống!' : 'Tạo tài khoản mới'}
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
          <button
            type="button"
            onClick={() => {
              setIsLogin(true);
              setError(null);
              setRegisterSuccess(false);
            }}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              isLogin 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            Đăng nhập
          </button>
          <button
            type="button"
            onClick={() => {
              setIsLogin(false);
              setError(null);
              setRegisterSuccess(false);
            }}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              !isLogin 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            Đăng ký
          </button>
        </div>

        {/* Success Message */}
        {registerSuccess && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            Đăng ký thành công! Đang chuyển về trang đăng nhập...
          </div>
        )}

        {/* Login Form */}
        {isLogin && (
          <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-6">
            <div>
              <label className="block text-blue-700 font-semibold mb-1">Tên đăng nhập</label>
              <input
                {...loginForm.register('username')}
                className="w-full px-4 py-3 rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-lg bg-blue-50 placeholder:text-blue-300"
                placeholder="Nhập tên đăng nhập"
              />
              {loginForm.formState.errors.username && (
                <span className="text-red-500 text-sm mt-1">{loginForm.formState.errors.username.message}</span>
              )}
            </div>
            <div>
              <label className="block text-blue-700 font-semibold mb-1">Mật khẩu</label>
              <input
                type="password"
                {...loginForm.register('password')}
                className="w-full px-4 py-3 rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-lg bg-blue-50 placeholder:text-blue-300"
                placeholder="Nhập mật khẩu"
              />
              {loginForm.formState.errors.password && (
                <span className="text-red-500 text-sm mt-1">{loginForm.formState.errors.password.message}</span>
              )}
            </div>

            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
            
            <button
              type="submit"
              disabled={loginForm.formState.isSubmitting}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all text-lg border-2 border-transparent hover:border-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loginForm.formState.isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>
          </form>
        )}

        {/* Register Form */}
        {!isLogin && (
          <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
            <div>
              <label className="block text-blue-700 font-semibold mb-1">Tên đăng nhập</label>
              <input
                {...registerForm.register('username')}
                className="w-full px-4 py-2 rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all bg-blue-50"
                placeholder="Nhập tên đăng nhập"
              />
              {registerForm.formState.errors.username && (
                <span className="text-red-500 text-sm mt-1">{registerForm.formState.errors.username.message}</span>
              )}
            </div>

            <div>
              <label className="block text-blue-700 font-semibold mb-1">Họ tên</label>
              <input
                {...registerForm.register('full_name')}
                className="w-full px-4 py-2 rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all bg-blue-50"
                placeholder="Nhập họ tên đầy đủ"
              />
              {registerForm.formState.errors.full_name && (
                <span className="text-red-500 text-sm mt-1">{registerForm.formState.errors.full_name.message}</span>
              )}
            </div>

            <div>
              <label className="block text-blue-700 font-semibold mb-1">Email</label>
              <input
                type="email"
                {...registerForm.register('email')}
                className="w-full px-4 py-2 rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all bg-blue-50"
                placeholder="Nhập email"
              />
              {registerForm.formState.errors.email && (
                <span className="text-red-500 text-sm mt-1">{registerForm.formState.errors.email.message}</span>
              )}
            </div>

            <div>
              <label className="block text-blue-700 font-semibold mb-1">Số điện thoại</label>
              <input
                {...registerForm.register('phone_number')}
                className="w-full px-4 py-2 rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all bg-blue-50"
                placeholder="Nhập số điện thoại"
              />
              {registerForm.formState.errors.phone_number && (
                <span className="text-red-500 text-sm mt-1">{registerForm.formState.errors.phone_number.message}</span>
              )}
            </div>

            <div>
              <label className="block text-blue-700 font-semibold mb-1">Địa chỉ (tùy chọn)</label>
              <input
                {...registerForm.register('address')}
                className="w-full px-4 py-2 rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all bg-blue-50"
                placeholder="Nhập địa chỉ"
              />
              {registerForm.formState.errors.address && (
                <span className="text-red-500 text-sm mt-1">{registerForm.formState.errors.address.message}</span>
              )}
            </div>

            <div>
              <label className="block text-blue-700 font-semibold mb-1">Vai trò</label>
              <select
                {...registerForm.register('account_role')}
                className="w-full px-4 py-2 rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all bg-blue-50"
              >
                <option value="">Chọn vai trò</option>
                <option value="staff">Nhân viên (Staff)</option>
                <option value="agent">Đại lý (Agent)</option>
              </select>
              {registerForm.formState.errors.account_role && (
                <span className="text-red-500 text-sm mt-1">{registerForm.formState.errors.account_role.message}</span>
              )}
            </div>

            <div>
              <label className="block text-blue-700 font-semibold mb-1">Mật khẩu</label>
              <input
                type="password"
                {...registerForm.register('password')}
                className="w-full px-4 py-2 rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all bg-blue-50"
                placeholder="Nhập mật khẩu"
              />
              {registerForm.formState.errors.password && (
                <span className="text-red-500 text-sm mt-1">{registerForm.formState.errors.password.message}</span>
              )}
            </div>

            <div>
              <label className="block text-blue-700 font-semibold mb-1">Xác nhận mật khẩu</label>
              <input
                type="password"
                {...registerForm.register('confirm_password')}
                className="w-full px-4 py-2 rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all bg-blue-50"
                placeholder="Nhập lại mật khẩu"
              />
              {registerForm.formState.errors.confirm_password && (
                <span className="text-red-500 text-sm mt-1">{registerForm.formState.errors.confirm_password.message}</span>
              )}
            </div>

            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
            
            <button
              type="submit"
              disabled={registerForm.formState.isSubmitting}
              className="w-full py-3 bg-gradient-to-r from-green-600 to-blue-500 text-white font-bold rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all text-lg border-2 border-transparent hover:border-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {registerForm.formState.isSubmitting ? 'Đang đăng ký...' : 'Đăng ký'}
            </button>
          </form>
        )}

        {isLogin && (
          <div className="flex justify-between mt-6 text-sm">
            <Link to="/forgot-password" className="text-blue-400 hover:underline">Quên mật khẩu?</Link>
          </div>
        )}
      </div>
    </div>
  );
};