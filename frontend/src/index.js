import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Global styles
const style = document.createElement('style');
style.textContent = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: #0a0e1a; font-family: 'Segoe UI', sans-serif; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #0a0e1a; }
  ::-webkit-scrollbar-thumb { background: #e94560; border-radius: 3px; }
  input, textarea, select { font-family: inherit; }
  a:hover { opacity: 0.85; }
`;
document.head.appendChild(style);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
