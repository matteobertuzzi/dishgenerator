import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-light text-dark py-4">
      <Container>
        <Row>
          <Col xs={12} md={4} className="text-center text-md-start mb-3 mb-md-0">
            <h5>About Our App</h5>
            <p>
              Our web application allows you to create a recipe based on your choice of ingredients (up to 3 selections), preparation time, diet preferences, and course for the recipe. Get personalized recipes perfect for when you have no idea what to eat.
            </p>
          </Col>
          <Col xs={12} md={4} className="text-center text-md-start mb-3 mb-md-0">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-dark">Home</a></li>
              <li><a href="/signup" className="text-dark">Sign Up</a></li>
              <li><a href="/login" className="text-dark">Login</a></li>
              <li><a href="/about" className="text-dark">About Us</a></li>
            </ul>
          </Col>
          <Col xs={12} md={4} className="text-center text-md-start">
            <h5>Contact Us</h5>
            <p>
              <strong>Email:</strong> info@recipemaster.com <br />
              <strong>Phone:</strong> +123 456 7890
            </p>
            <ul className="list-inline">
              <li className="list-inline-item"><a href="#" className="text-dark"><i className="fab fa-facebook-f"></i></a></li>
              <li className="list-inline-item"><a href="#" className="text-dark"><i className="fab fa-twitter"></i></a></li>
              <li className="list-inline-item"><a href="#" className="text-dark"><i className="fab fa-instagram"></i></a></li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
