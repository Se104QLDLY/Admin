import { Routes, Route } from 'react-router-dom';
import Home from './home';
import Login from './auth/Login';
import Register from './auth/Register';
import DashboardPage from './dashboard';
import ImportPage from './import';
import AddImportPage from './import/add';
import ExportPage from './export';
import ExportDetailPage from './export/detail';
import AddExportPage from './export/add';
import SearchPage from './search';
import ReportsPage from './reports';
import SettingsPage from './settings';
import PaymentPage from './payment';
import PaymentDetailPage from './payment/detail';
import AddPaymentReceipt from './payment/add';
import AccountPage from './account';
import AgencyPage from './agencies';
import AddAgencyPage from './agencies/add';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/landing" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Admin routes */}
      <Route path="/admin" element={<DashboardPage />} />
      <Route path="/import" element={<ImportPage />} />
      <Route path="/import/add" element={<AddImportPage />} />
      <Route path="/export" element={<ExportPage />} />
      <Route path="/export/detail/:id" element={<ExportDetailPage />} />
      <Route path="/export/add" element={<AddExportPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/payment/detail/:id" element={<PaymentDetailPage />} />
      <Route path="/payment/add" element={<AddPaymentReceipt />} />
      <Route path="/reports" element={<ReportsPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/account" element={<AccountPage />} />
      <Route path="/agencies" element={<AgencyPage />} />
      <Route path="/agencies/add" element={<AddAgencyPage />} />
    </Routes>
  );
};

export default AppRoutes;