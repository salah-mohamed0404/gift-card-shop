import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, TextField } from '@mui/material';
import 'tailwindcss/tailwind.css';

const Checkout = () => {
	// Stripe logic here
	return (
		<form className="p-4">
			<TextField label="Amount" variant="outlined" className="mb-4" />
			<CardElement />
			<Button variant="contained" color="primary" className="mt-4">
				Pay
			</Button>
		</form>
	);
};

export default Checkout;
