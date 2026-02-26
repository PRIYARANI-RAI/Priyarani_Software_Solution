const User = require('../models/User');
const Project = require('../models/Project');
const ServiceRequest = require('../models/ServiceRequest');

exports.getDashboardStats = async (req, res) => {
  try {
    const totalEmployees = await User.countDocuments({ role: 'employee' });
    const totalClients = await User.countDocuments({ role: 'client' });
    const totalProjects = await Project.countDocuments();
    const pendingRequests = await ServiceRequest.countDocuments({ status: 'pending' });
    const activeProjects = await Project.countDocuments({ status: 'in-progress' });
    const completedProjects = await Project.countDocuments({ status: 'completed' });

    res.json({
      totalEmployees,
      totalClients,
      totalProjects,
      pendingRequests,
      activeProjects,
      completedProjects
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
