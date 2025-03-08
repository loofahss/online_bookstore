import React from 'react';
import ReactDOM from 'react-dom/client';
import {QueryClient, QueryClientProvider } from 'react-query';
import './index.css';
import App from './App.tsx';  // 确保 App.tsx 文件在 src 目录下

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
