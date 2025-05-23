import React from "react";

const IndianwearBanner = () => {
  return (
    <section className="bg-white mt-10 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-semibold text-center mb-6">
          Indianwear Reimagined
        </h1>

        <div className="relative rounded-2xl overflow-hidden shadow-lg h-[300px] md:h-[400px] mt-20">
          <img
            src="https://byshree.com/cdn/shop/articles/Banner-1.jpg?v=1667985708&width=2048" // Replace with the correct path to the uploaded image
            alt="Indianwear Banner"
            className="w-full h-auto object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex flex-col justify-center pl-6 md:pl-16">
            <div className="text-white max-w-sm">
              <h2 className="text-2xl md:text-4xl font-bold mb-2">New Beginnings</h2>
              <p className="text-lg mb-4">Get shaadi season style right with our curation</p>
              <button className="bg-white text-black font-medium px-5 py-2 rounded-lg hover:bg-gray-200 transition">
                SHOP NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndianwearBanner;
