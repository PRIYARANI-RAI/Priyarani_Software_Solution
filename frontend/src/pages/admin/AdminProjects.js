import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import API from '../../utils/api';
import Navbar from '../../components/Navbar';
import { capitalize } from '../../utils/formatHelper';

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '', client: '', assignedEmployees: [] });

  useEffect(() => {
    fetchProjects();
    API.get('/users/role/client').then(res => setClients(res.data));
    API.get('/users/role/employee').then(res => setEmployees(res.data));
  }, []);

  const fetchProjects = async () => {
    const { data } = await API.get('/projects');
    setProjects(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await API.put(`/projects/${editingId}`, formData);
        toast.success('Project updated successfully');
      } else {
        await API.post('/projects', formData);
        toast.success('Project created successfully');
      }
      setShowForm(false);
      setEditingId(null);
      setFormData({ name: '', description: '', client: '', assignedEmployees: [] });
      fetchProjects();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error saving project');
    }
  };

  const handleEdit = (project) => {
    setEditingId(project._id);
    setFormData({
      name: project.name,
      description: project.description,
      client: project.client?._id || '',
      assignedEmployees: project.assignedEmployees?.map(e => e._id) || []
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    toast((t) => (
      <div>
        <p className="font-bold mb-2">Delete this project?</p>
        <div className="flex gap-2">
          <button onClick={async () => {
            toast.dismiss(t.id);
            try {
              await API.delete(`/projects/${id}`);
              fetchProjects();
              toast.success('Project deleted successfully');
            } catch (err) {
              toast.error('Error deleting project');
            }
          }} className="bg-red-500 text-white px-3 py-1 rounded text-sm">Delete</button>
          <button onClick={() => toast.dismiss(t.id)} className="bg-gray-300 px-3 py-1 rounded text-sm">Cancel</button>
        </div>
      </div>
    ), { duration: 5000 });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Manage Projects</h1>
          <button onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({ name: '', description: '', client: '', assignedEmployees: [] });
          }} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {showForm ? 'Cancel' : 'Add Project'}
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Project Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full border px-4 py-2 rounded mb-4" required />
              <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full border px-4 py-2 rounded mb-4" rows="3" required />
              <select value={formData.client} onChange={(e) => setFormData({...formData, client: e.target.value})} className="w-full border px-4 py-2 rounded mb-4" required>
                <option value="">Select Client</option>
                {clients.map(c => <option key={c._id} value={c._id}>{c.name} - {c.company}</option>)}
              </select>
              <select multiple value={formData.assignedEmployees} onChange={(e) => setFormData({...formData, assignedEmployees: Array.from(e.target.selectedOptions, option => option.value)})} className="w-full border px-4 py-2 rounded mb-4" size="5">
                {employees.map(emp => <option key={emp._id} value={emp._id}>{emp.name}</option>)}
              </select>
              <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
                {editingId ? 'Update Project' : 'Create Project'}
              </button>
            </form>
          </div>
        )}

        <div className="grid gap-4">
          {projects.map(project => (
            <div key={project._id} className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold">{project.name}</h3>
                  <p className="text-gray-600 mt-2">{project.description}</p>
                  <p className="text-sm mt-2"><strong>Client:</strong> {project.client?.name} ({project.client?.company})</p>
                  <p className="text-sm"><strong>Employees:</strong> {project.assignedEmployees?.map(e => e.name).join(', ') || 'None'}</p>
                  <span className={`inline-block mt-2 px-3 py-1 rounded text-sm ${project.status === 'completed' ? 'bg-green-200' : project.status === 'in-progress' ? 'bg-blue-200' : 'bg-gray-200'}`}>{capitalize(project.status)}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(project)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Edit</button>
                  <button onClick={() => handleDelete(project._id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProjects;
