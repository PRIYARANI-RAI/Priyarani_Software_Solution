import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import API from '../../utils/api';
import Navbar from '../../components/Navbar';
import { capitalize } from '../../utils/formatHelper';

const ClientDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ service: '', description: '' });

  useEffect(() => {
    API.get('/projects').then(res => setProjects(res.data));
    API.get('/services').then(res => setServices(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/service-requests', formData);
      setShowForm(false);
      setFormData({ service: '', description: '' });
      toast.success('Service request submitted successfully');
    } catch (err) {
      toast.error('Error submitting request');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Client Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button onClick={() => setShowForm(!showForm)} className="bg-purple-600 text-white p-6 rounded-lg shadow hover:bg-purple-700">
            <h3 className="text-xl font-bold">Request Service</h3>
            <p className="text-sm mt-2">Submit new service request</p>
          </button>
          <Link to="/client/messages" className="bg-blue-600 text-white p-6 rounded-lg shadow hover:bg-blue-700">
            <h3 className="text-xl font-bold">Messages</h3>
            <p className="text-sm mt-2">View and send messages</p>
          </Link>
          <Link to="/client/profile" className="bg-green-600 text-white p-6 rounded-lg shadow hover:bg-green-700">
            <h3 className="text-xl font-bold">Profile</h3>
            <p className="text-sm mt-2">Edit your profile</p>
          </Link>
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-xl font-bold mb-4">Request New Service</h2>
            <form onSubmit={handleSubmit}>
              <select value={formData.service} onChange={(e) => setFormData({...formData, service: e.target.value})} className="w-full border px-4 py-2 rounded mb-4" required>
                <option value="">Select Service</option>
                {services.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
              </select>
              <textarea placeholder="Describe your requirements" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full border px-4 py-2 rounded mb-4" rows="4" required />
              <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Submit Request</button>
            </form>
          </div>
        )}

        <h2 className="text-2xl font-bold mb-4">My Projects</h2>
        <div className="grid gap-4">
          {projects.map(project => (
            <div key={project._id} className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold">{project.name}</h3>
              <p className="text-gray-600 mt-2">{project.description}</p>
              <p className="text-sm mt-2"><strong>Assigned Employees:</strong> {project.assignedEmployees?.map(e => e.name).join(', ') || 'None'}</p>
              <span className={`inline-block mt-2 px-3 py-1 rounded text-sm ${project.status === 'completed' ? 'bg-green-200' : 'bg-blue-200'}`}>{capitalize(project.status)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
