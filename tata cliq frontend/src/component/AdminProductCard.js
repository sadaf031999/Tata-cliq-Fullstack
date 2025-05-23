import React, { useState } from 'react';
import { MdModeEditOutline } from 'react-icons/md';
import AdminEditProduct from './AdminEditProduct';
import displayINRCurrency from '../helpers/displayCurrency';
import ModalImage from "react-modal-image"; // <-- import here

const AdminProductCard = ({ data, fetchdata }) => {
  const [editProduct, setEditProduct] = useState(false);

  // Calculate discount percentage
  const discount = Math.round(
    ((data?.price - data?.sellingPrice) / data?.price) * 100
  );

  return (
    <div className="bg-white rounded-lg shadow p-2 w-48 md:w-52">
      {/* --- Product Images as Thumbnails with Preview --- */}
      <div className="flex gap-2 mt-2 px-1 overflow-x-auto">
        {data?.productImage?.map((img, idx) => (
          <ModalImage
            key={idx}
            small={img}         // thumbnail image
            large={img}         // full-size image in modal
            alt={`Thumbnail ${idx}`}
            className="w-10 h-10 object-cover rounded border"
          />
        ))}
      </div>

      {/* --- Product Name & Brand --- */}
      <div className="px-1 mb-1">
        <h3 className="text-sm text-gray-900 font-semibold leading-tight">
          {data?.brandName || 'Brand'}
        </h3>
        <p className="text-xs text-gray-700 line-clamp-2">
          {data?.productName}
        </p>
        <p className="text-sm text-gray-500 line-clamp-2">{data?.description}</p>
      </div>

      {/* --- Price & Discount --- */}
      <div className="px-1 mb-1 flex items-center gap-1">
        <span className="font-semibold text-sm text-black">
          {displayINRCurrency(data?.sellingPrice)}
        </span>
        <span className="line-through text-gray-400 text-xs">
          {displayINRCurrency(data?.price)}
        </span>
        <span className="text-green-600 text-xs font-medium">
          {discount}% off
        </span>
      </div>

      {/* --- Limited Stock Warning (if any) --- */}
      {data?.stock < 10 && (
        <p className="text-xs text-red-600 font-semibold px-1">Limited stock!</p>
      )}

      {/* --- Edit Button --- */}
      <div className="flex justify-end mt-2 px-1">
        <div
          className="p-1 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer"
          onClick={() => setEditProduct(true)}
        >
          <MdModeEditOutline />
        </div>
      </div>

      {/* --- Edit Modal --- */}
      {editProduct && (
        <AdminEditProduct
          productData={data}
          onClose={() => setEditProduct(false)}
          fetchdata={fetchdata}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
