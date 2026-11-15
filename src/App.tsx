import { Suspense, lazy, useEffect, useLayoutEffect, type ComponentType } from 'react';
import { BrowserRouter, HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { CLEAN_URLS } from './utils/site';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { SoundProvider } from './context/SoundContext';
import { SoundHint } from './components/SoundToggle';
import SoundEffects from './components/SoundEffects';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import InkTransition from './components/InkTransition';
import UvMode from './components/uv/UvMode';
// Home ships in the main bundle: the landing route must not wait for a second
// round-trip before it can paint (mobile LCP). The other pages stay lazy.
import Home from './pages/Home';

/**
 * A lazy page that can be fetched ahead of time. Once fetched it renders the
 * component directly: React.lazy alone would still suspend for a tick on the
 * first render, and the router keeps the old page on screen meanwhile.
 */
function lazyPage(load: () => Promise<{ default: ComponentType }>) {
  let Loaded: ComponentType | null = null;
  const get = () => load().then(m => { Loaded = m.default; return m; });
  const Lazy = lazy(get);
  const Page = () => (Loaded ? <Loaded /> : <Lazy />);
  return Object.assign(Page, { preload: () => { if (!Loaded) get().catch(() => undefined); } });
}

const Resume = lazyPage(() => import('./pages/Resume'));
const Projects = lazyPage(() => import('./pages/Projects'));
const FlowberCaseStudy = lazyPage(() => import('./pages/FlowberCaseStudy'));
const AlleviateCaseStudy = lazyPage(() => import('./pages/AlleviateCaseStudy'));
const Contact = lazyPage(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

/**
 * Once the first page has settled, fetch the other pages in the background, so
 * a click changes page at once instead of waiting for a download (~300 ms on
 * a real connection). Skipped when the visitor asked to save data.
 */
function usePrefetchPages() {
  useEffect(() => {
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (nav.connection?.saveData) return;
    const load = () => [Resume, Projects, FlowberCaseStudy, AlleviateCaseStudy, Contact].forEach(p => p.preload());
    // Safari has no requestIdleCallback
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(load, { timeout: 4000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(load, 2500);
    return () => clearTimeout(id);
  }, []);
}

// Real paths on Cloudflare Pages, hash routes on the GitHub Pages mirror
const Router = CLEAN_URLS ? BrowserRouter : HashRouter;

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="h-1 w-40 overflow-hidden rounded-full bg-n-border"><div className="h-full w-1/3 animate-pulse rounded-full bg-n-accent" /></div>
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  usePrefetchPages();
  // New page starts at the top (the router keeps scroll position by default),
  // before the first paint so the old scroll position never shows
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Suspense fallback={<PageLoader />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/flowber" element={<FlowberCaseStudy />} />
          <Route path="/projects/flowber" element={<Navigate to="/flowber" replace />} />
          <Route path="/alleviate" element={<AlleviateCaseStudy />} />
          <Route path="/projects/alleviate" element={<Navigate to="/alleviate" replace />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <ThemeProvider>
        <LanguageProvider>
          {/* Above the router: the soundtrack keeps playing across pages */}
          <SoundProvider>
          <MotionConfig reducedMotion="user">
          <UvMode>
            <ScrollProgress />
            <InkTransition />
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">
                <AnimatedRoutes />
              </main>
              <Footer />
            </div>
            <SoundHint />
            <SoundEffects />
          </UvMode>
          </MotionConfig>
          </SoundProvider>
        </LanguageProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
