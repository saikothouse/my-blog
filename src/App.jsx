import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Blog from './components/Blog';
import PostDetail from './components/PostDetail';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/post/:postId" element={<PostDetail />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;