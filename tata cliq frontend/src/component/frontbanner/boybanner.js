const BoyBanner = () => {
    return (
      <div className="bg-white py-12 px-4 mt-15">
        <h2 className="text-3xl md:text-5xl font-semibold text-center mb-6 mt-10">Trending Boy Fits</h2>
        
        <div className="relative max-w-screen-xl mx-auto rounded-2xl overflow-hidden mt-20">
          <img
            src="https://img.freepik.com/free-photo/portrait-tourist-takesoff-sunglasses-saying-wow-staring-impressed-camera-checking-out-cool_1258-158955.jpg?t=st=1746464637~exp=1746468237~hmac=5996475c93804969d0282de6000cbd21b0f23c6bcf5497e792fc56a24a7e96e5&w=1380" // 🔁 Replace with your image path
            alt="Hot Boy Fits"
            className="w-full h-[450px] object-cover"
          />
          
          {/* Text Content */}
          <div className="absolute top-1/2 left-8 transform -translate-y-1/2 text-white max-w-[300px]">
            <p className="text-3xl font-bold">30% - 70% off</p>
            <p className="mt-2 text-lg">Dance the night away in these party faves</p>
            <button className="mt-4 bg-white text-black font-semibold px-5 py-2 rounded-md shadow">
              SHOP NOW
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default BoyBanner;
  