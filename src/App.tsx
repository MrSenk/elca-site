import { AppProvider } from './context/AppContext';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import RetroLayout from './components/RetroLayout';
import Header from './components/PortfolioHeader';
import HeroSection from './components/HeroSection';
import ExperienceSection from './components/ExperienceSection';
import CertificationsSection from './components/CertificationsSection';
import TechStackSection from './components/TechStackSection';
import FooterSection from './components/FooterSection';
import AboutSection from './components/AboutSection';
import BeyondCodeSection from './components/BeyondCodeSection';
import ProjectsSection from './components/ProjectsSection';
import BlogPage from './pages/BlogPage';
import BlogArticle from './pages/BlogArticle';
import PageTransition from './components/PageTransition';
import BentoGrid from './components/BentoGrid';

function Portfolio() {
  return (
    <main className="flex-grow flex flex-col gap-6 mt-4">
      <BentoGrid>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <CertificationsSection />
        <TechStackSection />
        <BeyondCodeSection />
        <ProjectsSection />
      </BentoGrid>
    </main>
  );
}

function App() {
  const basename = import.meta.env.PROD ? '/elca-site' : '/';

  return (
    <BrowserRouter basename={basename}>
      <AppProvider>
        <RetroLayout>
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
        </RetroLayout>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
