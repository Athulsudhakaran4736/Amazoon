import './App.css';
import data from './data';
function App() {
  return (
    <div>
      <header>
        <a href="/">Amazon</a>
      </header>
      <main>
        <h1>Featured products</h1>
        <div className="products">
          {data.products.map((product) => (
            <div className="product" key={product.slug}>
              <a href={`/products/${product.slug}`}>
                <img src={product.Image} alt="products" />
              </a>
              <div className="product-info">
                <a className="slug" href={`/products/${product.slug}`}>
                  <p>{product.name}</p>
                  <button>Add to cart</button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
