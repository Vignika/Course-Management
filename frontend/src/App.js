import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import client from './apolloClient';
import AddUser from './components/AddUser';
import Login from './components/Login';
import Home from './components/Home';

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Routes>
            {/* Redirect from root to login */}
            <Route path="/" element={<Navigate to="/login" />} />
            
            {/* Login page */}
            <Route path="/login" element={<Login />} />
            
            {/* Sign-up page */}
            <Route path="/signup" element={<AddUser />} />
            
            {/* Home page */}
            <Route path="/home" element={<Home />} />
            
            {/* Redirect for undefined routes */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
