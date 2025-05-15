import { Routes, Route } from 'react-router-dom';
import Home from './home';
import Login from './auth/Login';
import Register from './auth/Register';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AppRoutes; 