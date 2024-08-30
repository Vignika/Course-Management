import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Ensure this file exists for styling
import App from './App';
import reportWebVitals from './reportWebVitals';

// Create the root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Report web vitals (optional)
reportWebVitals();
