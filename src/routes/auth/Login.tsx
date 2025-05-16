import React, { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom';

interface LoginFormInputs {
  username: string;
  password: string;
}

const schema = yup.object().shape({
  username: yup.string().required('Vui lòng nhập tên đăng nhập'),
  password: yup.string().required('Vui lòng nhập mật khẩu'),
});

const Login: React.FC = () => {
  const [loginType, setLoginType] = useState<'admin' | 'client'>('admin');
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
    mode: 'onChange'
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    console.log(data, { loginType });
    // Xử lý đăng nhập ở đây
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
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