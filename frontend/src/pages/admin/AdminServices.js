import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import API from '../../utils/api';
import Navbar from '../../components/Navbar';

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '', price: '' });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const { data } = await API.get('/services');
    setServices(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/services', formData);
      setShowForm(false);
      setFormData({ name: '', description: '', price: '' });
      fetchServices();
      toast.success('Service created successfully');
    } catch (err) {
      toast.error('Error creating service');
    }
  };

  const handleDelete = async (id) => {
    toast((t) => (
      <div>
        <p className="font-bold mb-2">Delete this service?</p>
        <div className="flex gap-2">
          <button onClick={async () => {
            toast.dismiss(t.id);
            try {
              await API.delete(`/services/${id}`);
              fetchServices();
              toast.success('Service deleted successfully');
            } catch (err) {
              toast.error('Error deleting service');
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
          <h1 className="text-3xl font-bold">Manage Services</h1>
          <button onClick={() => setShowForm(!showForm)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {showForm ? 'Cancel' : 'Add Service'}
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Service Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full border px-4 py-2 rounded mb-4" required />
              <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full border px-4 py-2 rounded mb-4" rows="3" required />
              <input type="number" placeholder="Price (optional)" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full border px-4 py-2 rounded mb-4" />
              <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Create Service</button>
            </form>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map(service => (
            <div key={service._id} className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold">{service.name}</h3>
              <p className="text-gray-600 mt-2">{service.description}</p>
              {service.price && <p className="text-lg font-bold text-green-600 mt-2">${service.price}</p>}
              <button onClick={() => handleDelete(service._id)} className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full">Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminServices;
