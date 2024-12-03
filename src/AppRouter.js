import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import CategoriesPage from './pages/CategoriesPage';
import NewsPage from './pages/NewsPage';
import NavBar from './components/NavBar';
import NewsCategoriesPage from './pages/NewsCategoriesPage';

const AppRouter = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/newscategories" element={<NewsCategoriesPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default AppRouter;