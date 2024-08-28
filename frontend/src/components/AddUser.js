import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom'; 
import './AddUser.css'; // Make sure to create this CSS file

const ADD_USER = gql`
  mutation AddUser($email: String!, $password: String!) {
    addUser(email: $email, password: $password) {
      id
      email
      password
    }
  }
`;

const AddUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [addUser] = useMutation(ADD_USER);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addUser({ variables: { email, password } });
    setEmail('');
    setPassword('');
    navigate('/login');
  };

  return (
    <div className="signup-container">
      <div className="signup-header">
        <h1>Student</h1>
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
            type="password" // Change to password type
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="signup-input"
          />
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
