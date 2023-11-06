import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './home/Home';
import Header from '../layout/header/Header';
import Footer from '../layout/footer/Footer';

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Router;
