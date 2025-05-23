import React from "react";

const GadgetsCard = () => {
  const categories = [
    {
        //title: "FUSION SETS",
        //sub//title: "UP TO 70% OFF",
        image: "https://assets.tatacliq.com/medias/sys_master/images/63588845846558.png",
      },
      {
        //title: "SILK SAREES",
        //sub//title: "UP TO 70% OFF",
        image: "https://assets.tatacliq.com/medias/sys_master/images/63588845912094.png",
      },
      {
        //title: "SHARARAS",
        //sub//title: "UP TO 70% OFF",
        image: "https://assets.tatacliq.com/medias/sys_master/images/63588845977630.png",
      },
      {
        //title: "EMBROIDERED KURTAS",
        //sub//title: "UP TO 70% OFF",
        image: "https://assets.tatacliq.com/medias/sys_master/images/63588846043166.png",
      },
  ];

  return (
    <div className="mt-40 px-4 max-w-screen-lg mx-auto">
         <h2 className="text-3xl md:text-5xl font-semibold text-center mb-6 mt-10">The Digi-Den</h2>
    <div className="flex justify-center gap-4 mt-20">
      {categories.map((item, index) => (
        <div
          key={index}
          className="flex-1 max-w-[250px] rounded-2xl overflow-hidden relative group cursor-pointer"
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent px-2 py-3">
            <h3 className="text-white text-center text-sm font-semibold">
              {item.title}
            </h3>
          </div>
        </div>
      ))}
    </div>
  </div>
);
};


export default GadgetsCard;
