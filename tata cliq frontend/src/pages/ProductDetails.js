import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SummaryApi from '../common';
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import displayINRCurrency from '../helpers/displayCurrency';
import VerticalCardProduct from '../component/VerticalCardProduct';
import CategroyWiseProductDisplay from '../component/CategoryWiseProductDisplay';
import addToCart from '../helpers/addToCart';
import Context from '../context';

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: ""
  });
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const productImageListLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");

  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0
  });
  const [zoomImage, setZoomImage] = useState(false);

  const { fetchUserAddToCart } = useContext(Context);
  const navigate = useNavigate();

  const fetchProductDetails = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        productId: params?.id
      })
    });
    setLoading(false);
    const dataReponse = await response.json();

    setData(dataReponse?.data);
    setActiveImage(dataReponse?.data?.productImage[0]);
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL);
  };

  const handleZoomImage = useCallback((e) => {
    setZoomImage(true);
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    setZoomImageCoordinate({
      x,
      y
    });
  }, [zoomImageCoordinate]);

  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const handleBuyProduct = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
    navigate("/cart");
  };

  return (
    <div className="container mx-auto px-4 py-6 text-sm text-gray-800">

      <div className="min-h-[200px] flex flex-col lg:flex-row gap-6">
        {/* Product Image Section */}
        <div className="lg:sticky top-24 flex flex-col lg:flex-row-reverse gap-4">
          <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2 rounded-md shadow-md">
            {activeImage ? (
              <img
                src={activeImage}
                className="h-full w-full object-contain rounded-md border shadow-sm"
                onMouseMove={handleZoomImage}
                onMouseLeave={handleLeaveImageZoom}
                alt={data?.productName || "Product Image"}
              />
            ) : null}

            {zoomImage && (
              <div className="hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0">
                <div
                  className="w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150"
                  style={{
                    background: `url(${activeImage})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`
                  }}
                ></div>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
            {loading ? (
              productImageListLoading.map((el, index) => (
                <div className="h-20 w-20 bg-slate-200 rounded animate-pulse" key={"loadingImage" + index}></div>
              ))
            ) : (
              data?.productImage?.map((imgURL, index) => (
                <div className="h-20 w-20 bg-slate-200 rounded p-1" key={imgURL}>
                  {imgURL && (
                    <img
                      src={imgURL}
                      className="w-full h-full object-contain rounded-md border cursor-pointer hover:scale-105 transition-transform"
                      onMouseEnter={() => handleMouseEnterProduct(imgURL)}
                      onClick={() => handleMouseEnterProduct(imgURL)}
                      alt="Product thumbnail"
                    />
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-4">
          {loading ? (
            <div className="grid gap-2 w-full">
              <div className="bg-slate-200 animate-pulse h-6 lg:h-8 w-full rounded-full"></div>
              <h2 className="text-2xl lg:text-4xl font-semibold bg-slate-200 animate-pulse w-full"></h2>
              <p className="capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8 w-full"></p>

              <div className="flex items-center gap-2 text-2xl lg:text-3xl font-semibold my-2">
                <p className="bg-slate-200 animate-pulse h-6 lg:h-8 w-full"></p>
                <p className="text-slate-400 line-through bg-slate-200 w-full"></p>
              </div>

              <div className="flex items-center gap-3 my-2 w-full">
                <button className="h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full"></button>
                <button className="h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full"></button>
              </div>

              <div className="w-full">
                <p className="text-slate-600 font-medium my-1 h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full"></p>
                <p className="bg-slate-200 rounded animate-pulse h-10 lg:h-12 w-full"></p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <p className="bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit">{data?.brandName}</p>
              <h2 className="text-2xl lg:text-4xl font-semibold text-gray-800">{data?.productName}</h2>
              <p className="capitalize text-slate-400">{data?.category}</p>

              {/* Rating Section */}
              <div className="text-red-600 flex items-center gap-1">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalf />
              </div>

              {/* Pricing Section */}
              <div className="flex items-center gap-2 text-2xl lg:text-3xl font-semibold my-2">
                <p className="text-black-600">{displayINRCurrency(data.sellingPrice)}</p>
                <p className="text-slate-400 line-through">{displayINRCurrency(data.price)}</p>
                {data.price > data.sellingPrice && (
                  <p className="text-green-600 text-sm">
                    ({Math.round(((data.price - data.sellingPrice) / data.price) * 100)}% OFF)
                  </p>
                )}
              </div>

              {/* Buttons Section */}
              <div className="flex gap-4 my-4">
                <button
                className="bg-black text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-800 transition"
                onClick={(e) => handleBuyProduct(e, data?._id)}
              >
                Buy Now
              </button>

                <button
                  className="border-2 border-black-600 text-white-600 px-6 py-2 rounded-full font-semibold hover:bg-red-600 hover:text-white transition"
                  onClick={(e) => handleAddToCart(e, data?._id)}
                >
                  Add to Cart
                </button>
              </div>

              {/* Description Section */}
              <div>
                <p className="text-slate-600 font-medium my-1">Description :</p>
                <p>{data?.description}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recommended Products Section */}
      {data.category && (
        <CategroyWiseProductDisplay category={data?.category} heading={"Recommended Product"} />
      )}
    </div>
  );
};

export default ProductDetails;
