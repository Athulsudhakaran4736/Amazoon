import { useParams } from 'react-router-dom';

function ProductScreen() {
  let { slug } = useParams();
  return <div>{slug}</div>;
}
export default ProductScreen;
