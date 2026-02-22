import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Career from './pages/Career';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost2';
import InteractiveDemo from './pages/InteractiveDemo';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/career" element={<Career />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/interactive" element={<InteractiveDemo />} />
      </Routes>
      <>
        <ScrollToTop />
        {/* Your Routes Here */}
      </>
      {/* Footer */}
        <footer className="relative container mx-auto px-4 py-8 mt-20">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-500/20 to-transparent" />
          <div className="flex justify-between items-center">
            <p className="text-gray-600 text-sm">© 2026 Austin Munene</p>
            <a
              href="#top"
              className="text-gray-500 hover:text-accent-400 transition-colors text-sm"
            >
              Back to Top
            </a>
          </div>
        </footer>
    </div>
  );
}

export default App;
