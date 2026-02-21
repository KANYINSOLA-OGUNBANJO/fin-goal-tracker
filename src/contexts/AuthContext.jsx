import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('fingoal_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Mock login - in real app would call API
    const user = {
      id: 'user_' + Date.now(),
      email: email,
      name: email.split('@')[0],
      avatar: email.substring(0, 2).toUpperCase()
    };
    
    setUser(user);
    localStorage.setItem('fingoal_user', JSON.stringify(user));
    localStorage.setItem('fingoal_auth', 'true');
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fingoal_user');
    localStorage.removeItem('fingoal_auth');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}