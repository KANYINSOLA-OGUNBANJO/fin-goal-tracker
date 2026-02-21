import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{
      backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff',
      color: theme === 'dark' ? '#ffffff' : '#333333',
      padding: '1rem 2rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      {/* Logo */}
      <Link to="/dashboard" style={{
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#10b981',
        textDecoration: 'none'
      }}>
        FinGoal
      </Link>

      {/* Navigation Links */}
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <Link to="/dashboard" style={{
          color: theme === 'dark' ? '#ffffff' : '#333333',
          textDecoration: 'none',
          fontWeight: '500'
        }}>
          Dashboard
        </Link>
        <Link to="/goals" style={{
          color: theme === 'dark' ? '#ffffff' : '#333333',
          textDecoration: 'none',
          fontWeight: '500'
        }}>
          Goals
        </Link>
        <Link to="/board" style={{
          color: theme === 'dark' ? '#ffffff' : '#333333',
          textDecoration: 'none',
          fontWeight: '500'
        }}>
          Board
        </Link>
        <Link to="/profile" style={{
          color: theme === 'dark' ? '#ffffff' : '#333333',
          textDecoration: 'none',
          fontWeight: '500'
        }}>
          Profile
        </Link>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: theme === 'dark' ? '#333' : '#f0f0f0',
            color: theme === 'dark' ? '#ffffff' : '#333333',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: '500'
          }}
        >
          {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>

        {/* User Info & Logout */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.9rem' }}>
            {user?.email || 'User'}
          </span>
          <button
            onClick={handleLogout}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;