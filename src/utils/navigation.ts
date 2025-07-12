/**
 * Navigation utilities for multi-app Agency Management System
 */

// App URLs configuration
export const APP_URLS = {
  LOGIN_PAGE: import.meta.env.VITE_LOGIN_PAGE_URL || 'http://localhost:5179',
  ADMIN_APP: import.meta.env.VITE_ADMIN_APP_URL || 'http://localhost:5178',
  STAFF_APP: import.meta.env.VITE_STAFF_APP_URL || 'http://localhost:5176',
      AGENCY_APP: import.meta.env.VITE_AGENCY_APP_URL || 'http://localhost:5175',
  API_BASE: import.meta.env.VITE_API_BASE_URL || '/api/v1',
};

/**
 * Navigate to login page (cross-app navigation)
 */
export const navigateToLogin = () => {
  window.location.href = `${APP_URLS.LOGIN_PAGE}/login`;
};

/**
 * Navigate to register page (cross-app navigation)
 */
export const navigateToRegister = () => {
  window.location.href = `${APP_URLS.LOGIN_PAGE}/register`;
};

/**
 * Navigate based on user role after authentication
 */
export const navigateByRole = (role: string) => {
  switch (role) {
    case 'admin':
      window.location.href = `${APP_URLS.ADMIN_APP}/admin`;
      break;
    case 'staff':
      window.location.href = APP_URLS.STAFF_APP;
      break;
    case 'agent':
      window.location.href = APP_URLS.AGENCY_APP;
      break;
    default:
      console.warn(`Unknown role: ${role}, redirecting to login`);
      navigateToLogin();
  }
};

/**
 * Navigate to homepage (usually admin site)
 */
export const navigateToHome = () => {
  window.location.href = APP_URLS.ADMIN_APP;
};

/**
 * Logout and return to admin site homepage
 */
export const logoutAndRedirect = () => {
  // Clear any local storage/session data if needed
  localStorage.clear();
  sessionStorage.clear();
  
  // Redirect to admin site homepage (not login page)
  const adminSiteUrl = import.meta.env.VITE_ADMIN_SITE_URL || 'http://localhost:5178';
  window.location.href = adminSiteUrl;
};
