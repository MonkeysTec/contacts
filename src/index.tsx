import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ContactProvider } from './Hooks/ContactContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ContactProvider>
      <App />
    </ContactProvider>
  </React.StrictMode>
);
