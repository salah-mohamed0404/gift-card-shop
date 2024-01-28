import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import 'tailwindcss/tailwind.css';

const Checkout = () => {
	const [customerName, setCustomerName] = useState('');
	const [name, setName] = useState('');

	const [mobileCountryCode, setMobileCountryCode] = useState('+965');
	const [customerMobile, setCustomerMobile] = useState('');
	const [customerEmail, setCustomerEmail] = useState('');
	const [invoiceValue, setInvoiceValue] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [amount, setAmount] = useState(null);
	const [cardNumber, setCardNumber] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [sendOption, setSendOption] = useState('instant');
	const [expiryDate, setExpiryDate] = useState('');
	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);
		setError(null);
		const paymentData = {
			PaymentMethodId: '2', // The ID of the payment method chosen by the customer
			CustomerName: customerName,
			DisplayCurrencyIso: 'KWD', // The currency in ISO format
			MobileCountryCode: mobileCountryCode,
			CustomerMobile: customerMobile, // Customer's mobile number
			CustomerEmail: customerEmail,
			InvoiceValue: parseFloat(invoiceValue), // Total value of the invoice
			CallBackUrl: 'https://google.com', // URL to redirect to after payment completion
			ErrorUrl: 'https://google.com', // URL to redirect to after a payment error
			Language: 'en', // Language of the payment page
			CustomerReference: 'ref 1', // A reference ID for the customer
			CustomerAddress: { // Customer's address
				Block: '',
				Street: '',
				HouseBuildingNo: '',
				Address: '',
				AddressInstructions: ''
			},
			InvoiceItems: [ // List of items included in the payment
				{ ItemName: 'Product 01', Quantity: 1, UnitPrice: 100 }
			]
		};
		

		try {
			const response = await axios.post('http://localhost:3001/process-payment', paymentData);
			console.log(response.data);
			// Handle successful response
		} catch (apiError) {
			console.error('Error:', apiError);
			setError('Payment processing failed.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<><form className="p-4 my-[200px] flex flex-col gap-y-[32px]" onSubmit={handleSubmit}>
			{/* ... TextField components for each required field ... */}
			<TextField
				label="Customer Name"
				value={customerName}
				onChange={(e) => setCustomerName(e.target.value)} />
			<TextField
				label="Mobile Country Code"
				value={mobileCountryCode}
				onChange={(e) => setMobileCountryCode(e.target.value)} />
			<TextField
				label="Customer Mobile"
				value={customerMobile}
				onChange={(e) => setCustomerMobile(e.target.value)} />
			<TextField
				label="Customer Email"
				value={customerEmail}
				onChange={(e) => setCustomerEmail(e.target.value)} />
			<TextField
				label="Invoice Value"
				value={invoiceValue}
				onChange={(e) => setInvoiceValue(e.target.value)}
				type="number" />
			<TextField
				label="Name"
				variant="outlined"
				className="mb-4 w-full"
				value={name}
				onChange={(e) => setName(e.target.value)} />
			<TextField
				label="Amount"
				variant="outlined"
				className="mb-4 w-full"
				value={amount}
				onChange={(e) => setAmount(e.target.value)}
				type="number" />
			<TextField
				label="Card Number"
				variant="outlined"
				className="mb-4 w-full"
				value={cardNumber}
				onChange={(e) => setCardNumber(e.target.value)} />
			<TextField
				label="Expiry Date (MM/YY)"
				variant="outlined"
				className="mb-4 w-full"
				value={expiryDate}
				onChange={(e) => setExpiryDate(e.target.value)} />
			{/* <TextField
				label="CVV"
				variant="outlined"
				className="mb-4 w-full"
				value={cvv}
				onChange={(e) => setCvv(e.target.value)}
				type="password" /> */}
			<Button
				variant="contained"
				color="primary"
				className="mt-4 w-full"
				disabled={loading}
				type="submit"
			>
				{loading ? <CircularProgress size={24} /> : 'Pay'}
			</Button>
			{error && <div className="text-red-500 mt-2">{error}</div>}
		<Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
				<DialogTitle>Payment Successful</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Choose how to send your payment.
					</DialogContentText>
					<RadioGroup
						aria-label="send-option"
						name="send-option"
						value={sendOption}
						onChange={(e) => setSendOption(e.target.value)}
					>
						<FormControlLabel value="instant" control={<Radio />} label="Send Instantly" />
						<FormControlLabel value="schedule" control={<Radio />} label="Schedule for Later" />
					</RadioGroup>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setModalOpen(false)}>Cancel</Button>
					<Button onClick={() => { } }>Confirm</Button>
				</DialogActions>
			</Dialog>
		</form></>

	);
};

