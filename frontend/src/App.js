import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminProjects from './pages/admin/AdminProjects';
import AdminServices from './pages/admin/AdminServices';
import AdminServiceRequests from './pages/admin/AdminServiceRequests';
import EmployeeDashboard from './pages/employee/EmployeeDashboard';
import ClientDashboard from './pages/client/ClientDashboard';
import Messages from './pages/Messages';
import Profile from './pages/Profile';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" />} />
          
          <Route path="/admin" element={<PrivateRoute roles={['admin']}><AdminDashboard /></PrivateRoute>} />
          <Route path="/admin/users" element={<PrivateRoute roles={['admin']}><AdminUsers /></PrivateRoute>} />
          <Route path="/admin/projects" element={<PrivateRoute roles={['admin']}><AdminProjects /></PrivateRoute>} />
          <Route path="/admin/services" element={<PrivateRoute roles={['admin']}><AdminServices /></PrivateRoute>} />
          <Route path="/admin/service-requests" element={<PrivateRoute roles={['admin']}><AdminServiceRequests /></PrivateRoute>} />
          <Route path="/admin/messages" element={<PrivateRoute roles={['admin']}><Messages /></PrivateRoute>} />
          <Route path="/admin/profile" element={<PrivateRoute roles={['admin']}><Profile /></PrivateRoute>} />
          
          <Route path="/employee" element={<PrivateRoute roles={['employee']}><EmployeeDashboard /></PrivateRoute>} />
          <Route path="/employee/messages" element={<PrivateRoute roles={['employee']}><Messages /></PrivateRoute>} />
          <Route path="/employee/profile" element={<PrivateRoute roles={['employee']}><Profile /></PrivateRoute>} />
          
          <Route path="/client" element={<PrivateRoute roles={['client']}><ClientDashboard /></PrivateRoute>} />
          <Route path="/client/messages" element={<PrivateRoute roles={['client']}><Messages /></PrivateRoute>} />
          <Route path="/client/profile" element={<PrivateRoute roles={['client']}><Profile /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
