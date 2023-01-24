import { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { Store } from '../Store';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import MessagePage from '../components/MessagePage';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

export default function CartScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxdispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const onItemHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInstock < quantity) {
      window.alert('Out of stock');
      return;
    }
    ctxdispatch({
      type: 'CART_ADD_ITEMS',
      payload: { ...item, quantity },
    });
  };
  const removeHandler = async (item) => {
    ctxdispatch({
      type: 'CART_REMOVE_ITEMS',
      payload: item,
    });
  };
  const checkOutHandler = () => {
    navigate('signIn?redirect=/shipping');
  };
  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessagePage>
              Cart is empty <Link to="/">Go Shopping</Link>
            </MessagePage>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={item.Image}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                      ></img>
                      {''}
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    </Col>
                    <Col md={3}>
                      <Button
                        variant="light"
                        disabled={item.quantity === 1}
                        onClick={() => onItemHandler(item, item.quantity - 1)}
                      >
                        <i className="fa fa-minus-circle"></i>
                      </Button>
                      <span>{item.quantity}</span>
                      <Button
                        variant="light"
                        disabled={item.quantity === item.countInstock}
                        onClick={() => onItemHandler(item, item.quantity + 1)}
                      >
                        <i className="fa fa-plus-circle"></i>
                      </Button>
                    </Col>
                    <Col md={3}>{item.price}</Col>
                    <Col md={2}>
                      <Button
                        onClick={() => removeHandler(item)}
                        variant="light"
                      >
                        <i className="fa fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Subtotal({cartItems.reduce((a, c) => a + c.quantity, 0)}) :
                    {''}$
                    {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      variant="primary"
                      disabled={cartItems.length === 0}
                      onClick={checkOutHandler}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
