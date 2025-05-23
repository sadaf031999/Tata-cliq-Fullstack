import React from "react";

const categories = [
  {
     //label: "MENSWEAR",
    img: "https://assets.tatacliq.com/medias/sys_master/images/64927656509470.png",
  },
  {
     //label: "KIDSWEAR",
    img: "https://assets.tatacliq.com/medias/sys_master/images/64927656706078.png",
  },
  {
     //label: "WOMENSWEAR",
    img: "https://assets.tatacliq.com/medias/sys_master/images/64927656443934.png",
  },
  {
     //label: "FOOTWEAR",
    img: "https://assets.tatacliq.com/medias/sys_master/images/64927656640542.png",
  },
  {
     //label: "GADGETS",
    img: "https://assets.tatacliq.com/medias/sys_master/images/64927656968222.png",
  },
  {
     //label: "BEAUTY",
    img: "https://assets.tatacliq.com/medias/sys_master/images/64927656837150.png",
  },
  {
     //label: "WATCHES",
    img: "https://assets.tatacliq.com/medias/sys_master/images/64927661555742.png",
  },
  {
     //label: "HANDBAG",
    img: "https://assets.tatacliq.com/medias/sys_master/images/64927656575006.png",
  },
];

function CategoryCards() {
  return (
    <div className="w-full px-8 py-8 bg-white mt-10">
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6">
        {categories.map((category, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-28 h-28 rounded-xl overflow-hidden shadow-lg bg-gray-100">
              <img
                src={category.img}
                alt={category.label}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm mt-3 text-center text-[#541B1B] font-semibold tracking-wide">
              {category.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryCards;

{/*import React, { useEffect, useState } from 'react'
import SummaryApi from '../../common' // Make sure this path is correct
import { Link } from 'react-router-dom'

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([])
  const [loading, setLoading] = useState(false)

  const categoryLoading = new Array(12).fill(null)

  const fetchCategoryProduct = async () => {
    try {
      setLoading(true)
      const response = await fetch(SummaryApi.categoryProduct.url)
      const data = await response.json()
      setCategoryProduct(data?.data || [])
    } catch (error) {
      console.error("Error fetching categories:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategoryProduct()
  }, [])

  return (
    <div className="w-full px-4 py-6 bg-white overflow-x-auto">
      <div className="flex gap-4 whitespace-nowrap scrollbar-none">
        {loading
          ? categoryLoading.map((_, index) => (
              <div
                key={index}
                className="w-28 h-28 rounded-2xl bg-slate-200 animate-pulse"
              />
            ))
          : categoryProduct.map((product, index) => (
              <Link
                to={`/product-category?category=${encodeURIComponent(product.category)}`}
                key={index}
                className="flex flex-col items-center min-w-[96px]"
              >
                <div className="w-24 h-34 rounded-xl overflow-hidden bg-gray-100 shadow-md">
                  <img
                    src={product.productImage[0]}
                    alt={product.category}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <p className="mt-2 text-xs font-medium text-[#541B1B] text-center uppercase tracking-wide">
                  {product.category}
                </p>
              </Link>
            ))}
      </div>
    </div>
  )
}

export default CategoryList*/}


