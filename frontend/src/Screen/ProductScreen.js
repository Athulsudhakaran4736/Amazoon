import { useParams } from 'react-router-dom';
import { useContext, useReducer } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Rating from '../components/Rating';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/esm/Badge';
import Button from 'react-bootstrap/esm/Button';
import { Helmet } from 'react-helmet-async';
import LoadingPage from '../components/LoadingPage';
import MessagePage from '../components/MessagePage';
import { Store } from '../Store';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FECTH_FAIL':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
function ProductScreen() {
  let { slug } = useParams();
  const [{ product, loading, error }, dispatch] = useReducer(reducer, {
    product: [],
    error: '',
    loading: true,
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: error.message });
      }
    };
    fetchData();
  }, [slug]);
  const { state, dispatch: ctxdispatch } = useContext(Store);
  const ButtonHandler = () => {
    ctxdispatch({
      type: 'CART_ADD_ITEMS',
      payload: { ...product, quantity: 1 },
    });
  };

  return loading ? (
    <div>
      <LoadingPage />
    </div>
  ) : error ? (
    <div>
      <MessagePage variant="Danger">{error}</MessagePage>
    </div>
  ) : (
    <div>
      <Row>
        <Col lg={6}>
          <img src={product.Image} className="img-large" alt="img-large" />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Helmet>
                <title>{product.name}</title>
              </Helmet>
              <h1>{product.name}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                rating={product.rating}
                numRev={product.numReviews}
              ></Rating>
            </ListGroup.Item>
            <ListGroup.Item>Price{product.price}</ListGroup.Item>
            <ListGroup.Item>
              Description: <p>{product.description}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price</Col>
                    <Col>{product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status</Col>
                    <Col>
                      {product.countInstock > 0 ? (
                        <Badge bg="success">In Stock</Badge>
                      ) : (
                        <Badge bg="danger">Unavailable</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInstock > 0 && (
                  <ListGroup.Item>
                    <div className="" d-grid>
                      <Button onClick={ButtonHandler} variant="primary">
                        Add to cart
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ProductScreen;
