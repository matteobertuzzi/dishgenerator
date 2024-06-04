import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Context } from '../store/appContext';
import LoginModal from './LoginModal';
import FavoriteModal from './FavoriteModal';

const NavigationBar = () => {
    const { store, actions } = useContext(Context);
    const { currentUser } = store;
    const { isLogged } = store;
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showFavoriteModal, setShowFavoriteModal] = useState(false);

    const handleCloseLoginModal = () => setShowLoginModal(false);
    const handleShowLoginModal = () => setShowLoginModal(true);

    const handleLogout = () => {
        actions.handleLogout();
    }


    return (
        <>
            <Navbar collapseOnSelect expand="lg" className='bg-primary' >
                <Container >
                    <Navbar.Brand href="/">Cooking Real</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to='about'>About</Nav.Link>
                        </Nav>
                        <Nav>
                            {isLogged ?
                                <>
                                    <Button as={Link} to={`/account/${currentUser.id}`}>View Profile</Button>
                                    <Button type='button' className='btn btn-primary' onClick={() => setShowFavoriteModal(true)}>Favorites</Button>
                                    <Button type='button' className='btn btn-danger' onClick={handleLogout}>Logout</Button>
                                </>
                                :
                                <>
                                    <Nav.Link as={Link} to='/signup'>Signup</Nav.Link>
                                    <Button type='button' className='btn btn-success' onClick={handleShowLoginModal}>Login</Button>
                                </>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <FavoriteModal show={showFavoriteModal} handleClose={() => setShowFavoriteModal(false)} />
            <LoginModal show={showLoginModal} handleClose={handleCloseLoginModal} />
        </>
    );
};
export default NavigationBar;
