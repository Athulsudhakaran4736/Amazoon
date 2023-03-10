import express from 'express';
import data from '../data.js';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';

const seedRoute = express.Router();
seedRoute.get('/', async (req, res) => {
  await Product.remove({});
  const createdProduct = await Product.insertMany(data.products);
  await User.remove({});
  const createdUser = await User.insertMany(data.users);
  res.send({ createdProduct, createdUser });
});

export default seedRoute;
