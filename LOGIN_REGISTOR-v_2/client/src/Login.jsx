import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const decodeToken = (token) => {
  try {
    const payload = atob(token.split('.')[1]); // Decode the JWT token
    return JSON.parse(payload); // Parse and return as JSON
  } catch (error) {
    return null;
  }
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken) {
        setMessage(`User logged in successfully as ${decodedToken.role}`);
      }
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });

      const token = response.data.token;
      localStorage.setItem('token', token); // Store token in localStorage
      console.log('JWT Token:', token); // Log the token to the console

      const decodedToken = decodeToken(token);
      if (decodedToken) {
        const role = decodedToken.role;
        setMessage(`Login successful! You are logged in as ${role}.`);
        navigate('/'); // Redirect to /home after login
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setMessage('');
    navigate('/'); // Redirect to the login page
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  const handleGoToHome = () => {
    navigate('/home');
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {message && (
        <div style={{ color: 'green', marginTop: '20px', padding: '10px', backgroundColor: '#d4edda', borderRadius: '5px' }}>
          {message}
        </div>
      )}

      {localStorage.getItem('token') && (
        <div>
          <button onClick={handleLogout} style={{ marginTop: '20px' }}>Logout</button>
          <button onClick={handleGoToHome} style={{ marginTop: '20px' }}>Go to Home</button>
        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        <button onClick={handleRegisterRedirect}>Go to Register</button>
      </div>
    </div>
  );
};

export default Login;
