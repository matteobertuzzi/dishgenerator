import React, { useContext, useState } from 'react';
import { Card, ListGroup, Row, Col, Button } from 'react-bootstrap';
import { Context } from '../store/appContext';
import UpgradeModal from './UpgradeModal';

const DishResults = () => {
  const { store, actions } = useContext(Context);
  const { recipe } = store;
  const { isLogged } = store;
  const ingredients = recipe ? recipe.recipe_ingredients : [];
  const directions = recipe ? recipe.recipe_directions : [];
  const nutritionalValues = recipe ? recipe.nutritional_values : [];
  const [showModal, setShowModal] = useState(false);

  const handleFavorites = (recipe) => {
    actions.handleFavorites(recipe);
    return
  }

  return (
    <div>{recipe ? (
      <>
        <Row>
          <Col lg={12} md={12} sm={12} className='d-flex justify-content-center mt-2'>
            <Card style={{ width: '100%', padding: '20px', backgroundColor: '#ffebc2' }}>
              <Card.Body className='d-flex justify-content-between'>
                <Card.Title as='h2' style={{ fontWeight: 'bold' }}>{recipe.recipe_name}</Card.Title>
                {isLogged ?
                  <Button variant="outline-success" className='ml-5' onClick={() => handleFavorites(recipe)}><i className="fa-regular fa-heart mr-3"></i>Add to favorite</Button>
                  :
                  <Button variant="outline-success" className='ml-5' onClick={() => setShowModal(true)}><i className="fa-regular fa-heart mr-3"></i>Add to favorite</Button>
                }
              </Card.Body>
              <Card.Body>
                <Card.Title as='h4'><strong>Ingredients</strong></Card.Title>
                <ul>
                  {ingredients.map((item) => {
                    return (
                      <li key={item.index}>{item}</li>)
                  }
                  )}
                </ul>
              </Card.Body>
              <Card.Body>
                <Card.Title as='h4'><strong>Directions</strong></Card.Title>
                <ol>
                  {directions.map((item) => {
                    return (
                      <li key={item.index}>{item}</li>)
                  }
                  )}
                </ol>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <UpgradeModal show={showModal} handleClose={() => setShowModal(false)} />
      </>
    ) : (
      <div></div>
    )}</div>
  )
}

export default DishResults;