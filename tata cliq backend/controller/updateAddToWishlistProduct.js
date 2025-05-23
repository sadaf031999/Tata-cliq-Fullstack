const addToWishlistModel = require("../models/wishlistProduct")

const updateAddToWishlistProduct = async(req,res)=>{
    try{
        const currentUserId = req.userId 
        const addToWishlistProductId = req?.body?._id

        const qty = req.body.quantity

        const updateProduct = await addToWishlistModel.updateOne({_id : addToWishlistProductId},{
            ...(qty && {quantity : qty})
        })

        res.json({
            message : "Product Updated",
            data : updateProduct,
            error : false,
            success : true
        })

    }catch(err){
        res.json({
            message : err?.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = updateAddToWishlistProduct