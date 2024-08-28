import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import './Login.css';

// Define the login mutation
const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      id
      email
    }
  }
`;


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const [loginUser] = useMutation(LOGIN_USER);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
        console.log('Sending login request with:', { email, password });
    
        const { data } = await loginUser({ variables: { email, password } });
        console.log('Received response:', data);
    
        if (data.loginUser) {
          navigate('/home'); // Redirect to Home page on successful login
        } else {
          setError('Invalid credentials');
        }
      } catch (error) {
        console.error('GraphQL error:', error.message);
        setError('Invalid credentials');
      }
    };

  const navigateToSignup = () => {
    navigate('/signup'); // Redirects to AddUser (Sign Up page)
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h1>Student</h1>
      </div>
      <div className="login-form-container">
        <div className="login-image">
          {/* Image/Illustration can be placed here */}
        </div>
        <form onSubmit={handleLogin} className="login-form">
          <h2>Log In</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="login-input"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="login-input"
          />
          <button type="submit" className="login-button">Login</button>
          {error && <p className="login-error">{error}</p>}
          <p className="signup-link">
            Don't have an account?{' '}
            <span onClick={navigateToSignup}>
              SIGN UP
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
