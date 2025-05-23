import React from "react";

const KidsCard = () => {
  const categories = [
    {
        //title: "FUSION SETS",
        //sub//title: "UP TO 70% OFF",
        image: "https://assets.tatacliq.com/medias/sys_master/images/63588844929054.png",
      },
      {
        //title: "SILK SAREES",
        //sub//title: "UP TO 70% OFF",
        image: "https://assets.tatacliq.com/medias/sys_master/images/63588844994590.png",
      },
      {
        //title: "SHARARAS",
        //sub//title: "UP TO 70% OFF",
        image: "https://assets.tatacliq.com/medias/sys_master/images/63588845060126.png",
      },
      {
        //title: "EMBROIDERED KURTAS",
        //sub//title: "UP TO 70% OFF",
        image: "https://assets.tatacliq.com/medias/sys_master/images/63588845125662.png",
      },
  ];

  return (
    <div className="mt-20 px-4 max-w-screen-lg mx-auto">
         <h2 className="text-3xl md:text-5xl font-semibold text-center mb-6 mt-10">Next-Gen Fashion</h2>
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


export default KidsCard;
