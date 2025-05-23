const productModel = require("../models/productModel");

const getCategoryWiseProduct = async (req, res) => {
  try {
    const { category, brand } = req.method === 'POST' ? req.body : req.query;
    console.log("Received category:", category);
    console.log("Received brand:", brand);

    // Build dynamic query
    const query = {};
    if (category) query.category = category;
    if (brand) query.brandName = brand;

    const products = await productModel.find(query);

    res.json({
      data: products,
      message: "Filtered Products",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = getCategoryWiseProduct;
