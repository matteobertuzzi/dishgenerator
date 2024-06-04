import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAppleAlt, faClock, faLeaf, faUtensils } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const About = () => {
    return (
        <Container className="mt-5">
            <Row className="mb-4">
                <Col className="text-center">
                    <h1>Welcome to Recipe Finder</h1>
                    <p className="lead">
                        Discover the perfect recipe for any occasion with our intuitive recipe generator.
                        Simply select your ingredients, set your preferences, and let us do the rest. Perfect for when
                        you have no idea what to eat!
                    </p>
                </Col>
            </Row>
            <Row className="mb-5">
                <Col md={6} className="mb-4">
                    <Card className="h-100 shadow-sm">
                        <Card.Body>
                            <Card.Title className="text-primary">
                                <FontAwesomeIcon icon={faAppleAlt} className="me-2" />
                                Select Your Ingredients
                            </Card.Title>
                            <Card.Text>
                                <p>
                                    Have a few ingredients but not sure what to make? No problem! 
                                    With Recipe Finder, you can choose up to 3 ingredients you have on hand, 
                                    and we will suggest delicious recipes that use those ingredients. 
                                    Say goodbye to food waste and hello to creative cooking!
                                </p>
                                <p>
                                    Whether you have some chicken, tomatoes, and cheese, or just a few veggies 
                                    lying around, our app will help you turn them into a mouth-watering meal.
                                </p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} className="mb-4">
                    <Card className="h-100 shadow-sm">
                        <Card.Body>
                            <Card.Title className="text-primary">
                                <FontAwesomeIcon icon={faClock} className="me-2" />
                                Set Preparation Time
                            </Card.Title>
                            <Card.Text>
                                <p>
                                    Time is of the essence, and we understand that. Whether you’re in a rush or 
                                    have time to spare, simply specify the maximum preparation time you have available.
                                    We will filter the recipes that can be made within your specified time, ensuring 
                                    you never run out of time to enjoy a great meal.
                                </p>
                                <p>
                                    From quick 15-minute dinners to more elaborate meals for special occasions, 
                                    Recipe Finder has you covered.
                                </p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mb-5">
                <Col md={6} className="mb-4">
                    <Card className="h-100 shadow-sm">
                        <Card.Body>
                            <Card.Title className="text-primary">
                                <FontAwesomeIcon icon={faLeaf} className="me-2" />
                                Diet Preferences
                            </Card.Title>
                            <Card.Text>
                                <p>
                                    Eating healthy and sticking to your dietary preferences has never been easier. 
                                    Whether you’re vegetarian, vegan, gluten-free, or have other dietary restrictions, 
                                    Recipe Finder allows you to filter recipes based on your diet preferences.
                                </p>
                                <p>
                                    Enjoy peace of mind knowing that all the recipes you see will be tailored to 
                                    meet your dietary needs, making it easier to stay healthy and satisfied.
                                </p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} className="mb-4">
                    <Card className="h-100 shadow-sm">
                        <Card.Body>
                            <Card.Title className="text-primary">
                                <FontAwesomeIcon icon={faUtensils} className="me-2" />
                                Choose the Course
                            </Card.Title>
                            <Card.Text>
                                <p>
                                    Are you looking for a hearty main course, a light starter, or a sweet dessert? 
                                    Recipe Finder lets you choose the type of course you’re in the mood for.
                                    Whether you need an appetizer for a party, a main dish for dinner, or a dessert 
                                    to satisfy your sweet tooth, our app has a wide range of options to suit every occasion.
                                </p>
                                <p>
                                    Explore new culinary horizons and impress your family and friends with a diverse 
                                    selection of recipes that cater to all tastes and occasions.
                                </p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="text-center">
                <Col>
                    <Button as={Link} to='/' variant="primary" size="lg" className="shadow-sm">
                        Get Your Recipe
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default About;
