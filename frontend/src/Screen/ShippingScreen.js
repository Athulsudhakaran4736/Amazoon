import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Store } from '../Store';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';

function ShippingScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxdispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;
  //   const [savedData, setSaveData] = useState(
  //     JSON.parse(localStorage.getItem('shippingaddress'))
  //   );
  const [name, setName] = useState(shippingAddress?.name || '');
  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [postal, setPostal] = useState(shippingAddress?.postal || '');
  const [country, setCountry] = useState(shippingAddress?.country || '');

  useEffect(() => {
    if (!userInfo) {
      navigate('/signIn?redirect=/shipping');
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    ctxdispatch({
      type: 'SHIPPING_ADDRESS',
      payload: {
        name,
        address,
        city,
        postal,
        country,
      },
    });

    localStorage.setItem(
      'shippingaddress',
      JSON.stringify({
        name,
        address,
        city,
        postal,
        country,
      })
    );
    navigate('/payment');
  };

  return (
    <div>
      <Helmet>
        <title>Shipping Screen</title>
      </Helmet>
      <CheckoutSteps step1 step2 />
      <h1 className="my-3">Shipping Address</h1>
      <div className="container small-container">
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              value={name}
              required
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></Form.Control>
            <Form.Label>Address</Form.Label>
            <Form.Control
              required
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            ></Form.Control>
            <Form.Label>City</Form.Label>
            <Form.Control
              required
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            ></Form.Control>
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              required
              value={postal}
              onChange={(e) => {
                setPostal(e.target.value);
              }}
            ></Form.Control>
            <Form.Label>Country</Form.Label>
            <Form.Control
              required
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
              }}
            ></Form.Control>
            <div className="my-3">
              <Button variant="primary" type="submit">
                Continue
              </Button>
            </div>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}
export default ShippingScreen;
