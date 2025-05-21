import React from 'react';
import { Header } from '../../components/landing/Header';
import { Hero } from '../../components/landing/Hero';
import { Metrics } from '../../components/landing/Metrics';
import { Features } from '../../components/landing/Features';
import { Partners } from '../../components/landing/Partners';
import { Footer } from '../../components/landing/Footer';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <div className="hover:scale-[1.01] transition-transform">
          <Hero />
        </div>
        <div className="hover:scale-[1.01] transition-transform">
          <Metrics />
        </div>
        <div className="hover:scale-[1.01] transition-transform">
          <Features />
        </div>
        <div className="hover:scale-[1.01] transition-transform">
          <Partners />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;