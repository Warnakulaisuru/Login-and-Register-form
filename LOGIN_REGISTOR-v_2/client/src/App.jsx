import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import AdminDashboard from './AdminDashboard';
import Unauthorized from './Unauthorized';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* User-specific route */}
        <Route
          path="/home"
          element={
            <ProtectedRoute element={<Home />} allowedRoles={['user']} />
          }
        />

        {/* Admin-specific route */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute element={<AdminDashboard />} allowedRoles={['admin']} />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
