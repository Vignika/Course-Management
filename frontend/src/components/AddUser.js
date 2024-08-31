import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './AddUser.css'; // Import the CSS file

const ADD_USER = gql`
  mutation AddUser($email: String!, $password: String!, $role: Role!) {
    addUser(email: $email, password: $password, role: $role) {
      _id
      email
      role
    }
  }
`;

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('STUDENT');

  const [addUser, { loading, error }] = useMutation(ADD_USER);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addUser({
        variables: { email, password, role },
      });
      console.log('User added:', response.data.addUser);
      // Redirect to login page after successful signup
      navigate('/login');
    } catch (e) {
      console.error('Error signing up:', e.message);
      // Handle error
    }
  };

  return (
    <div className="signup-container">
      <div className="header">
        <h1>Course Management</h1>
      </div>
      <div className="signup-content">
        <div className="signup-image">
          <div className="image-placeholder"></div>
        </div>
        <form onSubmit={handleSubmit} className="signup-form">
          <h2>Sign Up</h2>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="role-selection">
            <label>
              <input
                type="radio"
                value="STUDENT"
                checked={role === 'STUDENT'}
                onChange={(e) => setRole(e.target.value)}
              />
              Student
            </label>
            <label>
              <input
                type="radio"
                value="FACULTY"
                checked={role === 'FACULTY'}
                onChange={(e) => setRole(e.target.value)}
              />
              Faculty
            </label>
          </div>
          <button type="submit" disabled={loading} className="signup-button">
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
          {error && <p className="error-message">Error: {error.message}</p>}
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
