require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');

    const adminExists = await User.findOne({ email: 'admin@priyarani.com' });
    if (adminExists) {
      console.log('Admin already exists');
      process.exit();
    }

    await User.create({
      name: 'Admin',
      email: 'admin@priyarani.com',
      password: 'admin123',
      role: 'admin',
      company: 'Priyarani Software Solutions'
    });

    console.log('Admin user created successfully');
    console.log('Email: admin@priyarani.com');
    console.log('Password: admin123');
    process.exit();
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

seedAdmin();
