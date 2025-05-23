const productModel = require("../models/productModel");

const filterProductController = async (req, res) => {
  try {
    const categoryList = req?.body?.category || [];
    const brandList = req?.body?.brandName || [];
    const minPrice = req?.body?.minPrice;
    const maxPrice = req?.body?.maxPrice;

    const filterQuery = {};

    if (categoryList.length > 0) {
      filterQuery.category = { $in: categoryList };
    }

    if (brandList.length > 0) {
      filterQuery.brandName = { $in: brandList };
    }

    if (minPrice || maxPrice) {
      filterQuery.price = {};
      if (minPrice) filterQuery.price.$gte = Number(minPrice);
      if (maxPrice) filterQuery.price.$lte = Number(maxPrice);
    }

    const products = await productModel.find(filterQuery);

    res.json({
      data: products,
      message: "Filtered products",
      error: false,
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Something went wrong",
      error: true,
      success: false,
    });
  }
};

module.exports = filterProductController;
