import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import 'react-app-polyfill/stable';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import {MagicPage} from './pages/magic';
import {DashBoardPage} from './pages/dashboard';
import {ErrorPage} from './pages/error';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          index
          element={
            <>
              <MagicPage />
            </>
          }
        />
        <Route
          path="/sign-up"
          element={
            <>
              <MagicPage />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <MagicPage />
            </>
          }
        />
        <Route
          path="/dashboard"
          element={
            <>
              <DashBoardPage />
            </>
          }
        />
        <Route
          path="/error"
          element={
            <>
              <ErrorPage />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
