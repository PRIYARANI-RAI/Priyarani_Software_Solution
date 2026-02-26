const Project = require('../models/Project');

exports.getAllProjects = async (req, res) => {
  try {
    const query = req.user.role === 'client' ? { client: req.user._id } :
                  req.user.role === 'employee' ? { assignedEmployees: req.user._id } : {};
    
    const projects = await Project.find(query)
      .populate('client', 'name email company')
      .populate('assignedEmployees', 'name email');
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('client', 'name email company')
      .populate('assignedEmployees', 'name email');
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createProject = async (req, res) => {
  try {
    const { name, description, client, assignedEmployees } = req.body;
    const project = await Project.create({ name, description, client, assignedEmployees });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('client', 'name email company')
      .populate('assignedEmployees', 'name email');
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProjectStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('client', 'name email company').populate('assignedEmployees', 'name email');
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
