import { Routes, Route } from 'react-router-dom';
import Home from './home';
import About from './about';
import { LoginPage } from '../pages/LoginPage';
import Register from './auth/Register';
import ForgotPassword from './auth/ForgotPassword';
import DashboardPage from './dashboard';
import ReportsPage from './reports';
import AddReportPage from './reports/add';
import ReportView from './reports/view';
import ReportEdit from './reports/edit';
import AccountPage from './account';
import AddAccountPage from './account/add';
import AccountView from './account/view';
import AccountEdit from './account/edit';
import RegulationsPage from './regulations';
import AddRegulationPage from './regulations/add';
import ViewRegulationPage from './regulations/view';
import EditRegulationPage from './regulations/edit';
import NotFound from './NotFound';
import AddAgencyPage from './agencies/add';
import ViewAgencyPage from './agencies/view';
import EditAgencyPage from './agencies/edit';
import AgencyPage from './agencies/index';
import AdminReportsPage from './reports';
import { ProtectedRoute } from './ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/landing" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      
      {/* Admin routes duoc protect */}
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<DashboardPage />} />
        <Route path="/reports" element={<AdminReportsPage />} />
        <Route path="/reports/add" element={<AddReportPage />} />
        <Route path="/reports/view/:id" element={<ReportView />} />
        <Route path="/reports/edit/:id" element={<ReportEdit />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/account/add" element={<AddAccountPage />} />
        <Route path="/account/view/:id" element={<AccountView />} />
        <Route path="/account/edit/:id" element={<AccountEdit />} />
        <Route path="/regulations" element={<RegulationsPage />} />
        <Route path="/regulations/add" element={<AddRegulationPage />} />
        <Route path="/regulations/view/:id" element={<ViewRegulationPage />} />
        <Route path="/regulations/edit/:id" element={<EditRegulationPage />} />
        <Route path="/agencies/add" element={<AddAgencyPage />} />
        <Route path="/agencies/view/:id" element={<ViewAgencyPage />} />
        <Route path="/agencies/edit/:id" element={<EditAgencyPage />} />
        <Route path="/agencies" element={<AgencyPage />} />
      </Route>
      
      {/* 404 page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;