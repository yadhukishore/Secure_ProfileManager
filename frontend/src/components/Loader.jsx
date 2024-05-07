import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <Spinner
    animation='border'
    role='status'
    variant='primary'
    style={{
      width: '100px',
      height: '100px',
      borderWidth: '10px', 
      margin: 'auto',
      display: 'block',
    }}
  ></Spinner>
  );
};

export default Loader;