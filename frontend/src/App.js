import './App.css';
// import data from './data';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeScreen from './Screen/HomeScreen';
import ProductScreen from './Screen/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import Badge from 'react-bootstrap/esm/Badge';
import { useContext } from 'react';
import { Store } from './Store';
import CartScreen from './Screen/CartScreen';
import SignInScreen from './Screen/SignInScreen';
import ShippingScreen from './Screen/ShippingScreen';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const signOutButton = () => {
    ctxDispatch({ type: 'USER_SIGN_OUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingaddress');
  };
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <ToastContainer position="bottom-center" limit={1}></ToastContainer>
        <header>
          <Navbar bg="dark" variant="dark">
            <Container className="mt-3">
              <LinkContainer to="/">
                <Navbar.Brand>Amazon</Navbar.Brand>
              </LinkContainer>
              <Nav className="me-auto">
                <Link to="/cart" className="nav-link">
                  Cart
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                    <LinkContainer to="/userprofile">
                      <NavDropdown.Item>User Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orderhistory">
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <Link
                      to="/signIn"
                      className="dropdown-item"
                      onClick={signOutButton}
                    >
                      Sign Out
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link to="/signIn" className="nav-link">
                    Sign In
                  </Link>
                )}
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/products/:slug" element={<ProductScreen />} />
              <Route path="/shipping" element={<ShippingScreen />} />
              <Route path="/signIn" element={<SignInScreen />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <Container className="text-center">All Rights Reserved</Container>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
