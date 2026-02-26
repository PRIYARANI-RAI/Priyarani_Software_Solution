import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../utils/api';
import Navbar from '../../components/Navbar';
import { capitalize } from '../../utils/formatHelper';

const EmployeeDashboard = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    API.get('/projects').then(res => setProjects(res.data));
  }, []);

  const handleStatusUpdate = async (id, status) => {
    await API.patch(`/projects/${id}/status`, { status });
    API.get('/projects').then(res => setProjects(res.data));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Employee Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link to="/employee/messages" className="bg-blue-600 text-white p-6 rounded-lg shadow hover:bg-blue-700">
            <h3 className="text-xl font-bold">Messages</h3>
            <p className="text-sm mt-2">View and send messages</p>
          </Link>
          <Link to="/employee/profile" className="bg-green-600 text-white p-6 rounded-lg shadow hover:bg-green-700">
            <h3 className="text-xl font-bold">Profile</h3>
            <p className="text-sm mt-2">Edit your profile</p>
          </Link>
        </div>

        <h2 className="text-2xl font-bold mb-4">Assigned Projects</h2>
        <div className="grid gap-4">
          {projects.map(project => (
            <div key={project._id} className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold">{project.name}</h3>
              <p className="text-gray-600 mt-2">{project.description}</p>
              <p className="text-sm mt-2"><strong>Client:</strong> {project.client?.name}</p>
              <div className="flex items-center gap-4 mt-4">
                <span className={`px-3 py-1 rounded text-sm ${project.status === 'completed' ? 'bg-green-200' : 'bg-blue-200'}`}>{capitalize(project.status)}</span>
                <select onChange={(e) => handleStatusUpdate(project._id, e.target.value)} value={project.status} className="border px-3 py-1 rounded">
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="on-hold">On Hold</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
