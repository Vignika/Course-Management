import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import loginImage from './images/Login.png'; // Use the image you've added
import './Login.css'; // Import the updated CSS

const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      _id
      email
      role
    }
  }
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ variables: { email, password } });
      console.log('Login successful:', response.data.loginUser);
      if (response.data.loginUser.role === 'STUDENT') {
        navigate('/home');
      } else if (response.data.loginUser.role === 'FACULTY') {
        navigate('/faculty-dashboard');
      }
    } catch (err) {
      console.error('Login error:', err.message);
    }
  };

  return (
    <div className="login-container">
      <header className="header">
        <h1>Course Management</h1>
      </header>
      <div className="login-content">
        <div className="login-image-container">
          <img src={loginImage} alt="Login Illustration" className="login-image" />
        </div>
        <div className="form-container">
          <h2>Log In</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
            {error && <p className="error">Error: {error.message}</p>}
          </form>
          <p>Don't have an account? <a href="/signup">Sign Up</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
