import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to={`/${user.role}`} className="text-xl font-bold">
          Priyarani Software Solutions
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm">{user.name} ({user.role})</span>
          <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
