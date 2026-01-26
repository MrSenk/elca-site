
import { AppProvider } from './context/AppContext';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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

import BentoGrid from './components/BentoGrid';

function Portfolio() {
  return (
    <main className="flex-grow flex flex-col gap-8 mt-20">
      <BentoGrid>
        <HeroSection />
        <AboutSection />
        <BeyondCodeSection />
        <TechStackSection />
        <CertificationsSection />
        <ExperienceSection />
      </BentoGrid>
    </main>
  );
}

function App() {
  const basename = import.meta.env.PROD ? '/elca-site' : '/';

  return (
    <BrowserRouter basename={basename}>
      <AppProvider>
        <Layout>
          <Header />
          <PageTransition>
            <Routes>
              <Route path="/" element={<Portfolio />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:id" element={<BlogArticle />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </PageTransition>
          <FooterSection />
        </Layout>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App
