import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import moment from 'moment'
import displayINRCurrency from '../helpers/displayCurrency'
import { FaShoppingCart, FaCog, FaTruck, FaCheckCircle } from 'react-icons/fa'

const statusSteps = [
  { label: "ordered", icon: FaShoppingCart },
  { label: "Processing", icon: FaCog },
  { label: "dispatched", icon: FaTruck },
  { label: "Delivered", icon: FaCheckCircle }
]

const getStatusIndex = (status) =>
  statusSteps.findIndex(step => step.label.toLowerCase() === status.toLowerCase())

// Utility to get status label color
const getStatusLabelColor = (status) => {
  switch (status.toLowerCase()) {
    case 'ordered':
      return 'bg-gray-400 text-white';
    case 'processing':
      return 'bg-yellow-500 text-white';
    case 'dispatched':
      return 'bg-blue-500 text-white';
    case 'delivered':
      return 'bg-green-600 text-white';
    default:
      return 'bg-gray-300 text-gray-700';
  }
};

// --- Order Summary Card ---
const OrderSummaryCard = ({ order, onViewDetails, isExpanded }) => (
  <div className="border rounded shadow bg-white flex flex-col w-full max-w-sm mx-auto mb-4">
    <div className="p-4 flex flex-col gap-2">
      <span className="text-xs text-gray-500">
        Order ID: <span className="font-semibold text-gray-700">{order._id}</span>
      </span>
      <span className="text-sm text-gray-700">{moment(order.createdAt).format('LL')}</span>
      <div className="flex items-center gap-2 mt-2 flex-wrap">
        {order.productDetails.map((product, idx) => (
          product.image[0] && (
            <img
              key={product.productId + idx}
              src={product.image[0]}
              alt={product.name}
              className="w-10 h-10 rounded bg-slate-100 object-scale-down"
            />
          )
        ))}
      </div>
      <div className="flex justify-between items-center mt-3">
        <span className="text-sm font-semibold flex items-center gap-2">
          Status:
          <span
            className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${getStatusLabelColor(order.status)}`}
          >
            {order.status}
          </span>
        </span>
        <span className="font-bold">{displayINRCurrency(order.totalAmount)}</span>
      </div>
      <button
        className="mt-3 px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
        onClick={onViewDetails}
      >
        {isExpanded ? "Hide Details" : "View Details"}
      </button>
    </div>
  </div>
)

// --- Order Details (full) ---
const OrderDetails = ({ order }) => {
  const currentStatusIndex = getStatusIndex(order.status)
  return (
    <div className="bg-gray-50 p-4 rounded-b shadow-inner">
      {/* Product List */}
      <div className="grid gap-2 mb-2">
        {order.productDetails.map((product, idx) => (
          <div key={product.productId + idx} className="flex gap-3 bg-slate-100 mb-2 rounded p-2">
            <div className="flex gap-2">
              {product.image.map((imgUrl, i) => (
                <img
                  key={imgUrl + i}
                  src={imgUrl}
                  className="w-14 h-14 bg-slate-200 object-scale-down p-1 rounded"
                  alt={product.name + ' image ' + (i + 1)}
                />
              ))}
            </div>
            <div>
              <div className="font-medium text-base text-ellipsis line-clamp-1">{product.name}</div>
              <div className="flex items-center gap-5 mt-1">
                <div className="text-base text-red-500">{displayINRCurrency(product.price)}</div>
                <p>Qty: {product.quantity}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Track Your Order */}
      <div className="mt-2 p-3 bg-blue-50 rounded">
        <h3 className="font-semibold text-base mb-2 text-blue-900">Track Your Order</h3>
        <div className="flex items-center gap-2">
          {statusSteps.map((step, idx) => {
            const Icon = step.icon
            const isActive = idx === currentStatusIndex
            const isCompleted = idx < currentStatusIndex
            return (
              <React.Fragment key={step.label}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-9 h-9 flex items-center justify-center rounded-full border-2
                      ${isCompleted || isActive
                        ? "bg-green-600 text-white border-green-600"
                        : "bg-gray-300 text-gray-600 border-gray-300"}
                      transition-colors duration-300`}
                  >
                    <Icon size={18} />
                  </div>
                  <span className={`text-xs mt-1 text-center w-20 
                    ${isCompleted || isActive ? "text-green-700 font-semibold" : "text-gray-500"}`}>
                    {step.label}
                  </span>
                </div>
                {idx < statusSteps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-1 rounded transition-colors duration-300
                      ${idx < currentStatusIndex ? "bg-green-600" : "bg-gray-300"}`}
                    style={{ minWidth: 24 }}
                  ></div>
                )}
              </React.Fragment>
            )
          })}
        </div>
        <div className="mt-2 text-sm text-blue-800">
          Current Status: <span className="font-bold">{order.status}</span>
        </div>
      </div>

      {/* Shipping Details */}
      <div className="mt-3">
        <div className="text-base font-medium">Shipping Details:</div>
        {order.shippingAddress && (
          <div className="ml-1 mt-2 bg-slate-50 p-2 rounded">
            <div className="font-medium">Address:</div>
            <div>{order.shippingAddress.name}</div>
            <div>{order.shippingAddress.addressLine1}</div>
            {order.shippingAddress.addressLine2 && <div>{order.shippingAddress.addressLine2}</div>}
            <div>
              {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.postalCode}
            </div>
            <div>{order.shippingAddress.country}</div>
            <div>Phone: {order.shippingAddress.phone}</div>
          </div>
        )}
      </div>

      {/* Total Amount at the end */}
      <div className="font-semibold lg:text-lg mt-4 text-right">
        Total Amount: {displayINRCurrency(order.totalAmount)}
      </div>
    </div>
  )
}

// --- Main Page ---
const OrderPage = () => {
  const [data, setData] = useState([])
  const [expandedIndex, setExpandedIndex] = useState(null)

  const fetchOrderDetails = async () => {
    const response = await fetch(SummaryApi.getOrder.url, {
      method: SummaryApi.getOrder.method,
      credentials: 'include'
    })
    const responseData = await response.json()
    setData(responseData.data)
  }

  useEffect(() => {
    fetchOrderDetails()
  }, [])

  return (
    <div className="p-4 w-full">
      {
        !data[0] && (
          <p className="text-center mt-10 text-gray-500">No Order available</p>
        )
      }
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.map((item, index) => (
          <div key={item._id + index}>
            <OrderSummaryCard
              order={item}
              isExpanded={expandedIndex === index}
              onViewDetails={() => setExpandedIndex(expandedIndex === index ? null : index)}
            />
            {expandedIndex === index && (
              <OrderDetails order={item} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default OrderPage
