import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import JobDetails from './pages/JobDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/employer/Dashboard';
import PostJob from './pages/employer/PostJob';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public Routes */}
          <Route index element={<Home />} />
          <Route path="job/:id" element={<JobDetails />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />

          {/* Employer Protected Routes */}
          <Route path="employer/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="employer/post-job" element={
            <ProtectedRoute>
              <PostJob />
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
