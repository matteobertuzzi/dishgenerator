import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { Context } from '../store/appContext';

const LoginModal = ({ show, handleClose }) => {
  const { store, actions } = useContext(Context);
  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  });

  const handleInputs = (event) => {
    const { name, value } = event.target;
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await actions.handleLogin(inputs);
    console.log('Form submitted:', inputs);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4" controlId="emailAddress">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
              type="email" 
              placeholder="Enter email" 
              name='email' 
              value={inputs.email} 
              onChange={handleInputs} 
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-4" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Enter password" 
              name='password' 
              value={inputs.password} 
              onChange={handleInputs} 
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100 py-2">
            Login
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <p className="mb-0">
          Don't have an account? <span as={Link} to='/signup' className="text-primary">Sign up</span>
        </p>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginModal;
