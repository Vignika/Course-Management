import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import './AddUser.css'; // Make sure to create this CSS file

const ADD_USER = gql`
  mutation AddUser($email: String!, $password: String!, $role: Role!) {
    addUser(email: $email, password: $password, role: $role) {
      id
      email
      role
    }
  }
`;

const AddUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('STUDENT'); // Default role
  const [addUser] = useMutation(ADD_USER);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await addUser({ variables: { email, password, role: selectedRole } });
    setEmail('');
    setPassword('');
    navigate('/login');
  } catch (error) {
    console.error('Error during user addition:', error.message);
    alert('An error occurred. Please try again.');
  }
};


  return (
    <div className="signup-container">
      <div className="signup-header">
        <h1>Course Management</h1>
      </div>
      <div className="signup-form-container">
        <div className="signup-image">
          {/* Image/Illustration can be placed here */}
        </div>
        <form onSubmit={handleSubmit} className="signup-form">
          <h2>Sign Up</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="signup-input"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="signup-input"
          />
          <div className="role-selection">
            <label>
              <input
                type="radio"
                value="STUDENT"
                checked={selectedRole === 'STUDENT'}
                onChange={() => setSelectedRole('STUDENT')}
              />
              Student
            </label>
            <label>
              <input
                type="radio"
                value="FACULTY"
                checked={selectedRole === 'FACULTY'}
                onChange={() => setSelectedRole('FACULTY')}
              />
              Faculty
            </label>
          </div>
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
