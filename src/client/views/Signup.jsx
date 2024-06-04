import React, { useState, useContext } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup } from 'react-bootstrap';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';
import LoginModal from '../components/LoginModal';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../components/CheckoutForm';

const stripePromise = loadStripe('pk_test_51PIC5GAlW3Fri7ltq7mjlSNRBPqZX7J5MLFbJ9EKKBWsKffoIoSmeAizEMTVljl2xj3pwxoWdoBMUjih3r5hlWKh00sBomfd2R');

const Signup = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [inputs, setInputs] = useState({
    name: '',
    last_name: '',
    email: '',
    password: ''
  });

  const options = {
    // passing the client secret obtained from the server
    clientSecret: "pi_3MtwBwLkdIwHu7ix28a3tqPa_secret_YrKJUKribcBjcG8HVhfZluoGH"
  };

  const handleInputs = (event) => {
    const { name, value } = event.target;
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    actions.handleSignup(inputs);
    console.log('Form submitted:', inputs);
    navigate('/'); // Navigate to home or another page after signup
  };

  return (
    <Elements stripe={stripePromise} >
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="shadow-lg border-0">
              <Card.Header className="bg-primary text-white text-center py-4">
                <h3>Sign Up</h3>
              </Card.Header>
              <Card.Body className="p-4">
                <Form onSubmit={handleSubmit}>
                  <InputGroup className="mb-4">
                    <InputGroup.Text className="bg-primary text-white">Name</InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="First name"
                      name='name'
                      value={inputs.name}
                      onChange={handleInputs}
                    />
                    <Form.Control
                      type="text"
                      placeholder="Last name"
                      name='last_name'
                      value={inputs.last_name}
                      onChange={handleInputs}
                    />
                  </InputGroup>
                  <Form.Group className="mb-4" controlId="emailAddress">
                    <Form.Label>Email Address</Form.Label>
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
                    Sign Up
                  </Button>
                </Form>
              </Card.Body>
              <Card.Footer className="text-center">
                <p className="mb-0">
                  Already have an account? <span onClick={() => setShowLogin(true)} className="text-primary">Log in</span>
                </p>
              </Card.Footer>
            </Card>
            <CheckoutForm />
          </Col>
        </Row>
        <LoginModal show={showLogin} handleClose={() => setShowLogin(false)} />
      </Container>
    </Elements>
  );
};

export default Signup;
