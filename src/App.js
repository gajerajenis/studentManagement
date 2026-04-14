import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { StudentProvider } from './context/StudentContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import HomePage     from './pages/Home/HomePage';
import LoginPage    from './pages/LoginPage/LoginPage';
import SignupPage   from './pages/SignupPage/SignupPage';
import CreatorRibbon from './components/CreatorRibbon/CreatorRibbon';
import AdminTabsPage from './pages/AdminTabsPage/AdminTabsPage';

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

// 👇 New Wrapper Component
const AppContent = () => {
  const location = useLocation();

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/students"
          element={
            <PrivateRoute>
              <AdminTabsPage />
            </PrivateRoute>
          }
        />
      </Routes>

      {/* 👇 Only show on home */}
      {location.pathname === '/' && <CreatorRibbon />}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <StudentProvider>
        <Router>
          <AppContent />
        </Router>
      </StudentProvider>
    </AuthProvider>
  );
}

export default App;