const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.post('/create', async (req, res) => {
  const { name, price, quantity, description, farmerId, image } = req.body;
  const product = new Product({ name, price, quantity, description, farmer: farmerId, image });
  await product.save();
  res.json(product);
});

router.get('/all', async (req, res) => {
  const products = await Product.find().populate('farmer', 'name address');
  res.json(products);
});

module.exports = router;
