import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import AcademicSemester from './components/AcademicSemester/AcademicSemester';
import Skills from './components/Skills/Skills';
import Contact from './components/Contact/Contact';
import WeekDetail from './pages/WeekDetail/WeekDetail';

function MainPortfolio() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <AcademicSemester />
      <Skills />
      <Contact />
    </main>
  );
}

function AppLayout() {
  return (
    <>
      <div className="grain-overlay" />
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPortfolio />} />
        <Route path="/semana/:weekId" element={<WeekDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
