# MERN Notes Application

A full-stack notes application built with MongoDB, Express.js, React, and Node.js (MERN stack). This application allows users to create, edit, delete, and pin notes with user authentication.



## Features

- **User Authentication**
  - Sign up with email and password
  - Login/logout functionality
  - Protected routes

- **Notes Management**
  - Create new notes
  - Edit existing notes
  - Delete notes
  - Pin/unpin important notes
  - Search through notes

- **Responsive Design**
  - Works on desktop and mobile devices

## Technologies Used

### Frontend
- React.js
- Redux Toolkit (State management)
- React Router (Routing)
- Axios (HTTP client)
- Tailwind CSS (Styling)
- React Toastify (Notifications)
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB (Database)
- Mongoose (ODM)
- JWT (Authentication)
- Bcrypt (Password hashing)
- CORS (Cross-origin resource sharing)
- Cookie-parser

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account or local MongoDB installation

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/guptak-hash/MERN_Note.git
   cd MERN_Note

2. **Backend Setup**
   cd note-backend
   npm install

3. **Frontend Setup**
   cd ../note-frontend
   npm install

4. **Environment Variables**
  Create a .env file in the note-backend directory with the following variables:
  MONGODB_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret_key
  PORT=4000

### Running the Application

1. **Start the backend server**
  cd note-backend
  node server.js

2. **Start the frontend development server**
  cd ../note-frontend
  npm run dev

### Access the application
 Frontend: http://localhost:5173

Backend: http://localhost:4000

### Demo Link
https://mern-note-frontend-fnpu.onrender.com