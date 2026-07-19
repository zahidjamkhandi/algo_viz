import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { SortingVisualizer } from './pages/SortingVisualizer';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sort" element={<SortingVisualizer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
