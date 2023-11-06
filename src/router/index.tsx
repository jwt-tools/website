import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './home/Home';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<h1>Home</h1>} />
    </Routes>
  );
}

export default Router;
