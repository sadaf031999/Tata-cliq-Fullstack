import React, { useState, useEffect } from 'react';
import { CgClose } from "react-icons/cg";
import productCategory from '../helpers/productCategory';
import { MdDelete } from "react-icons/md";
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import DisplayImage from './DisplayImage';

const AdminEditProduct = ({
  onClose,
  productData,
  fetchdata
}) => {

  const [data, setData] = useState({
    ...productData,
    productName: productData?.productName,
    brandName: productData?.brandName,
    category: productData?.category,
    productImage: productData?.productImage || [],
    description: productData?.description,
    price: productData?.price,
    sellingPrice: productData?.sellingPrice
  });

  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.backgroundColor = 'rgba(0, 0, 0, 0.35)';
    } else {
      document.body.style.backgroundColor = '';
    }
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, [isModalOpen]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDeleteProductImage = (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);
    setData((prev) => ({
      ...prev,
      productImage: [...newProductImage]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(SummaryApi.updateProduct.url, {
      method: SummaryApi.updateProduct.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const responseData = await response.json();
    if (responseData.success) {
      toast.success(responseData?.message);
      onClose();
      fetchdata();
    }
    if (responseData.error) {
      toast.error(responseData?.message);
    }
  };

  return (
    <div className={`fixed w-full h-full top-0 left-0 right-0 bottom-0 flex justify-center items-center ${isModalOpen ? 'bg-gray-500 bg-opacity-50' : ''}`}>
      <div className='bg-white p-6 rounded-lg w-full max-w-2xl h-full max-h-[80%] overflow-y-auto shadow-lg'>
        <div className='flex justify-between items-center pb-4'>
          <h2 className='font-bold text-lg text-gray-800'>Edit Product</h2>
          <div className='text-2xl hover:text-red-600 cursor-pointer' onClick={() => { setIsModalOpen(false); onClose(); }}>
            <CgClose />
          </div>
        </div>

        <form className='space-y-6' onSubmit={handleSubmit}>
          <div>
            <label htmlFor='productName' className='block text-sm font-medium text-gray-700'>
              Product Name:
            </label>
            <input
              type='text'
              id='productName'
              placeholder='Enter product name'
              name='productName'
              value={data.productName}
              onChange={handleOnChange}
              className='mt-1 p-3 block w-full border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-300'
              required
            />
          </div>

          <div>
            <label htmlFor='brandName' className='block text-sm font-medium text-gray-700'>
              Brand Name:
            </label>
            <input
              type='text'
              id='brandName'
              placeholder='Enter brand name'
              value={data.brandName}
              name='brandName'
              onChange={handleOnChange}
              className='mt-1 p-3 block w-full border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-300'
              required
            />
          </div>

          <div>
            <label htmlFor='category' className='block text-sm font-medium text-gray-700'>
              Category:
            </label>
            <select
              required
              value={data.category}
              name='category'
              onChange={handleOnChange}
              className='mt-1 p-3 block w-full border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-300'
            >
              <option value={""}>Select Category</option>
              {productCategory.map((el, index) => (
                <option value={el.value} key={el.value + index}>{el.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor='productImage' className='block text-sm font-medium text-gray-700'>
              Product Images:
            </label>
            <div className='space-y-4'>
              {data.productImage.map((url, index) => (
                <div className='flex items-center gap-3' key={index}>
                  <input
                    type='text'
                    value={url}
                    placeholder='Enter image URL'
                    className='p-3 bg-gray-100 border rounded-md w-full'
                    onChange={(e) => {
                      const updatedImages = [...data.productImage];
                      updatedImages[index] = e.target.value;
                      setData((prev) => ({
                        ...prev,
                        productImage: updatedImages
                      }));
                    }}
                  />
                  {url && (
                    <img
                      src={url}
                      alt={`Preview ${index}`}
                      className='w-16 h-16 max-w-[64px] max-h-[64px] object-cover border rounded cursor-pointer'
                      onClick={() => {
                        setOpenFullScreenImage(true);
                        setFullScreenImage(url);
                      }}
                    />
                  )}
                  <button
                    type='button'
                    className='text-red-600 text-xl'
                    onClick={() => handleDeleteProductImage(index)}
                  >
                    <MdDelete />
                  </button>
                </div>
              ))}
              <button
                type='button'
                className='text-blue-600 text-sm underline'
                onClick={() => {
                  setData((prev) => ({
                    ...prev,
                    productImage: [...prev.productImage, ""]
                  }));
                }}
              >
                + Add Image URL
              </button>
            </div>
          </div>

          <div>
            <label htmlFor='price' className='block text-sm font-medium text-gray-700'>
              Price:
            </label>
            <input
              type='number'
              id='price'
              placeholder='Enter price'
              value={data.price}
              name='price'
              onChange={handleOnChange}
              className='mt-1 p-3 block w-full border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-300'
              required
            />
          </div>

          <div>
            <label htmlFor='sellingPrice' className='block text-sm font-medium text-gray-700'>
              Selling Price:
            </label>
            <input
              type='number'
              id='sellingPrice'
              placeholder='Enter selling price'
              value={data.sellingPrice}
              name='sellingPrice'
              onChange={handleOnChange}
              className='mt-1 p-3 block w-full border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-300'
              required
            />
          </div>

          <div>
            <label htmlFor='description' className='block text-sm font-medium text-gray-700'>
              Description:
            </label>
            <textarea
              className='mt-1 p-3 block w-full bg-gray-100 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-300'
              placeholder='Enter product description'
              rows={3}
              onChange={handleOnChange}
              name='description'
              value={data.description}
            ></textarea>
          </div>

          <div>
            <button className='w-full py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300'>
              Update Product
            </button>
          </div>
        </form>

        {openFullScreenImage && (
          <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
        )}
      </div>
    </div>
  );
};

export default AdminEditProduct;
