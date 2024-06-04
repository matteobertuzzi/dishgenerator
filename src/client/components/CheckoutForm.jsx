import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';
import { Button, Card, Form } from 'react-bootstrap';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            color: '#32325d',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
                color: '#aab7c4',
            },
        },
        invalid: {
            color: '#fa755a',
            iconColor: '#fa755a',
        },
    },
};

function CheckoutForm() {
    const {store, actions} = useContext(Context);
    const [email, setEmail] = useState('');
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmitPay = async (event) => {
        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        try {
            const res = await fetch('http://127.0.0.1:5000/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();
            const clientSecret = data.client_secret;
            console.log(clientSecret);

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        email,
                    },
                },
            });

            if (result.error) {
                // Show error to your customer (e.g., insufficient funds)
                console.log(result.error.message);
            } else {
                // The payment has been processed!
                if (result.paymentIntent.status === 'succeeded') {
                    // Show a success message to your customer
                    // There's a risk of the customer closing the window before callback
                    // execution. Set up a webhook or plugin to listen for the
                    // payment_intent.succeeded event that handles any business critical
                    // post-payment actions.
                    console.log('You got 500$!');
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Card style={{ maxWidth: '500px', margin: '35vh auto' }}>
            <Card.Body>
                <Form>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Email you'll receive updates and receipts on"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <CardElement options={CARD_ELEMENT_OPTIONS} />
                    </Form.Group>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button variant="primary" onClick={handleSubmitPay}>
                            Pay
                        </Button>
                        <Button variant="primary">
                            Subscription
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default CheckoutForm;
