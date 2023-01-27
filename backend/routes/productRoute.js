import express from 'express';
import Product from '../models/productModel.js';

const productRoute = express.Router();
productRoute.get('/', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});
productRoute.get(`/slug/:slug`, async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'product not found' });
  }
});
productRoute.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  console.log(product);
  if (product) {
    res.send(product);
  } else {
    res.status(204).send({ message: 'product not found' });
  }
});

export default productRoute;
