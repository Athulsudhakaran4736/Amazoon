import express from 'express';
import data from '../backend/data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRoute from './routes/seedRoute.js';
import productRoute from './routes/productRoute.js';
import userRoute from './routes/userRoute.js';

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

app.use(express.json()); //form data in the post request will be in json format
app.use(express.urlencoded({ extended: true }));

app.use('/api/seed', seedRoute);
app.use('/api/products', productRoute);
app.use('/api/users', userRoute);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
