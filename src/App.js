import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Toaster } from 'react-hot-toast';

// Eager load - needed immediately
import LoginPage from './pages/LoginPage';

// Lazy load - loaded on demand
const Dashboard = lazy(() => import('./pages/Dashboard'));
const GoalsPage = lazy(() => import('./pages/GoalsPage'));
const GoalDetailPage = lazy(() => import('./pages/GoalDetailPage'));
const BoardPage = lazy(() => import('./pages/BoardPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));

// Loading component
const LoadingFallback = () => (
  <div style={{
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#0F1419'
  }}>
    <div style={{
      textAlign: 'center',
      color: '#FFFFFF'
    }}>
      <div style={{
        width: '50px',
        height: '50px',
        border: '4px solid rgba(139, 168, 136, 0.2)',
        borderTop: '4px solid #8BA888',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: '0 auto 1rem'
      }} />
      <p style={{ fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.7)' }}>Loading...</p>
    </div>
  </div>
);

// Protected Route wrapper
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingFallback />;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#363636',
                color: '#fff',
                borderRadius: '8px',
                padding: '16px',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 4000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
          
          <Suspense fallback={<LoadingFallback />}>
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
                path="/goals/:id" 
                element={
                  <ProtectedRoute>
                    <GoalDetailPage />
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
          </Suspense>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;