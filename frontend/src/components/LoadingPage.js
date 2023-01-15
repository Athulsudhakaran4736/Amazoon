import Spinner from 'react-bootstrap/Spinner';
export default function LoadingPage() {
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hiddden"></span>
    </Spinner>
  );
}
