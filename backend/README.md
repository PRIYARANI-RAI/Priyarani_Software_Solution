# Priyarani Software Solution - Backend

## Tech Stack
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- bcryptjs

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
- `.env`
- Update MongoDB URI if needed

3. Start MongoDB (if running locally):
```bash
mongod
```

4. Seed admin user:
```bash
node seed.js
```

5. Start server:
```bash
npm run dev
```

Server runs on http://localhost:5000

## API Documentation
Swagger UI: http://localhost:5000/api-docs

## Default Admin Credentials
- Email: admin@priyarani.com
- Password: admin123

## API Endpoints

### Auth
- POST /api/auth/login
- POST /api/auth/register
- GET /api/auth/profile
- PUT /api/auth/profile

### Users (Admin only)
- GET /api/users
- GET /api/users/role/:role
- POST /api/users
- DELETE /api/users/:id

### Projects
- GET /api/projects
- GET /api/projects/:id
- POST /api/projects (Admin)
- PUT /api/projects/:id (Admin)
- PATCH /api/projects/:id/status (Admin, Employee)
- DELETE /api/projects/:id (Admin)

### Services
- GET /api/services
- POST /api/services (Admin)
- DELETE /api/services/:id (Admin)

### Service Requests
- GET /api/service-requests
- POST /api/service-requests (Client)
- PATCH /api/service-requests/:id/status (Admin)

### Messages
- GET /api/messages
- POST /api/messages
- PATCH /api/messages/:id/read