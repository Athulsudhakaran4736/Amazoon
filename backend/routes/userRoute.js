import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import { generateToken } from '../utils.js';
import expressAsyncHandler from 'express-async-handler';

const userRoute = express.Router();

userRoute.post(
  '/signIn',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user),
      });
      return;
    } else res.status(401).send({ message: 'Invalid password or email' });
  })
);

export default userRoute;
