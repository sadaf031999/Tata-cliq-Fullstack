const stripe = require('../config/stripe')
const userModel = require('../models/userModel')

const paymentController = async(request, response) => {
    try {
        const { cartItems, address } = request.body; // Accept address

        const user = await userModel.findOne({ _id: request.userId });

        const params = {
            submit_type: 'pay',
            mode: "payment",
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            shipping_options: [
                {
                    shipping_rate: 'shr_1RNialPGYyoS2f2o6SJahDn6'
                }
            ],
            customer_email: user.email,
            metadata: {
                userId: request.userId,
                // Add address fields to metadata
                shippingName: address?.name || "",
                shippingPhone: address?.phone || "",
                shippingAddressLine1: address?.addressLine1 || "",
                shippingAddressLine2: address?.addressLine2 || "",
                shippingCity: address?.city || "",
                shippingState: address?.state || "",
                shippingPostalCode: address?.postalCode || "",
                shippingCountry: address?.country || ""
            },
            line_items: cartItems.map((item, index) => ({
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: item.productId.productName,
                        images: item.productId.productImage,
                        metadata: {
                            productId: item.productId._id
                        }
                    },
                    unit_amount: item.productId.sellingPrice * 100
                },
                adjustable_quantity: {
                    enabled: true,
                    minimum: 1
                },
                quantity: item.quantity
            })),
            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
        };

        const session = await stripe.checkout.sessions.create(params);

        response.status(303).json(session);

    } catch (error) {
        response.json({
            message: error?.message || error,
            error: true,
            success: false
        });
    }
}


module.exports = paymentController