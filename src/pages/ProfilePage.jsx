import { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import useLocalStorage from '../hooks/useLocalStorage';

function ProfilePage() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [goals] = useLocalStorage('fingoal_goals', []);
  const [tasks] = useLocalStorage('fingoal_tasks', []);
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: user?.name || user?.email?.split('@')[0] || 'User',
    email: user?.email || '',
    bio: 'Finance professional transitioning to software engineering'
  });

  const handleSave = () => {
    // In a real app, this would update the user in the backend
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const completedTasks = tasks.filter(t => t.status === 'done').length;
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div>
      <Navbar />
      <div style={{ padding: '2rem', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ marginBottom: '2rem', color: '#333' }}>Profile</h1>

          {/* Profile Card */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '2rem',
            marginBottom: '2rem',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
              {/* Avatar */}
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: '#10b981',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                fontWeight: 'bold',
                marginRight: '1.5rem'
              }}>
                {user?.avatar || userInfo.name.substring(0, 2).toUpperCase()}
              </div>

              {/* User Info */}
              <div style={{ flex: 1 }}>
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      name="name"
                      value={userInfo.name}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.5rem',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        marginBottom: '0.5rem'
                      }}
                    />
                    <input
                      type="email"
                      name="email"
                      value={userInfo.email}
                      onChange={handleChange}
                      disabled
                      style={{
                        width: '100%',
                        padding: '0.5rem',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '1rem',
                        color: '#666',
                        backgroundColor: '#f5f5f5'
                      }}
                    />
                  </>
                ) : (
                  <>
                    <h2 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>
                      {userInfo.name}
                    </h2>
                    <p style={{ margin: 0, color: '#666' }}>{userInfo.email}</p>
                  </>
                )}
              </div>

              {/* Edit Button */}
              <button
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                style={{
                  padding: '0.5rem 1.5rem',
                  backgroundColor: isEditing ? '#10b981' : '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                {isEditing ? 'Save' : 'Edit'}
              </button>
            </div>

            {/* Bio */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#333' }}>
                Bio
              </label>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={userInfo.bio}
                  onChange={handleChange}
                  rows="3"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '1rem',
                    resize: 'vertical',
                    boxSizing: 'border-box'
                  }}
                />
              ) : (
                <p style={{ color: '#666', lineHeight: '1.6' }}>{userInfo.bio}</p>
              )}
            </div>
          </div>

          {/* Stats Card */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '2rem',
            marginBottom: '2rem',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ margin: '0 0 1.5rem 0', color: '#333' }}>Your Statistics</h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem'
            }}>
              <div style={{ textAlign: 'center' }}>
                <p style={{ margin: '0 0 0.5rem 0', color: '#666', fontSize: '0.9rem' }}>
                  Total Goals
                </p>
                <h2 style={{ margin: 0, color: '#10b981', fontSize: '2rem' }}>
                  {goals.length}
                </h2>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ margin: '0 0 0.5rem 0', color: '#666', fontSize: '0.9rem' }}>
                  Total Tasks
                </p>
                <h2 style={{ margin: 0, color: '#3b82f6', fontSize: '2rem' }}>
                  {totalTasks}
                </h2>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ margin: '0 0 0.5rem 0', color: '#666', fontSize: '0.9rem' }}>
                  Completion Rate
                </p>
                <h2 style={{ margin: 0, color: '#8b5cf6', fontSize: '2rem' }}>
                  {completionRate}%
                </h2>
              </div>
            </div>
          </div>

          {/* Settings Card */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '2rem',
            marginBottom: '2rem',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ margin: '0 0 1.5rem 0', color: '#333' }}>Settings</h3>

            {/* Theme Toggle */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1rem',
              borderRadius: '6px',
              backgroundColor: '#f9fafb',
              marginBottom: '1rem'
            }}>
              <div>
                <h4 style={{ margin: '0 0 0.25rem 0', color: '#333' }}>Theme</h4>
                <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                  Current: {theme === 'dark' ? 'Dark' : 'Light'} mode
                </p>
              </div>
              <button
                onClick={toggleTheme}
                style={{
                  padding: '0.5rem 1.5rem',
                  backgroundColor: theme === 'dark' ? '#333' : '#f0f0f0',
                  color: theme === 'dark' ? '#fff' : '#333',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
              </button>
            </div>

            {/* Logout */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1rem',
              borderRadius: '6px',
              backgroundColor: '#fef2f2'
            }}>
              <div>
                <h4 style={{ margin: '0 0 0.25rem 0', color: '#333' }}>Account</h4>
                <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                  Sign out of your account
                </p>
              </div>
              <button
                onClick={logout}
                style={{
                  padding: '0.5rem 1.5rem',
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
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;