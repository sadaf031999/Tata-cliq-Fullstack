import React from "react";

const offerData = [
  {
    brand: "U.S. POLO ASSN.",
    description: "MIN. 40% OFF + 20% OFF",
    image: "https://assets.tatacliq.com/medias/sys_master/images/63588841914398.jpg",
  },
  {
    brand: "WOODLAND",
    description: "30% - 60% OFF",
    image: "https://assets.tatacliq.com/medias/sys_master/images/63588841979934.jpg",
  },
  {
    brand: "TITAN",
    description: "UP TO 50% OFF",
    image: "https://assets.tatacliq.com/medias/sys_master/images/63588842045470.jpg",
  },
  {
    brand: "PUMA",
    description: "MIN. 50% OFF",
    image: "https://assets.tatacliq.com/medias/sys_master/images/63588842111006.jpg",
  },
];

const OfferCard = ({ image }) => (
    <div className="flex-1">
      <img
        src={image}
        alt="Offer"
        className="w-full h-auto rounded-lg object-contain"
      />
    </div>
  );
  
  // ✅ Full row of cards centered on the screen
  const TataCliqOffers = () => {
    return (
      <div className="mt-8 px-4 max-w-screen-lg mx-auto">
        {/* ✅ Flex row, no wrap, equal spacing, centered inside a container */}
        <div className="flex justify-center gap-4">
          {offerData.map((offer, idx) => (
            <OfferCard key={idx} image={offer.image} />
          ))}
        </div>
      </div>
    );
  };
  
  
  export default TataCliqOffers;