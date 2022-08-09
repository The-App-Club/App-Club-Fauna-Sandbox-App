import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { SignInPage } from './pages/signin';
import { SignUpPage } from './pages/signup';
import { DashboardPage } from './pages/dashboard';

const App = ({ context }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUpPage />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route path="/signin" element={<SignInPage />}></Route>
        <Route path="/dashboard" element={<DashboardPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);
