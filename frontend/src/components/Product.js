import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Rating from './Rating';
function Product(props) {
  const { product } = props;
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
        <Button>Add to cart</Button>
      </Card.Body>
    </Card>
  );
}
export default Product;
