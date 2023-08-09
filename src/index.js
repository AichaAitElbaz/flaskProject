// Import necessary dependencies
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import ReactDOM from 'react-dom';

// Render the app using the createRoot method
createRoot(document.getElementById('root')).render(<App />);
ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
  