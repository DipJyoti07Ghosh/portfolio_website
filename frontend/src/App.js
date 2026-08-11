import React from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import PortfolioShowcase from './components/PortfolioShowcase';
import Contact from './components/Contact';
import Footer from './components/Footer';
import GallerySection from './components/GallerySection';

function App() {
  return (
    <div className="App relative">
      {/* Animated Gradient Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-zinc-950" />
        <div
          className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: '8s' }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: '10s', animationDelay: '2s' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: '12s', animationDelay: '4s' }}
        />
      </div>

      {/* Content */}
      <Header />
      <Hero />
      <About />
      <PortfolioShowcase />
      <GallerySection />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;