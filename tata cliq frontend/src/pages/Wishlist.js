import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import Context from '../context'
import displayINRCurrency from '../helpers/displayCurrency'
import { MdDelete } from "react-icons/md"
import { loadStripe } from '@stripe/stripe-js'
import addToCart from '../helpers/addToCart'
import { Link } from 'react-router-dom'
import scrollTop from '../helpers/scrollTop'

const Wishlist = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const context = useContext(Context)
  const loadingWishlist = new Array(4).fill(null)
  const { fetchUserAddToCart, cart = [] } = useContext(Context)

  const fetchData = async () => {
    setLoading(true)
    const response = await fetch(SummaryApi.addToWishlistProductView.url, {
      method: SummaryApi.addToWishlistProductView.method,
      credentials: 'include',
      headers: {
        "content-type": 'application/json'
      },
    })
    const responseData = await response.json()
    if (responseData.success) {
      setData(responseData.data)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const isProductInCart = (productId) => {
    return cart.some(item => item.productId?._id === productId)
  }

  const handleAddToCart = async (e, productId, wishlistId) => {
    e.preventDefault()
    if (isProductInCart(productId)) {
      alert('Product already in cart')
      return
    }
    await addToCart(e, productId)
    fetchUserAddToCart()
    await deleteWishlistProduct(wishlistId)
  }

  const deleteWishlistProduct = async (id) => {
    const response = await fetch(SummaryApi.deleteWishlistProduct.url, {
      method: SummaryApi.deleteWishlistProduct.method,
      credentials: 'include',
      headers: {
        "content-type": 'application/json'
      },
      body: JSON.stringify({ _id: id })
    })
    const responseData = await response.json()
    if (responseData.success) {
      fetchData()
      context.fetchUserAddToWishlist()
    }
  }

  const handlePayment = async () => {
    const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
    const response = await fetch(SummaryApi.payment.url, {
      method: SummaryApi.payment.method,
      credentials: 'include',
      headers: {
        "content-type": 'application/json'
      },
      body: JSON.stringify({ cartItems: data })
    })
    const responseData = await response.json()
    if (responseData?.id) {
      stripePromise.redirectToCheckout({ sessionId: responseData.id })
    }
  }

  const totalQty = data.reduce((prev, curr) => prev + curr.quantity, 0)
  const totalPrice = data.reduce((prev, curr) => prev + (curr.quantity * curr?.productId?.sellingPrice), 0)

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold mt-6 mb-4">My Wishlist</h2>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-4">
        <button className="px-4 py-2 bg-black text-white rounded-full font-semibold">All</button>
      </div>

      {/* Wishlist Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading
          ? loadingWishlist.map((_, index) => (
            <div key={index} className="bg-gray-200 h-80 animate-pulse rounded-lg" />
          ))
          : data.map((product) => (
            <div key={product._id} className="bg-white shadow-sm rounded-md overflow-hidden relative">
              {/* Delete Icon */}
              <div
                className="absolute top-2 right-2 bg-white p-1 rounded-full text-gray-600 hover:text-red-600 cursor-pointer z-10"
                onClick={() => deleteWishlistProduct(product._id)}
              >
                <MdDelete size={20} />
              </div>

              {/* Product Image */}
              <Link
                to={`/product/${product?.productId?._id}`}
                onClick={scrollTop}
              >
                <img
                  src={product?.productId?.productImage[0]}
                  alt={product?.productId?.productName}
                  className="w-full h-72 object-contain mix-blend-multiply p-4 cursor-pointer"
                />
              </Link>

              {/* Product Info */}
              <div className="p-4">
                <button
                  className="w-full bg-[#d61a56] hover:bg-[#b31548] text-white font-semibold py-2 rounded mb-2"
                  onClick={(e) => handleAddToCart(e, product?.productId?._id, product?._id)}
                  disabled={isProductInCart(product?.productId?._id)}
                >
                  {isProductInCart(product?.productId?._id) ? 'Already in Cart' : 'Add to Cart'}
                </button>

                <h3 className="font-semibold text-sm text-gray-900">{product?.productId?.brandName}</h3>
                <p className="text-sm text-gray-700 mb-2">{product?.productId?.productName}</p>

                <div className="flex items-center space-x-2 text-sm">
                  <span className="font-semibold text-gray-900">
                    ₹{product?.productId?.sellingPrice}
                  </span>
                  <span className="line-through text-gray-500">
                    ₹{product?.productId?.price}
                  </span>
                  <span className="text-green-600 font-medium">
                    {Math.round(
                      ((product?.productId?.price - product?.productId?.sellingPrice) /
                        product?.productId?.price) *
                      100
                    )}% Off
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Empty Wishlist */}
      {data.length === 0 && !loading && (
        <div className="text-center py-16">
          <h3 className="text-xl font-medium text-gray-700">Your Wishlist is Empty</h3>
        </div>
      )}
    </div>
  )
}

export default Wishlist
