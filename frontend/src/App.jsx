import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import PracticeAreaDetail from './pages/PracticeAreaDetail';
import LawyerDetail from './pages/LawyerDetail';
import InsightDetail from './pages/InsightDetail';
import NotFound from './pages/NotFound';

// Pindah halaman lewat router tidak menggeser posisi gulir. Tanpa ini,
// membuka profil advokat dari tengah halaman depan mendarat di tengah
// halaman profil.
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) return; // biarkan browser menangani anchor
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/praktik/:slug" element={<PracticeAreaDetail />} />
        <Route path="/tim/:slug" element={<LawyerDetail />} />
        <Route path="/wawasan/:slug" element={<InsightDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
