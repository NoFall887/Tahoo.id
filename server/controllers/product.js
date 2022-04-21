const { getAllProducts } = require("../models/products");

const productRoute = require("express").Router();

productRoute.get('/products', getAllProducts, (req, res) => {
  if(req.err) {
    res.json(req.err)
  }
  res.json(req.data)
})

module.exports = productRoute