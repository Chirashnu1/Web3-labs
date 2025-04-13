
import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import ToolsShowcase from '../components/ToolsShowcase';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <ParticleBackground />
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ToolsShowcase />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
