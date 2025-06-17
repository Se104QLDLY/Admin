import { Routes, Route } from 'react-router-dom';
import Home from './home';
import About from './about';
import Login from './auth/Login';
import Register from './auth/Register';
import ForgotPassword from './auth/ForgotPassword';
import DashboardPage from './dashboard';
import ImportPage from './import';
import AddImportPage from './import/add';
import ViewImportPage from './import/view';
import EditImportPage from './import/edit';
import ExportPage from './export';
import ExportDetailPage from './export/detail';
import AddExportPage from './export/add';
import EditExportPage from './export/edit';
import SearchPage from './search';
import ReportsPage from './reports';
import AddReportPage from './reports/add';
import ReportView from './reports/view';
import ReportEdit from './reports/edit';
import PaymentPage from './payment';
import PaymentDetailPage from './payment/detail';
import AddPaymentReceipt from './payment/add';
import PaymentEdit from './payment/edit';
import AccountPage from './account';
import AddAccountPage from './account/add';
import AccountView from './account/view';
import AccountEdit from './account/edit';
import AgencyPage from './agencies';
import AddAgencyPage from './agencies/add';
import ViewAgencyPage from './agencies/view';
import EditAgencyPage from './agencies/edit';
import RegulationsPage from './regulations';
import AddRegulationPage from './regulations/add';
import ViewRegulationPage from './regulations/view';
import EditRegulationPage from './regulations/edit';
import NotFound from './NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/landing" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      
      {/* Admin routes */}
      <Route path="/admin" element={<DashboardPage />} />
      <Route path="/import" element={<ImportPage />} />
      <Route path="/import/add" element={<AddImportPage />} />
      <Route path="/import/view/:id" element={<ViewImportPage />} />
      <Route path="/import/edit/:id" element={<EditImportPage />} />
      <Route path="/export" element={<ExportPage />} />
      <Route path="/export/detail/:id" element={<ExportDetailPage />} />
      <Route path="/export/add" element={<AddExportPage />} />
      <Route path="/export/edit/:id" element={<EditExportPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/payment/detail/:id" element={<PaymentDetailPage />} />
      <Route path="/payment/add" element={<AddPaymentReceipt />} />
      <Route path="/payment/edit/:id" element={<PaymentEdit />} />
      <Route path="/reports" element={<ReportsPage />} />
      <Route path="/reports/add" element={<AddReportPage />} />
      <Route path="/reports/view/:id" element={<ReportView />} />
      <Route path="/reports/edit/:id" element={<ReportEdit />} />
      <Route path="/account" element={<AccountPage />} />
      <Route path="/account/add" element={<AddAccountPage />} />
      <Route path="/account/view/:id" element={<AccountView />} />
      <Route path="/account/edit/:id" element={<AccountEdit />} />
      <Route path="/agencies" element={<AgencyPage />} />
      <Route path="/agencies/add" element={<AddAgencyPage />} />
      <Route path="/agencies/view/:id" element={<ViewAgencyPage />} />
      <Route path="/agencies/edit/:id" element={<EditAgencyPage />} />
      <Route path="/regulations" element={<RegulationsPage />} />
      <Route path="/regulations/add" element={<AddRegulationPage />} />
      <Route path="/regulations/view/:id" element={<ViewRegulationPage />} />
      <Route path="/regulations/edit/:id" element={<EditRegulationPage />} />
      
      {/* 404 page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;