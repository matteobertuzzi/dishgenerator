import React from 'react';
import { Modal, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const RecipeModal = ({ show, handleClose, favorite }) => {
    console.log(favorite);

    if (!favorite) return null;
    
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{favorite.recipe_name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Modal.Title as='h4'><strong>Ingredients</strong></Modal.Title>
                <ul>
                  {favorite.recipe_ingredients.map((item) => {
                    return (
                      <li key={item.index}>{item}</li>)
                  }
                  )}
                </ul>
              </Modal.Body>
              <Modal.Body>
                <Modal.Title as='h4'><strong>Directions</strong></Modal.Title>
                <ol>
                  {favorite.recipe_directions.map((item) => {
                    return (
                      <li key={item.index}>{item}</li>)
                  }
                  )}
                </ol>
              </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Back
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default RecipeModal;
