import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { getMe, login as apiLogin, logout as apiLogout } from '../api/auth.api';
import type { User, LoginCredentials } from '../api/auth.api';
import { navigateByRole } from '../utils/navigation';

// Định nghĩa kiểu cho AuthContext
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  checkUserSession: () => Promise<User | null>;
  session: number;
}

// Tạo Context với giá trị mặc định
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Tạo Provider Component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState(0);

  // Chỉ set loading false, không gọi getMe() ngay khi mount
  useEffect(() => {
    // Chỉ set isLoading = false, không gọi API ngay
    setIsLoading(false);
  }, []);

  // Function để check session khi cần thiết (khi user truy cập protected route)
  const checkUserSession = async () => {
    if (user !== null) return user; // Đã có user rồi
    
    try {
      setIsLoading(true);
      const currentUser = await getMe();
      setUser(currentUser);
      return currentUser;
    } catch (error) {
      console.log('Admin app: No valid session found, user not authenticated');
      setUser(null);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials) => {
    await apiLogin(credentials);
    const currentUser = await getMe();
    setUser(currentUser);
    setSession(prev => prev + 1);
    // Điều hướng sau login theo role (so sánh role viết thường)
    const role = (currentUser.account_role || '').toLowerCase();
    if (role === 'admin') {
      window.location.href = `${import.meta.env.VITE_ADMIN_APP_URL || 'http://localhost:5178'}/admin`;
    } else {
      navigateByRole(role);
    }
  };

  const logout = async () => {
    console.log('Admin app: User logging out');
    await apiLogout();
    // Clear tất cả cache khi logout
    localStorage.clear();
    sessionStorage.clear();
    setUser(null);
    setSession(prev => prev + 1);
    // Redirect về login page sau khi logout
    const loginPageUrl = (import.meta.env.VITE_LOGIN_PAGE_URL || 'http://localhost:5179') + '/login';
    window.location.href = loginPageUrl;
  };

  const value = { user, isLoading, login, logout, checkUserSession, session };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Tạo custom hook để sử dụng AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};