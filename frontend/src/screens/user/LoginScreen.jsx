import { Link } from 'react-router-dom';
import FormContainer from '../../components/FormContainer';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';


const LoginScreen = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] =useState('');
    const submitHandler = (e)=>{
        e.preventDefault();
        console.log('Submitt!!!');
    }
  return (
    <FormContainer>
        <h1>Sign In</h1>
        <Form onSubmit={submitHandler} >
            <Form.Group className='my-2' controlId='email'>
            <Form.Label>Email Address</Form.Label>
                <Form.Control
                type = 'email'
                placeholder='Enter Email'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                >

                </Form.Control>
            </Form.Group>
            <Form.Group className='my-2' controlId='email'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                type = 'password'
                placeholder='Enter Password'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                >

                </Form.Control>
            </Form.Group>
            <Button type='submit'varient='primary' className='mt-3' >
                Sign IN
            </Button>
            <Row className='py-3'>
                <Col>
                    new customer? <Link to='/register'>Register</Link>
                </Col>
            </Row>
        </Form>
    </FormContainer>
  )
}

export default LoginScreen