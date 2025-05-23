import React, { useContext, useEffect, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/displayCurrency'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import addToWishlist from '../helpers/addToWishlist'
import Context from '../context'
import scrollTop from '../helpers/scrollTop'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShoppingCart, faSearch,faCircleUser } from '@fortawesome/free-solid-svg-icons';

const CategoryWiseProductDisplay = ({ category, brand, heading }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const loadingList = new Array(8).fill(null)

  const { fetchUserAddToCart } = useContext(Context)

  const handleAddToCart = async (e, id) => {
    e.preventDefault()
    await addToCart(e, id)
    fetchUserAddToCart()
  }

  const { fetchUserAddToWishlist } = useContext(Context)

  const handleAddToWishlist = async (e, id) => {
    e.preventDefault()
    await addToWishlist(e, id)
    fetchUserAddToWishlist()
  }

  const fetchData = async () => {
    setLoading(true)
    const categoryProduct = await fetchCategoryWiseProduct(category, brand)
    setData(categoryProduct?.data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const calculateDiscount = (price, sellingPrice) => {
    return ((price - sellingPrice) / price) * 100
  }

  return (
    <div className="container mx-auto px-4 my-8">
      <h2 className="text-2xl font-semibold mb-6 text-black">{heading}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {(loading ? loadingList : data).map((product, index) => {
          if (loading) {
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow animate-pulse h-[400px] p-4 flex flex-col gap-4"
              >
                <div className="bg-slate-200 h-48 w-full rounded"></div>
                <div className="bg-slate-200 h-4 rounded w-3/4"></div>
                <div className="bg-slate-200 h-3 rounded w-1/2"></div>
                <div className="bg-slate-200 h-4 rounded w-full"></div>
                <div className="bg-slate-200 h-10 rounded w-full mt-auto"></div>
              </div>
            )
          }

          const discount = calculateDiscount(product.price, product.sellingPrice)

          return (
                  <Link
        to={`/product/${product._id}`}
        onClick={scrollTop}
        key={product._id}
        className="bg-white border rounded shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden group w-full max-w-[240px]"
      >
        {/* Top Image Section */}
        <div className="relative w-full aspect-[3/4] bg-gray-100 overflow-hidden">
          <img
            src={product.productImage[0]}
            alt={product.productName}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Top Label */}
          <span className="absolute top-2 left-2 bg-pink-100 text-pink-700 text-xs font-semibold px-2 py-0.5 rounded">
            Online Only
          </span>
        </div>

        {/* Content */}
        <div className="p-3 flex flex-col gap-2">
          {/* Brand */}
          <h3 className="text-sm font-semibold text-black">
            {product.brandName || 'Brand'}
          </h3>

          {/* Product Title */}
          <p className="text-sm text-gray-800 leading-snug line-clamp-2">
            {product.productName}
          </p>

          {/* Price Section */}
          <div className="flex items-center gap-1 text-sm">
            <span className="text-black font-bold">
              {displayINRCurrency(product.sellingPrice)}
            </span>
            <span className="text-gray-400 line-through">
              {displayINRCurrency(product.price)}
            </span>
            {discount > 0 && (
              <span className="text-green-600 font-semibold text-xs">
                ({discount.toFixed(0)}% OFF)
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 text-xs text-gray-700">
            <div className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded flex items-center gap-1">
              <span className="font-semibold">4.{Math.floor(Math.random() * 10)}</span>
              <i className="fas fa-star text-green-600 text-[10px]"></i>
            </div>
            <span>(12)</span>
          </div>
          {/* Add to Cart */}
           <div className="flex gap-2 mt-3 w-full">
                              {/* Add to Cart */}
                              <button
                              className="flex items-center justify-center bg-white hover:bg-gray-900 text-black text-sm py-1.5 rounded-full transition-colors w-10"
                              style={{ minWidth: "2.5rem" }}
                              onClick={(e) => {
                                  e.preventDefault();
                                  handleAddToWishlist(e, product?._id);
                              }}
                              aria-label="Add to Wishlist"
                              >
                              <FontAwesomeIcon icon={faHeart} className="text-black text-2xl" />
                              </button>
          
                              <button
                                  className="flex-1 bg-black hover:bg-gray-900 text-white text-sm py-1.5 rounded-full transition-colors"
                                  onClick={(e) => {
                                  e.preventDefault();
                                  handleAddToCart(e, product?._id);
                                  }}
                              >
                                  Add to Cart
                              </button>
          
                              {/* Add to Wishlist */}
                              
                              </div>
          {/* Stock Alert */}
          <p className="text-xs text-red-600 font-medium mt-1">Limited stock!</p>
        </div>
      </Link>

          )
        })}
      </div>
    </div>
  )
}

export default CategoryWiseProductDisplay
