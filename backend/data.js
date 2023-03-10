import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Athul',
      email: 'user@gmail.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
    {
      name: 'Ana',
      email: 'admin@gmail.com',
      password: bcrypt.hashSync('123456234'),
      isAdmin: true,
    },
  ],
  products: [
    {
      name: 'Netplay Slim Shirt',
      slug: 'netplay-slim-shirt',
      category: 'shirt',
      Image: '/images/p1.jpg',
      price: 20,
      countInstock: 10,
      brand: 'Netplay',
      rating: 5,
      numReviews: 10,
      description: 'Best quality shirt',
    },
    {
      name: 'NorthRepublic Slim Shirt',
      slug: 'north-republic-slim-shirt',
      category: 'shirt',
      Image: '/images/p2.jpg',
      price: 15,
      countInstock: 0,
      brand: 'NorthRepublic',
      rating: 2,
      numReviews: 10,
      description: 'Best quality shirt',
    },
    {
      name: `Levi's pant`,
      slug: `Levi's-pant`,
      category: 'pant',
      Image: '/images/p3.jpg',
      price: 60,
      countInstock: 10,
      brand: `Levi's`,
      rating: 5,
      numReviews: 10,
      description: 'Best quality pant',
    },
    {
      name: 'IndianGarage pant',
      slug: 'indian-garage-pant',
      category: 'pant',
      Image: '/images/p4.jpg',
      price: 50,
      countInstock: 10,
      brand: 'IndianGarage',
      rating: 3,
      numReviews: 10,
      description: 'Best quality pant',
    },
  ],
};
export default data;
