// src/controllers/productController.js
// Brief: Retrieves and manages products including filters and single product queries.
const Product = require('../models/Product');

exports.getAllProducts = async (req, res, next) => {
  try {
    const { category, search } = req.query;
    const filter = {};
    if(category) filter.category = category;
    if(search) filter.title = new RegExp(search, 'i');
    const products = await Product.find(filter);
    res.json(products);
  } catch(err) {
    next(err);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if(!product) return res.status(404).json({ msg: 'Product not found' });
    res.json(product);
  } catch(err) {
    next(err);
  }
};
