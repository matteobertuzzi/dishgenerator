import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { Context } from '../store/appContext';

const Category = () => {
    const { category } = useParams();
    const { store } = useContext(Context);
    const { allRecipes } = store;
    const recipes = allRecipes.filter(({ course }) => course === category);

    if (!recipes.length) {
        return (
            <Container className="mt-4 d-flex flex-column align-items-center justify-content-center">
                <h1 style={{fontSize:'100px'}}><i className="fa-regular fa-face-sad-tear"></i></h1>
                <Alert variant="warning" className="text-center">
                    No recipes available for <strong>{category}</strong>
                </Alert>
            </Container>
        );
    }

    return (
        <Container className='mt-4'>
            <h2 className='text-center text-capitalize'>{category}</h2>
            <Row className='my-3'>
                {recipes.map((recipe) => (
                    <Col key={recipe.id} xs={12} sm={6} md={4} lg={4} className='mb-4'>
                        <Card>
                            <Card.Header className='text-center' style={{ fontWeight: 'bold' }}>{recipe.recipe_name}</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    <Row className='d-flex justify-content-center'>
                                        <Col lg={4} md={4} sm={4} xs={4} className='py-2 text-center' style={{ borderRight: '1px solid black' }}>
                                            <b>Course</b><br />{recipe.course}
                                        </Col>
                                        <Col lg={4} md={4} sm={4} xs={4} className='py-2 text-center' style={{ borderRight: '1px solid black' }}>
                                            <b>Diet</b><br />{recipe.diet}
                                        </Col>
                                        <Col lg={4} md={4} sm={4} xs={4} className='py-2 text-center' >
                                            <b>Calories</b><br />{recipe.nutritional_values.calories}
                                        </Col>
                                    </Row>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Category;
