import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../../slices/usersApiSlice';
import { toast } from 'react-toastify';
import { setCredentials } from '../../slices/authSlice';
import Loader from '../../components/Loader';

const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

const [register,{isLoading}]=useRegisterMutation();
    const {userInfo} = useSelector((state)=> state.auth);
    

    useEffect(()=>{
      if(userInfo){
          navigate('/');
      }
  },[navigate,userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if(password !== confirmPass){
      toast.error('Password do not Match Bruh!')
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        if (res._id) {
          dispatch(setCredentials({ ...res }));
          navigate('/'); 
        } 
      } catch (err) {
        console.log('Error object:', err);
        if (err.data && err.data.message) {
          toast.error(err.data.message);
        } else {
          toast.error("An unknown error occurred");
        }
      }
    }
  };

  return (
    <FormContainer>
      <h1>Sign Up/Register</h1>

      <Form onSubmit={submitHandler}>

      <Form.Group className='my-2' controlId='name'>
          <Form.Label>Vame Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>


        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='confirm Password'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confrim password'
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
          ></Form.Control>
        </Form.Group>

    {isLoading && <Loader/>}

        <Button type='submit' variant='primary' className='mt-3'>
          Sign Up
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Alredy have an account? <Link to={`/login`}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;