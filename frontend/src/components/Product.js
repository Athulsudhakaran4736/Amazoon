import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Rating from './Rating';
import { Store } from '../Store';
import { useContext } from 'react';
function Product(props) {
  const { product } = props;
  const { state, dispatch: ctxdispatch } = useContext(Store);
  const ButtonClickHandler = () => {
    ctxdispatch({
      type: 'CART_ADD_ITEMS',
      payload: { ...product, quantity: 1 },
    });
  };

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
        <Card.Text>{product.price}</Card.Text>
        <Button onClick={ButtonClickHandler}>Add to cart</Button>
      </Card.Body>
    </Card>
  );
}
export default Product;
