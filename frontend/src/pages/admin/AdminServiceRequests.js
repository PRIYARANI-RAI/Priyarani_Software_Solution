import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import API from '../../utils/api';
import Navbar from '../../components/Navbar';
import { capitalize } from '../../utils/formatHelper';

const AdminServiceRequests = () => {
  const [requests, setRequests] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchRequests();
    API.get('/users/role/employee').then(res => setEmployees(res.data));
  }, []);

  const fetchRequests = async () => {
    const { data } = await API.get('/service-requests');
    setRequests(data);
  };

  const handleApprove = async (id) => {
    const request = requests.find(r => r._id === id);
    
    toast((t) => (
      <div className="w-80">
        <p className="font-bold mb-3">Create Project from Request</p>
        <form onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const projectName = formData.get('projectName');
          const projectDesc = formData.get('projectDesc');
          const selectedEmployees = Array.from(e.target.employees.selectedOptions).map(opt => opt.value);
          
          toast.dismiss(t.id);
          try {
            await API.post('/projects', {
              name: projectName,
              description: projectDesc,
              client: request.client._id,
              assignedEmployees: selectedEmployees
            });
            await API.patch(`/service-requests/${id}/status`, { status: 'approved' });
            fetchRequests();
            toast.success('Project created successfully!');
          } catch (err) {
            toast.error(err.response?.data?.message || 'Error creating project');
          }
        }}>
          <input name="projectName" placeholder="Project name" className="w-full border px-3 py-2 rounded mb-2" required />
          <textarea name="projectDesc" placeholder="Description" className="w-full border px-3 py-2 rounded mb-2" rows="2" required />
          <select name="employees" multiple className="w-full border px-3 py-2 rounded mb-3" size="4">
            {employees.map(emp => <option key={emp._id} value={emp._id}>{emp.name}</option>)}
          </select>
          <p className="text-xs text-gray-500 mb-3">Hold Ctrl/Cmd to select multiple employees</p>
          <div className="flex gap-2">
            <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded text-sm">Create</button>
            <button type="button" onClick={() => toast.dismiss(t.id)} className="bg-gray-300 px-3 py-1 rounded text-sm">Cancel</button>
          </div>
        </form>
      </div>
    ), { duration: Infinity });
  };

  const handleReject = async (id) => {
    toast((t) => (
      <div>
        <p className="font-bold mb-2">Reject this request?</p>
        <div className="flex gap-2">
          <button onClick={async () => {
            toast.dismiss(t.id);
            try {
              await API.patch(`/service-requests/${id}/status`, { status: 'rejected' });
              fetchRequests();
              toast.success('Request rejected');
            } catch (err) {
              toast.error('Error rejecting request');
            }
          }} className="bg-red-500 text-white px-3 py-1 rounded text-sm">Reject</button>
          <button onClick={() => toast.dismiss(t.id)} className="bg-gray-300 px-3 py-1 rounded text-sm">Cancel</button>
        </div>
      </div>
    ), { duration: 5000 });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Service Requests</h1>
        <div className="grid gap-4">
          {requests.map(req => (
            <div key={req._id} className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold">{req.service?.name}</h3>
                  <p className="text-gray-600 mt-2">{req.description}</p>
                  <p className="text-sm mt-2"><strong>Client:</strong> {req.client?.name} ({req.client?.company})</p>
                  <span className={`inline-block mt-2 px-3 py-1 rounded text-sm ${req.status === 'approved' ? 'bg-green-200' : req.status === 'rejected' ? 'bg-red-200' : 'bg-yellow-200'}`}>{capitalize(req.status)}</span>
                </div>
                {req.status === 'pending' && (
                  <div className="flex gap-2">
                    <button onClick={() => handleApprove(req._id)} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Approve</button>
                    <button onClick={() => handleReject(req._id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Reject</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminServiceRequests;
