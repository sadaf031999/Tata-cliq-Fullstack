import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { MdOutlineContentCopy } from 'react-icons/md'

const HorizontalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [scroll, setScroll] = useState(0)
  const scrollElement = useRef()

  const { fetchUserAddToCart } = useContext(Context)

  const handleAddToCart = async (e, id) => {
    e.preventDefault()
    await addToCart(e, id)
    fetchUserAddToCart()
  }

  const fetchData = async () => {
    setLoading(true)
    const categoryProduct = await fetchCategoryWiseProduct(category)
    setLoading(false)
    setData(categoryProduct?.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300
  }

  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300
  }

  return (
    <div className='container mx-auto px-4 my-6 relative'>
      <h2 className='text-2xl font-semibold py-4'>{heading}</h2>

      <div className='relative'>
        <button className='bg-white shadow-md rounded-full p-2 absolute left-0 top-1/2 transform -translate-y-1/2 z-10 hidden md:block' onClick={scrollLeft}><FaAngleLeft /></button>
        <button className='bg-white shadow-md rounded-full p-2 absolute right-0 top-1/2 transform -translate-y-1/2 z-10 hidden md:block' onClick={scrollRight}><FaAngleRight /></button>

        <div className='flex gap-4 overflow-x-scroll scrollbar-none scroll-smooth' ref={scrollElement}>
          {data.map((product, index) => (
            <Link
              to={'/product/' + product?._id}
              key={product?._id}
              className='min-w-[230px] max-w-[230px] bg-white rounded-md shadow-sm hover:shadow-md transition-all relative'
            >
              {/* Tag */}
              <div className='absolute top-2 left-2 bg-pink-100 text-pink-700 text-xs px-2 py-0.5 rounded-full z-10'>
                {product?.tag || 'Online Only'}
              </div>

              

              {/* Product Image */}
               <div className="relative h-64 w-full bg-gray-100 flex items-center justify-center">
                <img
                    src={product.productImage[0]}
                    alt={product.productName}
                    className='w-full h-full object-cover transition-transform duration-300 hover:scale-105'
                />
                </div>


              <div className='p-3'>
                
                <p className='text-sm font-semibold text-black leading-tight'>{product.productName}</p>
                <p className="text-sm text-gray-500 line-clamp-2">{product?.description}</p>

                <div className='mt-1 flex items-center gap-2'>
                <p className='text-base font-medium text-black'>{displayINRCurrency(product?.sellingPrice)}</p>
                <p className='text-sm line-through text-gray-500'>{displayINRCurrency(product?.price)}</p>
                <p className='text-sm text-red-600 font-medium whitespace-nowrap'>
                {`${Math.round(((product?.price - product?.sellingPrice) / product?.price) * 100)}% off`}
                </p>



                </div>


                {/* Rating */}
                <div className='flex items-center text-sm gap-1 mt-1'>
                    <span className='px-1.5 py-0.5 bg-green-100 text-green-700 rounded text-xs'>{product?.rating || '4.2'} ★</span>
                    <span className='text-gray-500'>({product?.totalRatings || 9})</span>
                </div>

                {/* Stock */}
                <p className='text-xs text-red-600 mt-1 font-medium'>Limited stock!</p>

                {/* Add to Cart Button */}
                <button
                onClick={(e) => handleAddToCart(e, product?._id)}
                className='mt-3 w-full bg-black hover:bg-gray-900 text-white text-sm py-1.5 rounded-full transition-colors'
                >
                Add to Cart
                </button>   
              </div>

               </Link>
                ))}
                </div>
                </div>
                </div>
  )
}

export default HorizontalCardProduct
