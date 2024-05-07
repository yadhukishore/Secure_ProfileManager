import { useEffect, useState } from 'react';
import { Form, Button, } from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setCredentials } from '../../slices/authSlice';
import Loader from '../../components/Loader';
import { useUpdateUserMutation } from '../../slices/usersApiSlice';

const ProfileScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

   
    const dispatch = useDispatch();

    const {userInfo} = useSelector((state)=> state.auth);
    const [updateProfile,{isLoading}] = useUpdateUserMutation();

    useEffect(()=>{
   setName(userInfo.name);
   setEmail(userInfo.email);
  },[userInfo.setName,userInfo.setEmail]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if(password !== confirmPass){
      toast.error('Password do not Match Bruh!')
    } else {
        try {
            const res = await updateProfile({
                _id: userInfo._id,
                name,
                email,
                password
            }).unwrap();
            dispatch(setCredentials({...res}));
            toast.success('Profile Updated')
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
      <h1>Update Profile</h1>

      <Form onSubmit={submitHandler}>

      <Form.Group className='my-2' controlId='name'>
          <Form.Label>Name</Form.Label>
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
          Update
        </Button>
      </Form>


    </FormContainer>
  );
};

export default ProfileScreen;