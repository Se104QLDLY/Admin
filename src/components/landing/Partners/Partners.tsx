import React from 'react';

interface PartnersProps {
  className?: string;
}

export const Partners: React.FC<PartnersProps> = ({ className = '' }) => {
  return (
    <section className={`py-16 bg-gray-50 ${className}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Đối tác của chúng tôi</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mx-auto max-w-5xl">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="flex justify-center items-center p-4">
              <img 
                src="/chiphien.webp" 
                alt={`Đối tác Chi Phiến ${index}`} 
                className="h-52 w-auto object-contain rounded-lg shadow-md hover:shadow-lg transition-shadow"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners; 