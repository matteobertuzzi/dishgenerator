import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../store/appContext';
import { Row, Col, Button, Form, Badge } from 'react-bootstrap';
import UpgradeModal from './UpgradeModal';

const DishInputs = ({isPremium}) => {
    const { store, actions } = useContext(Context);
    const [inputs, setInputs] = useState({
        dishIngredients: [],
        meal: '',
        diet: '',
        prepTime: '',
    });
    const [availableCredits, setAvailableCredits] = useState(isPremium ? store.premiumCredits : store.freeCredits);
    const [ingredients, setIngredients] = useState('');
    const [disableInput, setDisableInput] = useState(false);
    const [upgradeModal, setUpgradeModal] = useState(false);

    const changeInput = (event) => {
        event.persist();
        const { name, value } = event.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    };

    const handleIngredients = (event) => {
        const ingredient = event.target.value;
        setIngredients(ingredient);
    };

    // Add a function to check if input is blank (not allowed)
    const handleAddIngredient = (event) => {
        event.preventDefault();
        if (!disableInput) {
            if (inputs.dishIngredients.length < 3) {
                const existingIngredients = inputs.dishIngredients.filter((item) => item === ingredients );
                if (existingIngredients.length === 0) {
                    setInputs({
                        ...inputs,
                        dishIngredients: [...inputs.dishIngredients, ingredients]
                    });
                    setIngredients('');
                    if (inputs.dishIngredients.length === 2) {
                        setDisableInput(true);
                    };
                } else{
                    alert('Ingredient already added! Please add a different food.');
                    console.error('Ingredient already added.');
                    setIngredients('');
                }
            };
        }
    };

    const deleteIngredient = (ingredient) => {
        const currentIngredients = inputs.dishIngredients;
        const newIngredients = currentIngredients.filter(item => item !== ingredient);
        setInputs({
            ...inputs,
            dishIngredients: newIngredients
        });
        console.log(newIngredients);
        setDisableInput(false);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!checkFilledInputs()) {
            alert("Please fill out all input fields.");
            return;
        };
        actions.handleRecipe(inputs);
        actions.handleCredits();
        setAvailableCredits(prevCredits => prevCredits - 1);
        setInputs({
            dishIngredients: [],
            meal: '',
            diet: '',
            prepTime: '',
        });
        if (disableInput && availableCredits !== 0) {
            setDisableInput(false);
        }
    };

    const checkFilledInputs = () => {
        return (
            inputs.dishIngredients.length !== 0 &&
            inputs.meal !== '' &&
            inputs.diet !== '' &&
            inputs.prepTime !== ''
        );
    };

    useEffect(() => {
        if (availableCredits === 0) {
            setUpgradeModal(true);
        }
    }, [availableCredits]);

    return (
        <>
            <h2 className='text-center my-3'>Search for a recipe!</h2>
            <Row className='d-flex justify-content-end'>
                <Badge pill bg="info" className='d-flex flex-col justify-content-center align-items-center' style={{ width: '130px', height: '40px', fontWeight: 'bold' }}>
                    {availableCredits} / {isPremium ? '10': '3'} Credits
                </Badge>
            </Row>
            {availableCredits === 0 && <h4 className='text-warning'>{isPremium ? '10/10' : '3/3'} credits used. Upgrade for more searches.</h4>}
            <Row style={{ padding: '0 20px 0 20px' }}>
                <Col lg={12} md={12} sm={12}>
                    <Form.Group>
                        <Form.Label htmlFor="calories">Type up to 3 ingredients to include:</Form.Label>
                        <Form.Control
                            type="text"
                            id="desiredIngredients"
                            value={ingredients}
                            onChange={(e) => handleIngredients(e)}
                            name='desiredIngredients'
                            required
                            disabled={disableInput || availableCredits === 0}
                            placeholder={disableInput ? 'You can select only up to 3 ingredients!' : 'Add up to 3 ingredients'}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row className='d-flex justify-content-center mt-2' style={{ padding: '10px' }}>
                <Button variant="primary" type="button" onClick={availableCredits !== 0 ? handleAddIngredient : () => setUpgradeModal(true)} style={{ width: '30%' }}>
                    Add Ingredient
                </Button>
            </Row>
            <Row style={{ padding: '0 20px 0 20px' }}>
                <Col lg={12} className='d-flex justify-content-center'>
                    {inputs.dishIngredients.map((ingredient) => (
                        <div key={ingredient} className='my-2 mx-2' style={{ backgroundColor: '#f9dcc4', borderRadius: '5px', padding: '8px', fontWeight: 'bold' }}>{ingredient}<span><i className="fa-sharp fa-solid fa-trash mx-4" onClick={() => deleteIngredient(ingredient)}></i></span></div>
                    ))}
                </Col>
            </Row>
            <Row className='d-flex flex-col justify-content-center align-items-end mt-2' style={{ padding: '0 20px 0 20px' }}>
                <Col lg={4} md={6} sm={12}>
                    <Form.Group controlId="prepTime">
                        <Form.Label>Preparation time</Form.Label>
                        <Form.Select
                            value={inputs.prepTime}
                            name='prepTime'
                            onChange={changeInput}
                            required
                            disabled={availableCredits === 0}>
                            <option value='' disabled>Select prep time</option>
                            <option value={'5 minutes'}>5 minutes</option>
                            <option value={'10 minutes'}>10 minutes</option>
                            <option value={'15 minutes'}>15 minutes</option>
                            <option value={'20 minutes'}>20 minutes</option>
                            <option value={'25 minutes'}>25 minutes</option>
                            <option value={'30 minutes'}>30 minutes</option>
                            <option value={'35 minutes'}>35 minutes</option>
                            <option value={'40 minutes'}>40 minutes</option>
                            <option value={'45 minutes'}>45 minutes</option>
                            <option value={'50 minutes'}>50 minutes</option>
                            <option value={'55 minutes'}>55 minutes</option>
                            <option value={'60 minutes'}>1 hour</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col lg={4} md={6} sm={12}>
                    <Form.Group controlId="meal">
                        <Form.Label>Course</Form.Label>
                        <Form.Select
                            value={inputs.meal}
                            name='meal'
                            onChange={changeInput}
                            required
                            disabled={availableCredits === 0}>
                            <option value='' disabled>Select meal</option>
                            <option value='Breakfast'>Breakfast</option>
                            <option value='Lunch'>Lunch</option>
                            <option value='Dinner'>Dinner</option>
                            <option value='Side Dish'>Side Dish</option>
                            <option value='Snack'>Snack</option>
                            <option value='Dessert'>Dessert</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col lg={4} md={12} sm={12}>
                    <Form.Group>
                        <Form.Label>Diet</Form.Label>
                        <Form.Select
                            placeholder='select diet'
                            onChange={changeInput}
                            name='diet'
                            value={inputs.diet}
                            required
                            disabled={availableCredits === 0}>
                            <option value='' disabled>Select diet</option>
                            <option value='Vegetarian'>Vegetarian</option>
                            <option value='Vegan'>Vegan</option>
                            <option value='Gluten-Free'>Gluten-free</option>
                            <option value='Paleo'>Paleo</option>
                            <option value='LowCarb'>Low Carb</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
            <Row className='d-flex justify-content-center mt-2' style={{ padding: '10px' }}>
                <Button
                    variant={availableCredits === 0 || !checkFilledInputs() ? "danger" : "success"}
                    type="submit"
                    onClick={availableCredits !== 0 ? handleSubmit : () => setUpgradeModal(true)}
                    style={{ width: '30%' }}
                    disabled={availableCredits === 0 || !checkFilledInputs()}>
                    Submit
                </Button>
            </Row>
            <UpgradeModal show={upgradeModal} handleClose={() => setUpgradeModal(false)} />
        </>
    )
}

export default DishInputs;