export default Checkout;


	// const handleSubmit = async (event) => {
	// 	event.preventDefault();
	// 	setLoading(true);
	// 	setError(null);

	// 	try {
	// 		const paymentData = {
	// 			name: name,
	// 			amount: amount,
	// 			card: {
	// 				number: cardNumber,
	// 				expiry: expiryDate,
	// 				cvv: cvv,
	// 			},
	// 		};

	// 		const response = await axios.post('http://localhost:3001/process-payment', paymentData);
	// 		console.log(response.data);
	// 		setModalOpen(true);

	// 	} catch (apiError) {
	// 		console.error('Error:', apiError);
	// 		setError('Payment processing failed.');
	// 	} finally {
	// 		setLoading(false);
	// 	}
	// };
	// Inside your Checkout component

// 	const handleSubmit = async (event) => {
// 		event.preventDefault();
// 		setLoading(true);
// 		setError(null);

// 		const paymentData = {
// 			PaymentMethodId: '2', // This should be dynamically set based on the user's choice
// 			CustomerName: name,
// 			DisplayCurrencyIso: 'KWD', // Set the currency as per your requirement
// 			MobileCountryCode: '+965', // Should match the format expected by MyFatoorah
// 			CustomerMobile: '12345678', // Example mobile number
// 			CustomerEmail: 'email@example.com', // Replace with actual customer email
// 			InvoiceValue: parseFloat(amount), // Convert amount to a number
// 			Language: 'en', // Or 'ar' depending on the customer's preference
// 			CustomerReference: 'ref1', // Any reference string you want to use
// 			CallBackUrl: 'https://yourwebsite.com/callback', // Your callback URL after payment
// 			ErrorUrl: 'https://yourwebsite.com/error', // Your error handling URL
// 			// Include other necessary fields as per MyFatoorah's requirements
// 		};

// 		try {
// 			const response = await axios.post('http://localhost:3001/process-payment', paymentData);
// 			console.log(response.data);
// 			setModalOpen(true);
// 		} catch (apiError) {
// 			console.error('Error:', apiError);
// 			setError('Payment processing failed.');
// 		} finally {
// 			setLoading(false);
// 		}
// 	};


// 	return (
// 		<>
// 			<form className="p-4 my-[200px] flex flex-col gap-y-[32px]" onSubmit={handleSubmit}>
// 				<TextField
// 					label="Name"
// 					variant="outlined"
// 					className="mb-4 w-full"
// 					value={name}
// 					onChange={(e) => setName(e.target.value)}
// 				/>
// 				<TextField
// 					label="Amount"
// 					variant="outlined"
// 					className="mb-4 w-full"
// 					value={amount}
// 					onChange={(e) => setAmount(e.target.value)}
// 					type="number"
// 				/>
// 				<TextField
// 					label="Card Number"
// 					variant="outlined"
// 					className="mb-4 w-full"
// 					value={cardNumber}
// 					onChange={(e) => setCardNumber(e.target.value)}
// 				/>
// 				<TextField
// 					label="Expiry Date (MM/YY)"
// 					variant="outlined"
// 					className="mb-4 w-full"
// 					value={expiryDate}
// 					onChange={(e) => setExpiryDate(e.target.value)}
// 				/>
// 				<TextField
// 					label="CVV"
// 					variant="outlined"
// 					className="mb-4 w-full"
// 					value={cvv}
// 					onChange={(e) => setCvv(e.target.value)}
// 					type="password"
// 				/>
// 				<Button
// 					variant="contained"
// 					color="primary"
// 					className="mt-4 w-full"
// 					disabled={loading}
// 					type="submit"
// 				>
// 					{loading ? <CircularProgress size={24} /> : 'Pay'}
// 				</Button>
// 				{error && <div className="text-red-500 mt-2">{error}</div>}
// 			</form>

// 			<Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
// 				<DialogTitle>Payment Successful</DialogTitle>
// 				<DialogContent>
// 					<DialogContentText>
// 						Choose how to send your payment.
// 					</DialogContentText>
// 					<RadioGroup
// 						aria-label="send-option"
// 						name="send-option"
// 						value={sendOption}
// 						onChange={(e) => setSendOption(e.target.value)}
// 					>
// 						<FormControlLabel value="instant" control={<Radio />} label="Send Instantly" />
// 						<FormControlLabel value="schedule" control={<Radio />} label="Schedule for Later" />
// 					</RadioGroup>
// 				</DialogContent>
// 				<DialogActions>
// 					<Button onClick={() => setModalOpen(false)}>Cancel</Button>
// 					<Button onClick={() => {/* handle send option */ }}>Confirm</Button>
// 				</DialogActions>
// 			</Dialog>
// 		</>
	
// 	);
// };

// export default Checkout;
