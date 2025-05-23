import React from "react";

function OfferBanners() {
  return (
    <div className="w-full bg-white py-8 mt-10">
      <div className="flex justify-center gap-6 flex-wrap px-4">
        {/* ICICI Banner */}
        <div className="bg-white border rounded-lg shadow-sm w-full sm:w-[22rem] h-24 overflow-hidden">
          <img
            src="https://assets.tatacliq.com/medias/sys_master/images/64684496584734.jpg"
            alt="ICICI Bank Offer"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Paytm Banner */}
        <div className="bg-white border rounded-lg shadow-sm w-full sm:w-[22rem] h-24 overflow-hidden">
          <img
            src="https://assets.tatacliq.com/medias/sys_master/images/62309792808990.jpg"
            alt="Paytm Offer"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Title */}
      <h2 className="text-3xl md:text-5xl font-semibold text-center mb-6 mt-10">Best Brands On Offer</h2>
    </div>
  );
}

export default OfferBanners;
