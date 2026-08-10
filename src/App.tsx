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
    <div className="min-h-screen bg-surface text-fg overflow-hidden relative transition-colors duration-500">
      {/* Faint technical grid, tinted by the active theme. */}
      <div className="coder-grid" aria-hidden="true" />

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

      <ScrollToTop />

      {/* Footer */}
      <footer className="relative container mx-auto px-6 py-10 mt-28 z-10">
        <div className="absolute top-0 left-0 right-0 h-px bg-line" />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-fg-subtle text-sm">© 2026 Austin Munene</p>
          <a
            href="#top"
            className="text-fg-muted hover:text-fg transition-colors duration-200 text-sm select-none active:scale-95"
          >
            Back to Top
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
