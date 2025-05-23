import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import Context from '../context'
import displayINRCurrency from '../helpers/displayCurrency'
import { MdDelete } from "react-icons/md";
import { loadStripe } from '@stripe/stripe-js';

const DELIVERY_FEE = 50;

const Cart = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const context = useContext(Context)
    const loadingCart = new Array(4).fill(null)

    // Updated address state to match backend model
    const [address, setAddress] = useState({
        name: "",
        phone: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        postalCode: "",
        country: ""
    });
    const [addressSubmitted, setAddressSubmitted] = useState(false);

    const handleAddressChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const handleAddressSubmit = (e) => {
        e.preventDefault();
        setAddressSubmitted(true);
    };

    const fetchData = async () => {
        const response = await fetch(SummaryApi.addToCartProductView.url, {
            method: SummaryApi.addToCartProductView.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
        })
        const responseData = await response.json()
        if (responseData.success) {
            setData(responseData.data)
        }
    }

    const handleLoading = async () => {
        await fetchData()
    }

    useEffect(() => {
        setLoading(true)
        handleLoading().finally(() => setLoading(false))
    }, [])

    const increaseQty = async (id, qty) => {
        const response = await fetch(SummaryApi.updateCartProduct.url, {
            method: SummaryApi.updateCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify({
                _id: id,
                quantity: qty + 1
            })
        })

        const responseData = await response.json()
        if (responseData.success) {
            fetchData()
        }
    }

    const decraseQty = async (id, qty) => {
        if (qty >= 2) {
            const response = await fetch(SummaryApi.updateCartProduct.url, {
                method: SummaryApi.updateCartProduct.method,
                credentials: 'include',
                headers: {
                    "content-type": 'application/json'
                },
                body: JSON.stringify({
                    _id: id,
                    quantity: qty - 1
                })
            })

            const responseData = await response.json()
            if (responseData.success) {
                fetchData()
            }
        }
    }

    const deleteCartProduct = async (id) => {
        const response = await fetch(SummaryApi.deleteCartProduct.url, {
            method: SummaryApi.deleteCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify({
                _id: id,
            })
        })

        const responseData = await response.json()
        if (responseData.success) {
            fetchData()
            context.fetchUserAddToCart()
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
            body: JSON.stringify({
                cartItems: data,
                address,
                deliveryFee: DELIVERY_FEE
            })
        })
        const responseData = await response.json()
        if (responseData?.id) {
            stripePromise.redirectToCheckout({ sessionId: responseData.id })
        }
    }

    const totalQty = data.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0)
    const totalPrice = data.reduce((preve, curr) => preve + (curr.quantity * (curr?.productId?.sellingPrice || 0)), 0)

    return (
        <div className="bg-[#f8f8f8] min-h-screen py-6">
            {/* Header */}
            <div className="container mx-auto px-4">
                <h1 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800 tracking-tight">My Bag</h1>
                {data.length === 0 && !loading && (
                    <div className="text-center py-16">
                        <h3 className="text-xl font-medium text-gray-700">Your Cart is Empty</h3>
                    </div>
                )}

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items */}
                    <div className="flex-1">
                        {loading ? (
                            loadingCart.map((_, idx) => (
                                <div key={idx} className="bg-slate-200 h-36 rounded-lg mb-4 animate-pulse" />
                            ))
                        ) : (
                            data.map((product, index) => {
                                if (!product?.productId) return null
                                return (
                                    <div key={product?._id} className="bg-white border rounded-xl shadow-sm flex flex-col md:flex-row items-center p-4 mb-6">
                                        <div className="w-28 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                            <img src={product?.productId?.productImage?.[0]} alt={product?.productId?.productName || "Product"} className="w-full h-full object-contain mix-blend-multiply" />
                                        </div>
                                        <div className="flex-1 md:ml-6 mt-4 md:mt-0 w-full relative">
                                            {/* Delete button */}
                                            <button
                                                className="absolute top-0 right-0 text-red-500 hover:bg-red-100 rounded-full p-2 transition"
                                                onClick={() => deleteCartProduct(product?._id)}
                                                title="Remove"
                                            >
                                                <MdDelete size={22} />
                                            </button>
                                            <h2 className="text-lg font-semibold text-gray-900">{product?.productId?.brandName || "No name"}</h2>
                                            <p className="capitalize text-gray-500 text-sm">{product?.productId?.category || "No category"}</p>
                                            <p className="capitalize text-gray-500 text-sm">{product?.productId?.productName || "No category"}</p>
                                            <div className="flex items-center gap-3 mt-2">
                                                <span className="text-pink-600 font-bold text-lg">{displayINRCurrency(product?.productId?.sellingPrice || 0)}</span>
                                                <span className="line-through text-gray-400 text-base">{displayINRCurrency(product?.productId?.price || 0)}</span>
                                                <span className="text-green-600 text-sm font-medium">
                                                    {product?.productId?.price && product?.productId?.sellingPrice
                                                        ? `${Math.round(100 * (product.productId.price - product.productId.sellingPrice) / product.productId.price)}% Off`
                                                        : null}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-4 mt-4">
                                                <div className="flex items-center border rounded overflow-hidden">
                                                    <button className="px-2 py-1 text-pink-600 hover:bg-pink-50" onClick={() => decraseQty(product?._id, product?.quantity)}>-</button>
                                                    <span className="px-3 py-1 bg-gray-50">{product?.quantity}</span>
                                                    <button className="px-2 py-1 text-pink-600 hover:bg-pink-50" onClick={() => increaseQty(product?._id, product?.quantity)}>+</button>
                                                </div>
                                                <span className="text-gray-600 text-sm">x {displayINRCurrency(product?.productId?.sellingPrice || 0)}</span>
                                                <span className="font-semibold text-gray-800">{displayINRCurrency((product?.productId?.sellingPrice || 0) * product?.quantity)}</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        )}
                    </div>

                    {/* Address Details & Order Summary in ONE BOX */}
                    {data.length > 0 && (
                        <div className="w-full max-w-sm">
                            {loading ? (
                                <div className="h-44 bg-slate-200 border border-slate-300 animate-pulse rounded-xl" />
                            ) : (
                                <div className="bg-white rounded-xl shadow-md border p-6 flex flex-col gap-6">
                                    {/* Address Section */}
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Shipping Address</h2>
                                        {!addressSubmitted ? (
                                            <form className="flex flex-col gap-3" onSubmit={handleAddressSubmit}>
                                                <input name="name" placeholder="Full Name" value={address.name} onChange={handleAddressChange} className="border rounded p-2" required />
                                                <input name="phone" placeholder="Phone" value={address.phone} onChange={handleAddressChange} className="border rounded p-2" required />
                                                <input name="addressLine1" placeholder="Street Address" value={address.addressLine1} onChange={handleAddressChange} className="border rounded p-2" required />
                                                <input name="addressLine2" placeholder="Apartment, suite, etc. (optional)" value={address.addressLine2} onChange={handleAddressChange} className="border rounded p-2" />
                                                <input name="city" placeholder="City" value={address.city} onChange={handleAddressChange} className="border rounded p-2" required />
                                                <input name="state" placeholder="State" value={address.state} onChange={handleAddressChange} className="border rounded p-2" required />
                                                <input name="postalCode" placeholder="Postal Code" value={address.postalCode} onChange={handleAddressChange} className="border rounded p-2" required />
                                                <input name="country" placeholder="Country" value={address.country} onChange={handleAddressChange} className="border rounded p-2" required />
                                                <button type="submit" className="bg-pink-600 text-white rounded-lg py-2 mt-2 font-semibold hover:bg-pink-700 transition">Save Address</button>
                                            </form>
                                        ) : (
                                            <div className="bg-gray-50 border rounded p-3 text-gray-700">
                                                <div><b>Name:</b> {address.name}</div>
                                                <div><b>Phone:</b> {address.phone}</div>
                                                <div><b>Street:</b> {address.addressLine1}</div>
                                                {address.addressLine2 && <div><b>Address Line 2:</b> {address.addressLine2}</div>}
                                                <div><b>City:</b> {address.city}</div>
                                                <div><b>State:</b> {address.state}</div>
                                                <div><b>Postal Code:</b> {address.postalCode}</div>
                                                <div><b>Country:</b> {address.country}</div>
                                                <button className="text-sm text-pink-600 mt-2 underline" onClick={() => setAddressSubmitted(false)}>Edit</button>
                                            </div>
                                        )}
                                    </div>
                                    {/* Order Summary */}
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Order Summary</h2>
                                        <div className="flex justify-between py-2 text-gray-700">
                                            <span>Bag Total</span>
                                            <span>{displayINRCurrency(totalPrice)}</span>
                                        </div>
                                        <div className="flex justify-between py-2 text-gray-700">
                                            <span>Quantity</span>
                                            <span>{totalQty}</span>
                                        </div>
                                        <div className="flex justify-between py-2 text-gray-700">
                                            <span>Delivery</span>
                                            <span className="text-gray-800 font-medium">{displayINRCurrency(DELIVERY_FEE)}</span>
                                        </div>
                                        <div className="flex justify-between py-2 text-gray-700 border-t mt-2 pt-2 font-bold text-lg">
                                            <span>Total</span>
                                            <span>{displayINRCurrency(totalPrice + DELIVERY_FEE)}</span>
                                        </div>
                                        <button
                                            className="w-full bg-pink-600 text-white rounded-lg py-3 mt-6 font-semibold text-lg hover:bg-pink-700 transition"
                                            onClick={handlePayment}
                                            disabled={!addressSubmitted}
                                        >
                                            Checkout
                                        </button>
                                        {!addressSubmitted && <div className="text-xs text-red-500 mt-2">Please save your address before checkout.</div>}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Cart
