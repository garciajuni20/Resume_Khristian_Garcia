import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Resume from './pages/Resume';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Script de Google Analytics (opcional)
const GA_TRACKING_ID = 'G-XXXXXXXXXX'; // Reemplaza con tu ID

function App() {
  return (
    <Router>
      <ThemeProvider>
        <LanguageProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/resume" element={<Resume />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </LanguageProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;