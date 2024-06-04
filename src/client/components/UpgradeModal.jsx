import React from 'react';
import { Modal, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UpgradeModal = ({ show, handleClose }) => {

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Upgrade your Plan</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Upgrade your plan to save recipes as favorites, search recipes based on nutritional values, and request more recipes.</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Back
                </Button>
                <Link to='/signup'>
                    <Button variant="primary">
                        Upgrade Plan
                    </Button>
                </Link>
            </Modal.Footer>
        </Modal>
    );
};

export default UpgradeModal;
