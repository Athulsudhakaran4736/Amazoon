import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import data from '../data';
import axios from 'axios';
function HomeScreen() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/products');
      setProducts(result.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>Featured products</h1>
      <div className="products">
        {products.map((product) => (
          <div className="product" key={product.slug}>
            <Link to={`/products/${product.slug}`}>
              <img src={product.Image} alt="products" />
            </Link>
            <div className="product-info">
              <Link className="slug" to={`/products/${product.slug}`}>
                <p>{product.name}</p>
                <button>Add to cart</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default HomeScreen;
