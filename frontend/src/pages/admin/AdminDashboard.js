import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../utils/api';
import Navbar from '../../components/Navbar';

const AdminDashboard = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    API.get('/dashboard/stats').then(res => setStats(res.data)).catch(err => console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 text-sm">Total Employees</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.totalEmployees || 0}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 text-sm">Total Clients</h3>
            <p className="text-3xl font-bold text-green-600">{stats.totalClients || 0}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 text-sm">Total Projects</h3>
            <p className="text-3xl font-bold text-purple-600">{stats.totalProjects || 0}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 text-sm">Pending Requests</h3>
            <p className="text-3xl font-bold text-orange-600">{stats.pendingRequests || 0}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 text-sm">Active Projects</h3>
            <p className="text-3xl font-bold text-indigo-600">{stats.activeProjects || 0}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 text-sm">Completed Projects</h3>
            <p className="text-3xl font-bold text-teal-600">{stats.completedProjects || 0}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/admin/users" className="bg-blue-600 text-white p-6 rounded-lg shadow hover:bg-blue-700 transition">
            <h3 className="text-xl font-bold">Manage Users</h3>
            <p className="text-sm mt-2">Create and manage employees & clients</p>
          </Link>
          <Link to="/admin/projects" className="bg-green-600 text-white p-6 rounded-lg shadow hover:bg-green-700 transition">
            <h3 className="text-xl font-bold">Manage Projects</h3>
            <p className="text-sm mt-2">View and assign projects</p>
          </Link>
          <Link to="/admin/services" className="bg-purple-600 text-white p-6 rounded-lg shadow hover:bg-purple-700 transition">
            <h3 className="text-xl font-bold">Manage Services</h3>
            <p className="text-sm mt-2">Create and manage services</p>
          </Link>
          <Link to="/admin/service-requests" className="bg-orange-600 text-white p-6 rounded-lg shadow hover:bg-orange-700 transition">
            <h3 className="text-xl font-bold">Service Requests</h3>
            <p className="text-sm mt-2">Approve client requests</p>
          </Link>
          <Link to="/admin/messages" className="bg-indigo-600 text-white p-6 rounded-lg shadow hover:bg-indigo-700 transition">
            <h3 className="text-xl font-bold">Messages</h3>
            <p className="text-sm mt-2">View and send messages</p>
          </Link>
          <Link to="/admin/profile" className="bg-teal-600 text-white p-6 rounded-lg shadow hover:bg-teal-700 transition">
            <h3 className="text-xl font-bold">Profile</h3>
            <p className="text-sm mt-2">Edit your profile</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
