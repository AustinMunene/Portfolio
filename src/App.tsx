import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Career from './pages/Career';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
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
      <footer className="container mx-auto px-4 py-8 mt-20 border-t border-gray-800/50">
        <div className="flex justify-between items-center">
          <p className="text-gray-500">© 2026 Austin Munene</p>
          <a
            href="#top"
            className="text-gray-500 hover:text-white transition-colors nav-link"
          >
            Back to Top
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
