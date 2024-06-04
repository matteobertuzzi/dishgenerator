import React, {useContext} from 'react';
import { Container, Row, Col, Card, Image, Button } from 'react-bootstrap';
import { Context } from "../store/appContext";

const Account = () => {
    const {store, actions} = useContext(Context);
    const {currentUser} = store

    let profilePictureMan = 'https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg';

  return (
    <Container className="min-vh-100 mb-3 mt-4 flex-column">
            <Row className="d-flex justify-content-center mt-6">
                <Col xs={12} md={8}>
                    <Card className="shadow p-3 w-auto">
                        <Card.Body>
                            <Row>
                                <Col xs={12} sm={6} className="mb-3 mb-sm-0 d-flex flex-column gap-3 justify-content-center align-items-center">
                                    <Image
                                        src={profilePictureMan}
                                        roundedCircle
                                        fluid
                                        style={{ maxHeight: '250px' }}
                                    />
                                    <div className="d-flex flex-row gap-5 align-items-center mt-3">
                                        <i className="fab fa-facebook-f fa-lg"></i>
                                        <i className="fab fa-twitter fa-lg"></i>
                                        <i className="fab fa-instagram fa-lg"></i>
                                    </div>
                                </Col>
                                <Col xs={12} sm={6}>
                                    <h2 className="mb-4">{currentUser.name} {currentUser.last_name}</h2>
                                    <p><strong>E-mail adress:</strong> {currentUser.email}</p>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className='d-flex flex-row justify-content-center align-items-center gap-3'>
                {/*delete user modal */}
            </Row>
        </Container>
  )
}

export default Account;