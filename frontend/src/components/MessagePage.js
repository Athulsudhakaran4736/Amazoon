import Alert from 'react-bootstrap/Alert';
function MessagePage(props) {
  return <Alert variant={props.variant || 'info'}>{props.children}</Alert>;
}
export default MessagePage;
