import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Rating from './Rating';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';
function Product(props) {
  const { state, dispatch: ctxdispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const { product } = props;
  const addToCartHandler = async (product) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    console.log(data, 'data');
    console.log(product, 'product');
    if (data.countInstock < quantity) {
      return alert('Out of stock');
    }
    ctxdispatch({
      type: 'CART_ADD_ITEMS',
      payload: { ...product, quantity },
    });
  };
  console.log(product, 'product');
  return (
    <Card key={product.slug}>
      <Link to={`/products/${product.slug}`}>
        <img src={product.Image} className="card-img-top" alt="products" />
      </Link>
      <Card.Body>
        <Link className="slug" to={`/products/${product.slug}`}>
          <Card.Title> {product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numRev={product.numReviews} />
        <Card.Text>${product.price}</Card.Text>
        <Button onClick={() => addToCartHandler(product)}>Add to cart</Button>
      </Card.Body>
    </Card>
  );
}
export default Product;
