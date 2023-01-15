import { useEffect, useReducer } from 'react';
import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import Product from '../components/Product';
import LoadingPage from '../components/LoadingPage';
import MessagePage from '../components/MessagePage';
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FECTH_FAIL':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
function HomeScreen() {
  const [{ products, loading, error }, dispatch] = useReducer(logger(reducer), {
    products: [],
    error: '',
    loading: true,
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: error.message });
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>Featured products</h1>
      <div className="products">
        {loading ? (
          <div>
            <LoadingPage />
          </div>
        ) : error ? (
          <div>
            <MessagePage variant="danger">{error}</MessagePage>
          </div>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                <Product product={product} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}
export default HomeScreen;
