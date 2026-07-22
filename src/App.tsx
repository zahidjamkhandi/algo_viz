import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/Landing/LandingPage';
import { SortingVisualizer } from './pages/SortingVisualizer/SortingVisualizer';
import ScrollToTop from './components/utility/scrollToTop';
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sort" element={<SortingVisualizer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
