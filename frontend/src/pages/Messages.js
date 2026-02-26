import React, { useState, useEffect, useContext } from 'react';
import toast from 'react-hot-toast';
import API from '../utils/api';
import Navbar from '../components/Navbar';
import { AuthContext } from '../context/AuthContext';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ receiver: '', subject: '', message: '' });
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchMessages();
    API.get('/users').then(res => setUsers(res.data.filter(u => u._id !== user.id))).catch(err => console.log(err));
  }, [user.id]);

  const fetchMessages = async () => {
    try {
      const { data } = await API.get('/messages');
      setMessages(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/messages', formData);
      setShowForm(false);
      setFormData({ receiver: '', subject: '', message: '' });
      fetchMessages();
      toast.success('Message sent successfully');
    } catch (err) {
      toast.error('Error sending message');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Messages</h1>
          <button onClick={() => setShowForm(!showForm)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {showForm ? 'Cancel' : 'New Message'}
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <form onSubmit={handleSubmit}>
              <select value={formData.receiver} onChange={(e) => setFormData({...formData, receiver: e.target.value})} className="w-full border px-4 py-2 rounded mb-4" required>
                <option value="">Select Receiver</option>
                {users.map(u => <option key={u._id} value={u._id}>{u.name} ({u.role})</option>)}
              </select>
              <input type="text" placeholder="Subject" value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} className="w-full border px-4 py-2 rounded mb-4" required />
              <textarea placeholder="Message" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full border px-4 py-2 rounded mb-4" rows="4" required />
              <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Send Message</button>
            </form>
          </div>
        )}

        <div className="grid gap-4">
          {messages.map(msg => (
            <div key={msg._id} className={`p-6 rounded-lg shadow ${msg.sender._id === user.id ? 'bg-blue-50' : 'bg-white'}`}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-bold">{msg.sender._id === user.id ? 'To: ' + msg.receiver.name : 'From: ' + msg.sender.name}</p>
                  <p className="text-sm text-gray-600">{msg.sender.role} → {msg.receiver.role}</p>
                </div>
                <span className="text-xs text-gray-500">{new Date(msg.createdAt).toLocaleString()}</span>
              </div>
              <h3 className="font-bold text-lg">{msg.subject}</h3>
              <p className="text-gray-700 mt-2">{msg.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Messages;
