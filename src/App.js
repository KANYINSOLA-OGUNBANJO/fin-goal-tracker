import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import LoginPage from './pages/LoginPage';
import Navbar from './components/layout/Navbar';

function Dashboard() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: '2rem' }}>
        <h1>Dashboard</h1>
        <p>Welcome to FinGoal! Your financial goals manager.</p>
      </div>
    </div>
  );
}

function GoalsPage() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: '2rem' }}>
        <h1>Goals Page</h1>
        <p>Your financial goals will appear here.</p>
      </div>
    </div>
  );
}

function BoardPage() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: '2rem' }}>
        <h1>Kanban Board</h1>
        <p>Drag and drop your tasks here.</p>
      </div>
    </div>
  );
}

function ProfilePage() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: '2rem' }}>
        <h1>Profile Page</h1>
        <p>Manage your profile and settings.</p>
      </div>
    </div>
  );
}

// Protected Route wrapper
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div style={{ padding: '2rem' }}>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <Routes>
            {/* Public Route */}
            <Route path="/login" element={<LoginPage />} />
            
            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/goals" 
              element={
                <ProtectedRoute>
                  <GoalsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/board" 
              element={
                <ProtectedRoute>
                  <BoardPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } 
            />
            
            {/* Default Route */}
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;