

// HeroSection.tsx
import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section
      className="w-full h-screen bg-cover object-cover"
      style={{
        backgroundImage: "url('https://m.media-amazon.com/images/I/71r7oKape2L.SS700.jpg')",
      }}
    >
      <div className="flex justify-center items-center h-full bg-black bg-opacity-60">
        <h1 className="text-7xl text-white font-bold "> Find Your Perfect  <br/>Ride Today</h1>
        
      </div>
    </section>
  );
};

export default HeroSection;

