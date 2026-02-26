import React, { useState, useContext } from 'react';
import toast from 'react-hot-toast';
import API from '../utils/api';
import Navbar from '../components/Navbar';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user, fetchProfile } = useContext(AuthContext);
  const [formData, setFormData] = useState({ name: user?.name || '', phone: user?.phone || '', company: user?.company || '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put('/auth/profile', formData);
      await fetchProfile();
      toast.success('Profile updated successfully');
    } catch (err) {
      toast.error('Error updating profile');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
          <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Name</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full border px-4 py-2 rounded" required />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Phone</label>
              <input type="text" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full border px-4 py-2 rounded" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Company</label>
              <input type="text" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} className="w-full border px-4 py-2 rounded" />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Update Profile</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
