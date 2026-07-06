import React from 'react';
import ReactDOM from 'react-dom/client';
import { LazyMotion, domAnimation } from 'framer-motion';
import App from './App.jsx';
import { initAnalytics } from './lib/analytics.js';
import './styles.css';

// GA4 — production builds only; loads during idle time after window load.
initAnalytics();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* LazyMotion + m components: ships the slim animation runtime instead
        of the full motion feature set, cutting main-bundle JS. */}
    <LazyMotion features={domAnimation} strict>
      <App />
    </LazyMotion>
  </React.StrictMode>
);
