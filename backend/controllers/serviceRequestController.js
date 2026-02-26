const ServiceRequest = require('../models/ServiceRequest');

exports.getAllServiceRequests = async (req, res) => {
  try {
    const query = req.user.role === 'client' ? { client: req.user._id } : {};
    const requests = await ServiceRequest.find(query)
      .populate('client', 'name email company')
      .populate('service', 'name description');
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createServiceRequest = async (req, res) => {
  try {
    const { service, description } = req.body;
    const request = await ServiceRequest.create({
      client: req.user._id,
      service,
      description
    });
    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateServiceRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const request = await ServiceRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('client', 'name email company').populate('service', 'name description');
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
