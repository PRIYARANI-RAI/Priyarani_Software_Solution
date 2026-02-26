import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import API from '../../utils/api';
import Navbar from '../../components/Navbar';
import { capitalize } from '../../utils/formatHelper';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'employee', company: '', phone: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data } = await API.get('/users');
    setUsers(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/users', formData);
      setShowForm(false);
      setFormData({ name: '', email: '', password: '', role: 'employee', company: '', phone: '' });
      fetchUsers();
      toast.success('User created successfully');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error creating user');
    }
  };

  const handleDelete = async (id) => {
    toast((t) => (
      <div>
        <p className="font-bold mb-2">Delete this user?</p>
        <div className="flex gap-2">
          <button onClick={async () => {
            toast.dismiss(t.id);
            try {
              await API.delete(`/users/${id}`);
              fetchUsers();
              toast.success('User deleted successfully');
            } catch (err) {
              toast.error('Error deleting user');
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
          <h1 className="text-3xl font-bold">Manage Users</h1>
          <button onClick={() => setShowForm(!showForm)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {showForm ? 'Cancel' : 'Add User'}
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="border px-4 py-2 rounded" required />
              <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="border px-4 py-2 rounded" required />
              <input type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="border px-4 py-2 rounded" required />
              <select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="border px-4 py-2 rounded">
                <option value="employee">Employee</option>
                <option value="client">Client</option>
              </select>
              <input type="text" placeholder="Company" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} className="border px-4 py-2 rounded" />
              <input type="text" placeholder="Phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="border px-4 py-2 rounded" />
              <button type="submit" className="col-span-2 bg-green-600 text-white py-2 rounded hover:bg-green-700">Create User</button>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Role</th>
                <th className="px-4 py-3 text-left">Company</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id} className="border-t">
                  <td className="px-4 py-3">{user.name}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-1 rounded text-xs ${user.role === 'admin' ? 'bg-red-200' : user.role === 'employee' ? 'bg-blue-200' : 'bg-green-200'}`}>{capitalize(user.role)}</span></td>
                  <td className="px-4 py-3">{user.company || '-'}</td>
                  <td className="px-4 py-3">
                    {user.role !== 'admin' && (
                      <button onClick={() => handleDelete(user._id)} className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">Delete</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
