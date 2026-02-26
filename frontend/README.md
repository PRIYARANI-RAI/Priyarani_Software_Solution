# Priyarani Software Solution - Frontend

## Tech Stack
- React 18
- React Router v6
- Tailwind CSS
- Axios

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm start
```

Frontend runs on http://localhost:3000

## Default Login Credentials

### Admin
- Email: admin@priyarani.com
- Password: admin123

### Test Employee (Create via Admin)
- Create from Admin Dashboard

### Test Client (Create via Admin)
- Create from Admin Dashboard

## Features by Role

### Admin Portal
- Dashboard with statistics
- Create/manage employees and clients
- Create/manage services
- Approve service requests
- Create/manage projects
- Assign employees to projects
- Messaging system
- Profile management

### Employee Portal
- View assigned projects
- Update project status
- Messaging with admin and clients
- Profile management

### Client Portal
- View projects
- Request new services
- Messaging with admin and employees
- Profile management

## Project Structure
```
src/
├── components/
│   ├── Navbar.js
│   └── PrivateRoute.js
├── context/
│   └── AuthContext.js
├── pages/
│   ├── admin/
│   ├── employee/
│   ├── client/
│   ├── Login.js
│   ├── Messages.js
│   └── Profile.js
├── utils/
│   └── api.js
├── App.js
└── index.js
```
