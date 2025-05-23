const addToWishlistModel = require("../models/wishlistProduct")

const addToWishlistController = async(req,res)=>{
    try{
        const { productId } = req?.body
        const currentUser = req.userId

        const isProductAvailable = await addToWishlistModel.findOne({ productId, userId : currentUser })

        console.log("isProductAvailabl   ",isProductAvailable)

        if(isProductAvailable){
            return res.json({
                message : "Already exits in Add to wishlist",
                success : false,
                error : true
            })
        }

        const payload  = {
            productId : productId,
            quantity : 1,
            userId : currentUser,
        }

        const newAddToWishlist = new addToWishlistModel(payload)
        const saveProduct = await newAddToWishlist.save()


        return res.json({
            data : saveProduct,
            message : "Product Added in Wishlist",
            success : true,
            error : false
        })
        

    }catch(err){
        res.json({
            message : err?.message || err,
            error : true,
            success : false
        })
    }
}


module.exports = addToWishlistController