
import { AppProvider } from './context/AppContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Header from './components/PortfolioHeader';
import HeroSection from './components/HeroSection';
import ExperienceSection from './components/ExperienceSection';
import CertificationsSection from './components/CertificationsSection';
import TechStackSection from './components/TechStackSection';
import FooterSection from './components/FooterSection';
import AboutSection from './components/AboutSection';
import BeyondCodeSection from './components/BeyondCodeSection';
import BlogPage from './pages/BlogPage';
import BlogArticle from './pages/BlogArticle';
import PageTransition from './components/PageTransition';

function Portfolio() {
  return (
    <main className="flex-grow flex flex-col gap-16 mt-20">
      <HeroSection />
      <AboutSection />
      <BeyondCodeSection />
      <ExperienceSection />
      <CertificationsSection />
      <TechStackSection />
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Layout>
          <Header />
          <PageTransition>
            <Routes>
              <Route path="/" element={<Portfolio />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:id" element={<BlogArticle />} />
            </Routes>
          </PageTransition>
          <FooterSection />
        </Layout>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App
