import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import moment from 'moment'
import displayINRCurrency from '../helpers/displayCurrency'
import { FaEye } from "react-icons/fa"

const statusOptions = [
  { value: 'ordered', label: 'Ordered', color: 'bg-blue-100 text-blue-700' },
  { value: 'processing', label: 'Processing', color: 'bg-yellow-100 text-yellow-700' },
  { value: 'dispatched', label: 'Dispatched', color: 'bg-purple-100 text-purple-700' },
  { value: 'delivered', label: 'Delivered', color: 'bg-green-100 text-green-700' },
]

const AllOrder = () => {
  const [data, setData] = useState([])
  const [selectedOrderId, setSelectedOrderId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [statusUpdating, setStatusUpdating] = useState(null) // holds orderId being updated

  // Fetch all orders
  const fetchOrderDetails = async () => {
    setLoading(true)
    try {
      const response = await fetch(SummaryApi.allOrder.url, {
        method: SummaryApi.allOrder.method,
        credentials: 'include'
      })
      const responseData = await response.json()
      setData(responseData.data)
      console.log("All Orders Fetched:", responseData.data)
    } catch (error) {
      console.error("Failed to fetch orders:", error)
    } finally {
      setLoading(false)
    }
  }

  // Update order status
  const updateOrderStatus = async (orderId, newStatus) => {
     console.log("Payload being sent:", { orderId, status: newStatus });
    setStatusUpdating(orderId)
    try {
      const response = await fetch(SummaryApi.updateOrderStatus.url, {
        method: SummaryApi.updateOrderStatus.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          orderId,
          status: newStatus
        })
      })
      if (response.ok) {
        setData(prev =>
          prev.map(order =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        )
      } else {
        alert('Failed to update status')
      }
    } catch (error) {
      alert('Failed to update status')
      console.error(error)
    } finally {
      setStatusUpdating(null)
    }
  }

  useEffect(() => {
    fetchOrderDetails()
  }, [])

  // Find the selected order object from data using selectedOrderId
  const selectedOrder = data.find(o => o._id === selectedOrderId)

  return (
    <div className='p-4'>
      <h2 className='text-2xl font-bold mb-4'>All Orders</h2>
      
      {loading ? (
        <p>Loading orders...</p>
      ) : data.length === 0 ? (
        <p>No orders available</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">#</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Order ID</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">User Email</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Date</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Amount</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.map((order, index) => (
                <tr key={order._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order._id?.substring(0, 8)}...</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.email || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {moment(order.createdAt).format('MMM D, YYYY')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={order.status}
                      onChange={e => updateOrderStatus(order._id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-sm font-medium capitalize border ${
                        statusOptions.find(opt => opt.value === order.status)?.color || 'bg-gray-200'
                      }`}
                      disabled={statusUpdating === order._id}
                    >
                      {statusOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    {statusUpdating === order._id && (
                      <span className="ml-2 text-xs text-gray-400">Updating...</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {displayINRCurrency(order.totalAmount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => setSelectedOrderId(order._id)}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                    >
                      <FaEye className="inline-block" /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative shadow-lg text-black">
            <button 
              onClick={() => setSelectedOrderId(null)}
              className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-2xl"
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-4">Order Details</h3>
            <div className="mb-4">
              <span className="font-semibold">Order ID:</span> {selectedOrder._id}
            </div>
            <div className="mb-4">
              <span className="font-semibold">User Email:</span> {selectedOrder.email || 'N/A'}
            </div>
            <div className="mb-4">
              <span className="font-semibold">Order Date:</span> {moment(selectedOrder.createdAt).format('LLL')}
            </div>
            <div className="mb-4">
              <span className="font-semibold">Status:</span> {selectedOrder.status}
            </div>
            <div className="mb-4">
              <span className="font-semibold">Total Amount:</span> {displayINRCurrency(selectedOrder.totalAmount)}
            </div>
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Products</h4>
              {selectedOrder.productDetails.map((product, idx) => (
                <div key={idx} className="flex gap-4 mb-4 p-2 bg-gray-50 rounded">
                  <img
                    src={product.image[0]}
                    alt={product.name}
                    className="w-20 h-20 object-contain bg-white p-1 rounded border"
                  />
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-gray-700">
                      {displayINRCurrency(product.price)} × {product.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Payment Information</h4>
              <div className="bg-gray-50 p-3 rounded">
                <p>Method: {selectedOrder.paymentDetails?.payment_method_type?.join(', ') || 'N/A'}</p>
                <p>Status: {selectedOrder.paymentDetails?.payment_status || 'N/A'}</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Shipping Address</h4>
              <div className="bg-gray-50 p-3 rounded">
                {selectedOrder.shippingAddress ? (
                  <>
                    <p>{selectedOrder.shippingAddress.name}</p>
                    <p>{selectedOrder.shippingAddress.addressLine1}</p>
                    {selectedOrder.shippingAddress.addressLine2 && (
                      <p>{selectedOrder.shippingAddress.addressLine2}</p>
                    )}
                    <p>
                      {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} -{' '}
                      {selectedOrder.shippingAddress.postalCode}
                    </p>
                    <p>{selectedOrder.shippingAddress.country}</p>
                    <p>Phone: {selectedOrder.shippingAddress.phone}</p>
                  </>
                ) : (
                  <p>No shipping address provided</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AllOrder
