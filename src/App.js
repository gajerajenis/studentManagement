import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { StudentProvider } from './context/StudentContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import HomePage     from './pages/Home/HomePage';
import StudentsPage from './pages/Students/StudentsPage';
import LoginPage    from './pages/LoginPage/LoginPage';
import SignupPage   from './pages/SignupPage/SignupPage';
import CreatorRibbon from './components/CreatorRibbon/CreatorRibbon';

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <AuthProvider>
      <StudentProvider>
        <Router>
          <Routes>
            <Route path="/"        element={<HomePage />} />
            <Route path="/login"   element={<LoginPage />} />
            <Route path="/signup"  element={<SignupPage />} />
            <Route
              path="/students"
              element={
                <PrivateRoute>
                  <StudentsPage />
                </PrivateRoute>
              }
            />
          </Routes>
          <CreatorRibbon />
        </Router>
      </StudentProvider>
    </AuthProvider>
  );
}

export default App;