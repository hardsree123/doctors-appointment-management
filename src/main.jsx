import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PerformanceMonitor, measureWebVitals } from './utils/performance.js'

// Initialize performance monitoring
PerformanceMonitor.measurePageLoad();
measureWebVitals();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
