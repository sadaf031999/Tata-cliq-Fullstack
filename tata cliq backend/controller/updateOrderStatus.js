const updateOrderStatusPermission = require("../helpers/permission")
const orderModel = require("../models/orderProductModel")

async function UpdateOrderStatusController(req, res) {
    console.log("Received payload:", req.body, "User ID:", req.userId);
    try {
        const sessionUserId = req.userId

        if (!updateOrderStatusPermission(sessionUserId)) {
            throw new Error("Permission denied")
        }

        const { orderId, status } = req.body

        if (!orderId || !status) {
            throw new Error("Order ID and status are required")
        }

        const updatedOrder = await orderModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        )

        if (!updatedOrder) {
            throw new Error("Order not found")
        }

        res.status(200).json({
            message: "Order status updated successfully",
            error: false,
            success: true,
            data: updatedOrder
        })

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = UpdateOrderStatusController
