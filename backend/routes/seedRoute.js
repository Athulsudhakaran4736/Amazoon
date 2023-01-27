import express from 'express';
import data from '../data.js';
import Product from '../models/productModel.js';

const seedRoute = express.Router();
seedRoute.get('/', async (req, res) => {
  await Product.remove({});
  const createdProduct = await Product.insertMany(data.products);
  res.send({ createdProduct });
});

export default seedRoute;
