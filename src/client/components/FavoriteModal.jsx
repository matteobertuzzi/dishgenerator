import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Modal, ListGroup } from 'react-bootstrap';
import { Context } from '../store/appContext';

export default function FavoriteModal({ show, handleClose }) {
    const { store, actions } = useContext(Context);
    const { favoriteRecipes } = store;
    const navigate = useNavigate();

    const handleDelete = (recipeId)=>{
        actions.removeFavorite(recipeId);
        console.log(recipeId)
    }

    const showDetails = (id) =>{
        navigate(`favorite/${id}`);
        handleClose();
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Favorite Recipes
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ListGroup>
                    {favoriteRecipes.length !== 0 ?
                        favoriteRecipes.map((favRecipe) => {
                            return (
                                <ListGroup.Item className='d-flex justify-content-between px-4' key={favRecipe.id}>
                                  {favRecipe.recipe_name}
                                  <div>
                                    <i className="fa-regular fa-eye mx-3" onClick={() => showDetails(favRecipe.id)}></i>
                                    <i className="fa-solid fa-trash" onClick={() => handleDelete(favRecipe.id)}></i>
                                  </div>
                                </ListGroup.Item>
                              );
                        })
                        :
                              <p>You haven't saved any recipe yet!</p>
                    }
                </ListGroup>
                <p><Link to={'/favorites'} onClick={handleClose}>See favorite recipes</Link></p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
