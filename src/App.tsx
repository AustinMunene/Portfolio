import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ScrollToTop from './components/ScrollToTop';

/*
  Home ships in the initial bundle; the rest are split. This matters most for
  InteractiveDemo, which pulls three/fiber/drei: importing it statically forced
  three into the main chunk and defeated the lazy-loaded hero scene.
*/
const Career = lazy(() => import('./pages/Career'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const InteractiveDemo = lazy(() => import('./pages/InteractiveDemo'));

function App() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <Navbar />
      <Suspense fallback={<div className="min-h-screen" role="status" aria-label="Loading" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/career" element={<Career />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/interactive" element={<InteractiveDemo />} />
        </Routes>
      </Suspense>
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
