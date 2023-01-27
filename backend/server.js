import express from 'express';
import data from '../backend/data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRoute from './routes/seedRoute.js';
import productRoute from './routes/productRoute.js';

dotenv.config();
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.use('/api/seed', seedRoute);
app.use('/api/products', productRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
