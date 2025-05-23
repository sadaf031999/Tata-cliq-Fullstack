import React, { useContext } from 'react'
import scrollTop from '../helpers/scrollTop'
import displayINRCurrency from '../helpers/displayCurrency'
import Context from '../context'
import addToCart from '../helpers/addToCart'
import addToWishlist from '../helpers/addToWishlist'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShoppingCart, faSearch,faCircleUser } from '@fortawesome/free-solid-svg-icons';

const VerticalCard = ({loading,data = []}) => {
    const loadingList = new Array(13).fill(null)
    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async(e,id)=>{
       await addToCart(e,id)
       fetchUserAddToCart()
    }
    const { fetchUserAddToWishlist } = useContext(Context)

     const handleAddToWishlist = async(e,id)=>{
       await addToWishlist(e,id)
       fetchUserAddToWishlist()
    }

  return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-center md:justify-between md:gap-4 overflow-x-scroll scrollbar-none transition-all'>
    {

         loading ? (
             loadingList.map((product,index)=>{
                 return(
                     <div className='w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow '>
                         <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse'>
                         </div>
                         <div className='p-4 grid gap-3'>
                             <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200'></h2>
                             <p className='capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200  py-2'></p>
                             <div className='flex gap-3'>
                                 <p className='text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2'></p>
                                 <p className='text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2'></p>
                             </div>
                             <button className='text-sm  text-white px-3  rounded-full bg-slate-200  py-2 animate-pulse'></button>
                         </div>
                     </div>
                 )
             })
         ) : (
             data.map((product,index)=>{
                 return(
                <Link
                to={`/product/${product?._id}`}
                key={product._id}
                className="w-full max-w-[240px] bg-white border rounded-md overflow-hidden hover:shadow-md transition-all group relative"
                onClick={scrollTop}
                >
                {/* Image */}
                <div className="relative h-64 w-full bg-gray-100 flex items-center justify-center">
                    <img
                    src={product?.productImage[0]}
                    alt={product?.productName}
                    className="h-full w-full object-cover p-2 transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Badge */}
                    <div className="absolute top-2 left-2 bg-pink-100 text-pink-600 text-xs font-medium px-2 py-0.5 rounded">
                    Online Only
                    </div>

                    {/* Wishlist & menu icons */}
                    
                </div>

                {/* Details */}
                <div className="p-3 space-y-1">
                  
                    <p className="text-sm text-gray-500 leading-tight line-clamp-2">{product?.productName}</p>
                    <p className="text-sm text-gray-500 line-clamp-2">{product?.description}</p>

                    <div className="flex items-center gap-2 mt-1">
                    <span className="text-base font-bold text-gray-800">{displayINRCurrency(product?.sellingPrice)}</span>
                    <span className="line-through text-sm text-gray-400">{displayINRCurrency(product?.price)}</span>
                    {product.price > product.sellingPrice && (
                        <span className="text-green-600 text-xs font-semibold">
                        ({Math.round(((product.price - product.sellingPrice) / product.price) * 100)}% OFF)
                        </span>
                    )}
                    </div>

                    {/* Ratings */}
                    <div className="flex items-center gap-1 text-xs text-gray-700 mt-1">
                    <div className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded flex items-center gap-1">
                        <span>4.5</span>
                        <i className="fas fa-star text-green-600 text-xs"></i>
                    </div>
                    <span>(12)</span>
                    </div>
                    {/* Add to Wishlist */}
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


                    {/* Stock status (optional) */}
                    <p className="text-xs text-red-600 font-medium mt-1">Limited stock!</p>
                </div>
                </Link>



                 )
             })
         )
         
     }
    </div>
  )
}

export default VerticalCard