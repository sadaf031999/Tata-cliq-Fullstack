import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import addToWishlist from '../helpers/addToWishlist'
import Context from '../context'

const VerticalCardProduct = ({category, heading}) => {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(true)
    const loadingList = new Array(13).fill(null)

    const [scroll,setScroll] = useState(0)
    const scrollElement = useRef()

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


    const fetchData = async() =>{
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)

        console.log("horizontal data",categoryProduct.data)
        setData(categoryProduct?.data)
    }

    useEffect(()=>{
        fetchData()
    },[])

    const scrollRight = () =>{
        scrollElement.current.scrollLeft += 300
    }
    const scrollLeft = () =>{
        scrollElement.current.scrollLeft -= 300
    }


  return (
    <div className='container mx-auto px-4 my-6 relative'>

            <h2 className='text-2xl font-semibold py-4'>{heading}</h2>

                
           <div className='flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all' ref={scrollElement}>

            <button  className='bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block' onClick={scrollLeft}><FaAngleLeft/></button>
            <button  className='bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block' onClick={scrollRight}><FaAngleRight/></button> 

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
                key={product?._id}
                className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-md shadow-sm hover:shadow-md transition-all relative"
                >
                {/* Tag */}
                <div className="absolute top-2 left-2 bg-pink-100 text-pink-700 text-xs px-2 py-0.5 rounded-full z-10">
                    {product?.tag || 'Online Only'}
                </div>

                {/* Wishlist and More options */}
                <div className="absolute top-2 right-2 flex flex-col gap-1 z-10">
                    <button className="bg-white p-1 rounded-full shadow text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"
                        viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round"
                        d="M5 13l4 4L19 7" /></svg>
                    </button>
                    <button className="bg-white p-1 rounded-full shadow text-gray-500 text-xs font-bold">⋮</button>
                </div>

                {/* Product Image */}
                <div className="bg-gray-100 h-[300px] flex justify-center items-center overflow-hidden">
                    <img
                    src={product.productImage[0]}
                    alt={product.productName}
                    className="object-cover h-full w-full hover:scale-105 transition-transform"
                    />
                </div>

                {/* Content */}
                <div className="p-3">
                    <h3 className="text-sm font-semibold text-black">Bombay Paisley</h3>
                    <p className="text-sm text-gray-600 leading-tight mb-1">{product?.productName}</p>

                    <div className="flex items-center gap-2">
                    <p className="text-base font-medium text-black">{displayINRCurrency(product?.sellingPrice)}</p>
                    <p className="text-sm text-gray-500 line-through">{displayINRCurrency(product?.price)}</p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center text-sm gap-1 mt-1">
                    <span className="px-1.5 py-0.5 bg-green-100 text-green-700 rounded text-xs">
                        {product?.rating || '4.2'} ★
                    </span>
                    <span className="text-gray-500">({product?.totalRatings || 9})</span>
                    </div>

                    {/* Stock Info */}
                    <p className="text-xs text-red-600 mt-1 font-medium">Limited stock!</p>
                </div>
                </Link>

                        )
                    })
                )
                
            }
           </div>
            

    </div>
  )
}

export default VerticalCardProduct