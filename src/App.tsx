import React from 'react';

import './App.css';
import { HomePage } from './components/home';
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { LoginPage } from './components/auth/login/login';
import { HomeLayout } from './components/containers/homeLayout';
import { Register } from './components/auth/register';


function App() {
  return (
    <Routes>
        <Route path="/" element={<HomeLayout/>}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<Register />} />
          {/* <Route path="dashboard" element={<Dashboard />} /> */}
          
        </Route>
      </Routes>
  );
}

export default App;
