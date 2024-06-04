import React, { useContext } from 'react';
import { Context } from '../store/appContext';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Img } from 'react-bootstrap';
import Loading from '../components/Loading';

const FavoriteRecipe = () => {
    const { id } = useParams();
    const { store, actions } = useContext(Context);
    const { favoriteRecipes } = store;
    const favorite = favoriteRecipes.find(({ id }) => id === id);
    console.log(favorite);

    return (
        <Container className='mt-4'>
            {favorite ?
                < Row className='d-flex justify-content-center' >
                    <Col lg={8} md={8} sm={10} xs={10} className='d-flex justify-content-center'>
                        <Card>
                            <Card.Header as={'h3'} className='d-flex justify-content-center p-3' style={{ fontWeight: 'bold' }}><span><i className="fa-solid fa-seedling mx-3"></i></span>{favorite.recipe_name}</Card.Header>
                            <Row className='d-flex justify-content-center'>
                                <Col lg={4} md={4} sm={12} xs={12}>
                                    <Card.Body>
                                        <Card.Title as='h4'><strong>Ingredients</strong></Card.Title>
                                        <ul>
                                            {favorite.recipe_ingredients.map((item) => {
                                                return (
                                                    <li key={item.index}>{item}</li>)
                                            }
                                            )}
                                        </ul>
                                    </Card.Body>
                                </Col>
                                <Col lg={8} md={8} sm={12} xs={12}>
                                    <Card.Body>
                                        <Card.Title as='h4'><strong>Directions</strong></Card.Title>
                                        <ol>
                                            {favorite.recipe_directions.map((item) => {
                                                return (
                                                    <li key={item.index}>{item}</li>)
                                            }
                                            )}
                                        </ol>
                                    </Card.Body>
                                </Col>
                                <Row className='d-flex justify-content-center'>
                                    <Col lg={4} md={4} sm={4} xs={4} className='py-2 text-center' style={{ borderRight: '1px solid black', borderTop: '1px solid black' }}>
                                        <b>Course</b><br />{favorite.course}
                                    </Col>
                                    <Col lg={4} md={4} sm={4} xs={4} className='py-2 text-center' style={{ borderRight: '1px solid black', borderTop: '1px solid black' }}>
                                        <b>Diet</b><br />{favorite.diet}
                                    </Col>
                                    <Col lg={4} md={4} sm={4} xs={4} className='py-2 text-center' style={{ borderTop: '1px solid black' }}>
                                        <b>Calories</b><br />{favorite.nutritional_values.calories}
                                    </Col>
                                </Row>
                            </Row>
                        </Card>
                    </Col>
                </Row >
                :
                <Loading />
            }
        </Container >
    )
}

export default FavoriteRecipe