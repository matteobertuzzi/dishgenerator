import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, CardText, Image, Alert } from 'react-bootstrap';
import { Context } from '../store/appContext';
import RecipeModal from '../components/RecipeModal';
import breakfast from '../assets/images/breakfast.jpg';
import lunch from '../assets/images/lunch.jpg';
import dinner from '../assets/images/dinner.jpg';
import side from '../assets/images/side.jpg';
import snack from '../assets/images/snack.jpg';
import dessert from '../assets/images/dessert.jpg';

const Favorites = () => {
    const [showModal, setShowModal] = useState(false);
    const [currentFavorite, setCurrentFavorite] = useState();
    const { store, actions } = useContext(Context);
    const { favoriteRecipes } = store;
    const navigate = useNavigate();

    const handleDelete = (recipeId) => {
        actions.removeFavorite(recipeId);

    }
    if (!favoriteRecipes.length) {
        return (
            <Container className="mt-4 d-flex flex-column align-items-center justify-content-center">
                <h1 style={{fontSize:'100px'}}><i className="fa-regular fa-face-sad-tear"></i></h1>
                <Alert variant="warning" className="text-center">
                    No recipe saved as favorite. <span onClick={()=>navigate('/')} className="text-primary">Create your new recipe now!</span>
                </Alert>
            </Container>
        );
    }

    return (
        <>
            <Container>
                <Row className='d-flex justify-content-center mt-4'>
                    <Col lg={12} md={12} sm={12} xs={12}>
                        {favoriteRecipes.map((favorite) => {

                            return (
                                <Card key={favorite.id} className='my-3'>
                                    <Card.Header>Favorite</Card.Header>
                                    <Card.Body>
                                        <Card.Title>{favorite.recipe_name}</Card.Title>
                                        <Card.Text>
                                            <Row className='d-flex justify-content-center align-items-center my-3'>
                                                <Col lg={4} md={4} sm={4} xs={4} className='d-flex justify-content-center'><Image src={favorite.course === 'Breakfast' ? breakfast :
                                                                                                                                        favorite.course === 'Lunch' ? lunch :
                                                                                                                                        favorite.course === 'Dinner' ? dinner :
                                                                                                                                        favorite.course === 'Side Dish' ? side :
                                                                                                                                        favorite.course === 'Snack' ? snack :
                                                                                                                                        favorite.course === 'Dessert' ? dessert :
                                                                                                                                        dinner } fluid roundedCircle style={{maxWidth:'150px'}}></Image></Col>
                                                <Col lg={2} md={2} sm={2} xs={2}><b>Time</b><br />{favorite.preparation_time}</Col>
                                                <Col lg={2} md={2} sm={6} xs={6} style={{ borderLeft: '2px solid black' }}><b>Course</b><br />{favorite.course}</Col>
                                                <Col lg={2} md={2} sm={6} xs={6} style={{ borderLeft: '2px solid black' }}><b>Diet</b><br />{favorite.diet}</Col>
                                                <Col lg={2} md={2} sm={6} xs={6} style={{ borderLeft: '2px solid black' }}><b>Calories</b><br />{favorite.nutritional_values.calories}</Col>
                                            </Row>
                                        </Card.Text>
                                        <CardText className='d-flex justify-content-center'>
                                            <Button variant="primary" className='mx-2' onClick={() => {
                                                setCurrentFavorite(favorite);
                                                setShowModal(true);
                                            }}>See Recipe</Button>
                                            <Button variant="danger" className='mx-2' onClick={() => { handleDelete(favorite.id) }}>Remove favorite</Button>
                                        </CardText>
                                    </Card.Body>
                                </Card>
                            )
                        }
                        )}
                    </Col>
                </Row>
                <RecipeModal show={showModal} handleClose={() => setShowModal(false)} favorite={currentFavorite} />
            </Container>
        </>
    )
}

export default Favorites