

// HeroSection.tsx
import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section
      className="w-full h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('https://m.media-amazon.com/images/I/71r7oKape2L.SS700.jpg')",
      }}
    >
      <div className="flex justify-center items-center h-full bg-black bg-opacity-50">
        <h1 className="text-4xl text-blue-800 font-bold"> Find Your Perfect New <br/> or Used Car</h1>
      </div>
    </section>
  );
};

export default HeroSection;

