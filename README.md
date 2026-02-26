# Priyarani Software Solution

A comprehensive full-stack web application for managing software projects, clients, employees, and services with role-based access control.

## 📋 Table of Contents
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Setup Instructions](#setup-instructions)
- [Database Setup](#database-setup)
- [Test Login Credentials](#test-login-credentials)
- [Screenshots](#screenshots)
- [Project Structure](#project-structure)

---

## 🚀 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Frontend
- **React 18** - UI library
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Hot Toast** - Notifications

---

## ✨ Features

### Admin Portal
- Dashboard with real-time statistics
- Create and manage employees and clients
- Create and manage services
- Approve/reject client service requests
- Create, edit, and delete projects
- Assign/reassign employees to projects
- Messaging system with all users
- Profile management

### Employee Portal
- View assigned projects
- Update project status (Pending, In Progress, Completed, On Hold)
- Message admin and clients
- Profile management
- Cannot unassign themselves from projects

### Client Portal
- View their projects
- Request new services
- Message admin and assigned employees
- Profile management

### Service Request Flow
1. Client requests a service
2. Admin reviews and approves/rejects
3. Upon approval, project is automatically created
4. Employees are assigned to the project

---

## 📦 Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in backend directory:
```env
MONGODB_URI=mongodb://localhost:27017/priyarani_software
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
```

4. Seed admin user:
```bash
node seed.js
```

5. Start backend server:
```bash
npm run dev
```

Backend runs on **http://localhost:5000**

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start frontend development server:
```bash
npm start
```

Frontend runs on **http://localhost:3000**

---

## 🗄️ Database Setup

### Option 1: Local MongoDB

1. Install MongoDB on your system
2. Start MongoDB service:
```bash
mongod
```
3. Database will be created automatically on first run

### Option 2: MongoDB Atlas (Cloud)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env` file:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/priyarani_software
```

### Database Schema

The application uses 5 main collections:

1. **Users** - Admin, Employees, and Clients
2. **Projects** - Project details with client and employee assignments
3. **Services** - Available services offered
4. **ServiceRequests** - Client service requests
5. **Messages** - Communication between users

---

## Test Login Credentials

### Admin
- **Email:** admin@priyarani.com
- **Password:** admin123

### Employee
- **Email:** john@yopmail.com
- **Password:** John@123

### Client
- **Email:** testuser@yopmail.com
- **Password:** Test@123

> **Note:** Admin credentials are seeded automatically. Employee and Client accounts need to be created by admin or use the credentials above if already seeded.

---

## 📸 Screenshots

### Login Page
![Login Page](screenshots/login.png)

### Admin Dashboard
![Admin Dashboard](screenshots/admin-dashboard.png)

### Manage Projects
![Manage Projects](screenshots/manage-projects.png)

### Service Requests
![Service Requests](screenshots/service-requests.png)

### Employee Dashboard
![Employee Dashboard](screenshots/employee-dashboard.png)

### Client Dashboard
![Client Dashboard](screenshots/client-dashboard.png)

### Messaging System
![Messaging](screenshots/messaging.png)

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control (RBAC)
- Protected API routes
- Automatic logout on token expiration
- Authorization middleware


## 👨‍💻 Development

### Backend Development
```bash
cd backend
npm run dev  # Runs with nodemon for auto-restart
swagger url - http://localhost:5000/api-docs/
```

### Frontend Development
```bash
cd frontend
npm start  # Runs on http://localhost:3000
```